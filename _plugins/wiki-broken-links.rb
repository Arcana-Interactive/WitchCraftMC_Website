# ══════════════════════════════════════════════════════
#  WitchCraftMC — Broken Link Finder
#  _plugins/wiki-broken-links.rb
# ══════════════════════════════════════════════════════
#
#  Fills the "Pages with Broken Links" section at the
#  bottom of the Categories page (wiki/categories.md).
#
#  After the whole site has been built, every wiki page
#  is checked for links that lead nowhere:
#
#    missing page     /wiki/npc/farmer
#                     (no page has that address)
#
#    missing section  /wiki/commands/#land-claims
#                     (the page exists, but none of its
#                     headings has that #name)
#
#  Only the article part of a page is checked: the
#  infobox, the text, History and See Also. The sidebar,
#  navbar and footer are the same on every page, so
#  they are left out.
#
#  How the results reach the page
#  ──────────────────────────────
#  The page that should show the report has
#
#    broken_links_report: true
#
#  in its front matter. Once every page is built, that
#  page is built a second time with the results in
#  page.broken_links , so the section itself is written
#  in plain Liquid inside wiki/categories.md.
#
#  This runs on every build, both in preview.bat and on
#  GitHub when the site is deployed. Plugins are only
#  loaded when Jekyll starts, so restart preview.bat
#  after changing this file.
#
# ══════════════════════════════════════════════════════

require "set"
require "cgi"

module WitchCraftMC
  module BrokenLinks
    # The page-specific part of a wiki page (wiki-page layout),
    # or of the wiki home page (wiki layout).
    ARTICLE = %r{<article class="wiki-article-wrap">(.*)</article>}m
    HOME    = %r{<main class="wiki-body">(.*)</main>}m

    # href="..." on a link, and id="..." / name="..." anchors.
    LINK    = %r{<a\b[^>]*?\bhref\s*=\s*(["'])(.*?)\1}im
    ANCHOR  = %r{\s(?:id|name)\s*=\s*(["'])(.*?)\1}im

    # Links that leave the site (https:, mailto:, //cdn...) are not checked.
    EXTERNAL = %r{\A(?:[a-z][a-z0-9+.\-]*:|//)}i

    module_function

    # ── Entry point ─────────────────────────────────────
    def run(site, payload)
      report_page = site.pages.find { |page| page.data["broken_links_report"] }
      return unless report_page

      files   = published_files(site)
      anchors = {}
      report  = []

      site.pages.each do |page|
        next if page.data["layout"] == "redirect"
        next unless page.output.is_a?(String)

        body = page.output[ARTICLE, 1] || page.output[HOME, 1]
        next unless body

        problems = []
        body.scan(LINK) do |_quote, href|
          problem = check(site, page.url, href, files, anchors)
          next unless problem

          problems << { "href" => CGI.unescapeHTML(href.strip), "problem" => problem }
        end
        next if problems.empty?

        report << {
          "title" => (page.data["title"] || page.url).to_s,
          "url"   => page.url,
          "links" => problems.uniq,
        }
      end

      report_page.data["broken_links"] = report.sort_by { |entry| entry["title"].downcase }
      rerender(report_page, payload)

      unless report.empty?
        Jekyll.logger.info "Broken links:",
                           "#{report.size} wiki page(s) have broken links, see /wiki/categories/"
      end
    end

    # ── Every file the site publishes, keyed by its path ──
    #    e.g. "/wiki/spawn/index.html", "/wiki/npc/archwizard.html"
    def published_files(site)
      files = {}
      (site.pages + site.static_files + site.documents).each do |item|
        next if item.respond_to?(:write?) && !item.write?

        path = item.destination(site.dest).delete_prefix(site.dest)
        path = "/#{path}" unless path.start_with?("/")
        files[path] = item
      end
      files
    end

    # ── Where a link ends up on GitHub Pages ─────────────
    #    /wiki/spawn/         → /wiki/spawn/index.html
    #    /wiki/npc/archwizard → /wiki/npc/archwizard.html
    def resolve(path, files)
      candidates =
        if path.end_with?("/")
          ["#{path}index.html"]
        else
          [path, "#{path}.html", "#{path}/index.html"]
        end
      candidates.find { |candidate| files.key?(candidate) }
    end

    # ── Checks one link. Returns nil when it works ───────
    def check(site, from_url, href, files, anchors)
      href = CGI.unescapeHTML(href.to_s.strip)
      return nil if href.empty? || href.start_with?("#") || href.match?(EXTERNAL)

      path, fragment = href.split("#", 2)
      path = path.split("?", 2).first.to_s
      path = absolute(path, from_url)
      path = unescape(path)

      baseurl = site.baseurl.to_s
      path = path.delete_prefix(baseurl) if !baseurl.empty? && path.start_with?(baseurl)

      target = resolve(path, files)
      return "missing page" unless target
      return nil if fragment.nil? || fragment.empty?

      # A redirect page forwards the #section to the page it points at.
      item = files[target]
      if item.respond_to?(:data) && item.data["layout"] == "redirect"
        target = resolve(item.data["redirect_to"].to_s, files) || target
      end
      return nil unless target.end_with?(".html")

      anchors[target] ||= anchors_in(files[target], site)
      anchors[target].include?(unescape(fragment)) ? nil : "missing section"
    end

    # ── All id="..." and name="..." values on a page ─────
    def anchors_in(item, site)
      html =
        if item.respond_to?(:output) && item.output.is_a?(String)
          item.output
        elsif item.respond_to?(:path) && File.file?(item.path)
          File.read(item.path, :encoding => "UTF-8")
        else
          ""
        end
      html.scan(ANCHOR).map { |_quote, value| CGI.unescapeHTML(value) }.to_set
    end

    # ── "../spawn" from /wiki/npc/archwizard → /wiki/spawn ──
    def absolute(path, from_url)
      return from_url if path.empty?
      return path if path.start_with?("/")

      folder = from_url.end_with?("/") ? from_url : from_url[0..from_url.rindex("/")]
      parts  = []
      "#{folder}#{path}".split("/", -1).each do |part|
        case part
        when "."  then next
        when ".." then parts.pop
        else parts << part
        end
      end
      parts.join("/").then { |joined| joined.start_with?("/") ? joined : "/#{joined}" }
    end

    # ── %20 → space, but leave "+" alone ─────────────────
    def unescape(text)
      text.b.gsub(%r{%[0-9A-Fa-f]{2}}n) { |code| code[1..].hex.chr }.force_encoding("UTF-8")
    end

    # ── Builds the report page again, now with the results ──
    def rerender(page, payload)
      source = page.instance_variable_get(:@broken_links_source)
      return unless source

      page.content = source
      page.renderer.payload = payload
      page.output = page.renderer.run
    end
  end
end

# Remember the report page's own text before Jekyll turns it into HTML,
# so it can be rendered a second time once the results are known.
Jekyll::Hooks.register :pages, :pre_render do |page|
  next unless page.data["broken_links_report"]
  next if page.instance_variable_defined?(:@broken_links_source)

  page.instance_variable_set(:@broken_links_source, page.content.dup)
end

Jekyll::Hooks.register :site, :post_render do |site, payload|
  WitchCraftMC::BrokenLinks.run(site, payload)
end
