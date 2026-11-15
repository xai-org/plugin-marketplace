---
name: mugpipe-for-wordpress
description: Use when the user asks to read or change a connected WordPress site through Mugpipe for WordPress.
---

# Mugpipe for WordPress

1. Call `wordpress_list_sites`. If none are connected, call `wordpress_connect_site` and show the user the one-time link. The WordPress application password is entered on that Mugpipe page, never in the chat.
2. If more than one site is connected, ask which site to use. Take `siteId` from `wordpress_list_sites`. Call `wordpress_site_overview` when you need the title, language, timezone, or the connected user's roles.
3. For reading, use `wordpress_list_posts`, `wordpress_get_post`, `wordpress_list_pages`, `wordpress_get_page`, `wordpress_list_comments`, `wordpress_list_media`, `wordpress_list_categories`, `wordpress_list_tags`, `wordpress_list_menus`, `wordpress_list_plugins`, `wordpress_list_themes`, `wordpress_list_users`, `wordpress_get_settings`, and `wordpress_content_audit`. Quote titles, ids, and text from the tool output. Do not invent posts or numbers. Password-protected content is not returned.
4. New writing stays unpublished. Use `wordpress_create_draft_post` or `wordpress_create_draft_page`, then `wordpress_update_draft_post` or `wordpress_update_draft_page`. Use `wordpress_create_category`, `wordpress_create_tag`, and `wordpress_upload_media` (one image or PDF, up to 1 MB) when the user asks for those.
5. Publishing, unpublishing, scheduling, trashing, deleting, editing live content, menus, plugins, settings, users, media deletion, taxonomy deletion, comment moderation, and disconnect are high-impact. Call the matching `wordpress_plan_*` tool, show the preview, and only after the user confirms call the matching `wordpress_apply_*` tool with that confirmation token. Do not apply without a yes, and do not reuse a token.
6. `wordpress_reply_comment` does not use a confirmation token. A moderator's reply can be published immediately, so ask before sending it. Theme install and activation are not available; `wordpress_plan_theme_change` explains that and issues no token.
7. If a tool returns an auth or trial/billing error, tell the user to sign in again or visit https://mugpipe.com. Do not start checkout in the chat, and do not ask for a WordPress password or application password in the chat.

Documentation: https://mugpipe.com/wordpress/docs
