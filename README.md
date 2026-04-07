# LMS (UI Prototype)

This project is a **frontend prototype of a Learning Management System (LMS)**. It shows how a student/parent learning portal could look and feel, with multiple pages and smooth navigation.

## What it includes
- **Responsive design** (works on mobile, tablet, and desktop)
- **Student & Parent login/signup pages** (demo for UI flow)
- **Dashboard** page layout
- **Library** section UI
- **Parental Control** section UI
- **Chat** page UI
- **Shop** page UI
- **Subject pages** (English, Hindi, Math, Robotics, Science, SST)
- **Common header + footer** across pages for consistent navigation

## Main pages
- Home: `/index.html`
- Dashboard: `/dashboard/index.html`
- Library: `/library/index.html`
- Parental control: `/parent_control/index.html`
- Chat: `/chat/index.html`
- Shop: `/shop/index.html`
- About: `/about_us/home.html`
- Contact: `/contact_us/home.html`
- Parent login: `/parent_login/signin.html`
- Student login: `/student_login/signin.html`
- Subjects:
  - English: `/subject/english/eng.html`
  - Hindi: `/subject/hindi/hindi.html`
  - Math: `/subject/math/math.html`
  - Robotics: `/subject/robotics/robo.html`
  - Science: `/subject/science/science.html`
  - SST: `/subject/sst/sst.html`

## How to run
You can open the project using any simple static server.

### Option 1: VS Code Live Server
1. Open `index.html`
2. Click **Go Live**

### Option 2: Python (if installed)
```bash
python -m http.server 5501
```
Then open `http://localhost:5501/`.

## Important note
This is a **UI prototype**. It does **not** include a real backend/database in this repo.

The login/signup is only for demo purposes (to show the flow and screens).
