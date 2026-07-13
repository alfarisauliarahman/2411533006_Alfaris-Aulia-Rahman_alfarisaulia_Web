# Personal Portfolio Website

A responsive personal portfolio website built with HTML, Bootstrap 5, custom CSS, and JavaScript, with dynamic content served from Supabase. It presents a personal profile, background, portfolio of work, and a contact section.

The project serves as coursework for two courses:

- **Web Design (semester 3)** for the front-end design and layout.
- **Web Programming (semester 4)** for the practicum reports section.

The site is deployed to Hostinger through an automated GitHub Actions workflow.

**Live site:** http://alfarisaulia.ifportofolio.com/

## Pages

- **Home** — introduction, main visual, feature grid, and image slider
- **About** — detailed profile, education, and experience, organized with accordion components
- **Portofolio** — showcase of works that can be filtered by category, with details shown in a modal
- **Gallery** — image gallery
- **Report** — Web Programming practicum reports (meetings 6 to 9: Laravel configuration, migration and routing, Eloquent relationships, and Laravel UI)
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
css/custom.css      Custom styles
js/main.js          Scripts
.github/workflows/deploy_alfarisaulia.yml   Deployment pipeline
```

## Deployment

Pushing to the main branch triggers the GitHub Actions workflow, which deploys the site to Hostinger automatically.

## Author

- **Name:** Alfaris Aulia Rahman
- **NIM:** 2411533006
