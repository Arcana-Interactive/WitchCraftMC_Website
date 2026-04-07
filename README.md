# WitchCraftMC Website

The official website for **WitchCraftMC** — a Minecraft server with a witchcraft and magic theme.

## About

This is the public-facing website for WitchCraftMC, built with [Jekyll](http://jekyllrb.com/) and hosted via GitHub Pages. It includes a landing page, server info, and a player wiki.

## Structure

```
_layouts/       ← Page layouts
_includes/      ← Reusable partials (nav, footer, etc.)
_posts/         ← Portfolio/project posts
wiki/           ← Player wiki pages
img/            ← Images and assets
css/            ← Stylesheets
js/             ← JavaScript
```

## Wiki

The wiki lives at `/wiki/` and covers getting started, rules, claims, crafting, worlds, staff ranks, and commands. See `wiki/README.md` for setup details.

## Local Development

1. Install [Jekyll](https://jekyllrb.com/docs/installation/)
2. Run `bundle install`
3. Run `bundle exec jekyll serve`
4. Visit `http://localhost:4000`

## Configuration

Edit `_config.yml` to update the site title, description, email, and other settings.
