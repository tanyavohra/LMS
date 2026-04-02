# LMS

Static LMS UI built with HTML/CSS/JavaScript and Bootstrap (CDN).

## Run locally
- VS Code Live Server: open `C:\Users\vohra\OneDrive\Desktop\LMS\index.html` and click “Go Live” (port is set to `5501` in `.vscode/settings.json`).
- Or use any static server that serves the repo root as the site root.

## Main routes
- Home: `/index.html`
- Dashboard: `/dashboard/index.html`
- Library: `/library/index.html`
- Parental control: `/parent_control/index.html`
- Chat: `/chat/index.html`
- Shop: `/shop/index.html`
- Parent login: `/parent_login/signin.html`
- Student login: `/student_login/signin.html`

## Shared layout
Header/footer are injected on every page from:
- `/shared/header.html`
- `/shared/footer.html`
via `/shared/include.js`.
