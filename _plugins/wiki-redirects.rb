# ══════════════════════════════════════════════════════
#  WitchCraftMC — Wiki Redirects
#  _plugins/wiki-redirects.rb
# ══════════════════════════════════════════════════════
#
#  Lets a page answer to more than one name, like a
#  redirect on a normal wiki. List the other names in
#  the page's front matter:
#
#    redirects:
#      - Fish Merchant
#      - Fishmonger
#
#  Each name then:
#    · is found by the wiki search (sidebar, home page
#      and /wiki/search/) and leads to this page
#    · gets its own address next to the page, which
#      forwards to it:
#        /wiki/npc/fish-merchant
#          → /wiki/npc/old-man-eyebrows
#
#  The search part is handled by search.json and the two
#  search scripts in /js/. This file only makes the
#  forwarding pages, using _layouts/redirect.html.
#
#  A name is skipped when a real page already uses its
#  address, so a redirect can never replace a page.
#
#  Plugins are only loaded when Jekyll starts, so restart
#  preview.bat after changing this file.
#
# ══════════════════════════════════════════════════════

require "set"

module WitchCraftMC
  class WikiRedirects < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      taken = (site.pages.map(&:url) + site.static_files.map(&:url)).map { |url| normalize(url) }.to_set

      site.pages.dup.each do |page|
        Array(page.data["redirects"]).each do |name|
          name = name.to_s.strip
          next if name.empty?

          url = redirect_url(page.url, name)
          next if url.nil?

          if taken.include?(normalize(url))
            Jekyll.logger.warn "Redirects:", "\"#{name}\" on #{page.url} skipped, #{url} is already a page"
            next
          end

          taken << normalize(url)
          site.pages << build(site, page, name, url)
        end
      end
    end

    private

    # The redirect sits in the same folder as the page and copies its style:
    #   /wiki/npc/old-man-eyebrows  + "Fish Merchant" → /wiki/npc/fish-merchant
    #   /wiki/spawn/                + "Hub"           → /wiki/hub/
    def redirect_url(page_url, name)
      slug = Jekyll::Utils.slugify(name)
      return nil if slug.empty?

      trailing = page_url.end_with?("/")
      path     = page_url.chomp("/")
      folder   = path[0..path.rindex("/")]
      trailing ? "#{folder}#{slug}/" : "#{folder}#{slug}"
    end

    # /wiki/spawn/, /wiki/spawn, /wiki/spawn.html and /wiki/spawn/index.html
    # all count as the same address.
    def normalize(url)
      url.to_s.sub(%r{/index\.html\z}, "").sub(%r{\.html\z}, "").chomp("/")
    end

    def build(site, page, name, url)
      folder   = url.chomp("/")[0..url.chomp("/").rindex("/")].delete_prefix("/")
      filename = "#{Jekyll::Utils.slugify(name)}.html"

      redirect = Jekyll::PageWithoutAFile.new(site, site.source, folder, filename)
      redirect.content = ""
      redirect.data.merge!(
        "layout"         => "redirect",
        "title"          => name,
        "permalink"      => url,
        "redirect_to"    => page.url,
        "redirect_title" => page.data["title"],
        "sitemap"        => false
      )
      redirect
    end
  end
end
