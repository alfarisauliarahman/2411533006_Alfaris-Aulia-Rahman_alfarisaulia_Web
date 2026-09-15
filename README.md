# Personal Portfolio Website

A responsive personal portfolio website built with HTML, Bootstrap 5, custom CSS, and JavaScript, with dynamic content served from Supabase. It presents a personal profile, background, portfolio of work, and a contact section.

The project serves as coursework for several courses:

- **Web Design (semester 3)** for the front-end design and layout.
- **Web Programming (semester 4)** for the practicum reports section.
- **Mobile Application (semester 5)** for Flutter practicum documentation.

The site is deployed to Hostinger through an automated GitHub Actions workflow.

**Live site:** http://alfarisaulia.ifportofolio.com/

## Pages

- **Home** — introduction, main visual, feature grid, and image slider
- **About** — detailed profile, education, and experience, organized with accordion components
- **Portofolio** — showcase of works that can be filtered by category, with details shown in a modal
- **Gallery** — image gallery
- **Report** — practicum documentation with switchable categories for **Web Programming** and **Mobile Application**. The mobile section includes the detailed Flutter Practicum 3 report for input widgets, basic forms, validation, and the Class A calculator task.
- **Contact** — contact form with client-side validation and a Google Maps location embed

## Tech Stack

- HTML
- Bootstrap 5
- Custom CSS
- JavaScript
- Supabase (backend for dynamic portfolio, skills, gallery data, and the contact form)
- GitHub Actions (automated deployment to Hostinger)

## Project Structure

```
index.html          Home
portofolio.html     Portfolio
about.html          About
gallery.html        Gallery
kontak.html         Contact
report/             Web Programming practicum reports
report/mobile/      Mobile Application practicum reports
images/aplikasi-mobile/p3/       Flutter Practicum 3 screenshots and Carbon code images
images/pemrograman-web/p6/       Web Programming Meeting 6 screenshots
images/pemrograman-web/p7/       Web Programming Meeting 7 screenshots
images/pemrograman-web/p8/       Web Programming Meeting 8 screenshots
css/custom.css      Custom styles
js/main.js          Scripts
.github/workflows/deploy_alfarisaulia.yml   Deployment pipeline
```

## Deployment

Pushing to the main branch triggers the GitHub Actions workflow, which deploys the site to Hostinger automatically.

## Author

- **Name:** Alfaris Aulia Rahman
- **NIM:** 2411533006
