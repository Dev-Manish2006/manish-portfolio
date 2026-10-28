# Manish Kumar Chaurasiya — Portfolio

A responsive React + Vite portfolio with a Node/Express API, MongoDB Atlas contact-message storage, optional email notifications, animated sections, light/dark theme toggle, resume view/download links, and GitHub/LinkedIn placeholders.

## 1) Install prerequisites
Install Node.js LTS from https://nodejs.org and Git (optional) from https://git-scm.com.
Open the project folder in VS Code.

Check installation in the VS Code terminal:
```powershell
node -v
npm -v
```

## 2) Run the frontend
Open a terminal in the project root:
```powershell
cd frontend
npm install
npm run dev
```
Open the local URL Vite prints (usually http://localhost:5173).

## 3) Configure the backend
Open a second VS Code terminal:
```powershell
cd backend
Copy-Item .env.example .env
npm install
```
Edit `backend/.env` and set:
- `MONGODB_URI`: MongoDB Atlas connection string
- `FRONTEND_URL`: `http://localhost:5173`
- Optional email values: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

Do not commit `.env` or share its values publicly.

Start the backend:
```powershell
npm run dev
```
API health check: http://localhost:5000/api/health

The contact form saves messages in MongoDB. Email notifications are sent only when SMTP settings are configured. If email is not configured, the form still saves the message and returns a clear status.

## 4) Create MongoDB Atlas database
1. Visit https://www.mongodb.com/atlas/database and create a free cluster.
2. Create a database user and a strong password.
3. In Network Access, allow your current IP for local development. For Render deployment, configure network access according to MongoDB Atlas' current instructions.
4. Select Connect > Drivers and copy the Node.js connection string.
5. Replace `<password>` with the database user's password and set the database name, for example `manish_portfolio`.
6. Put the URI in `backend/.env` as `MONGODB_URI=...`.

Keep the database password private. Avoid special characters in passwords or URL-encode them in the URI.

## 5) Add your resume PDF
Copy your resume PDF into:
`frontend/public/resume.pdf`

The Resume buttons link to `/resume.pdf` for viewing and downloading. The PDF is not included in this source ZIP; copy your latest resume into that location.

## 6) Replace social/project placeholders
Open `frontend/src/data.js` and replace:
- `YOUR_GITHUB_USERNAME`
- `YOUR_LINKEDIN_PROFILE`
- project `github` / `demo` values

Until you replace a URL, its link is intentionally disabled. Do not publish made-up URLs.

## 7) Build and deploy
### Frontend — Vercel
1. Push the project to your GitHub repository.
2. Import the repository into Vercel.
3. Set **Root Directory** to `frontend`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable `VITE_API_URL` with your deployed backend URL plus `/api`, e.g. `https://your-backend.onrender.com/api`.
7. Deploy.

### Backend — Render
1. Create a new Web Service from the same GitHub repository.
2. Set **Root Directory** to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env.example`; set `NODE_ENV=production`, `FRONTEND_URL` to your actual Vercel URL, and `MONGODB_URI` to your Atlas URI.
6. Set SMTP values if you want email notifications.
7. Deploy, then test `https://your-backend.onrender.com/api/health`.
8. Add `VITE_API_URL=https://your-backend.onrender.com/api` to Vercel and redeploy the frontend.

Render/Vercel dashboard labels can change. Use the current deployment form if it differs.

## 8) Final checklist
- [ ] Replace GitHub and LinkedIn placeholders.
- [ ] Add `frontend/public/resume.pdf`.
- [ ] Add actual project GitHub and live demo URLs only when verified.
- [ ] Test contact form locally with MongoDB.
- [ ] Test email notification after SMTP is configured.
- [ ] Check mobile layout and browser console.
- [ ] Never upload `.env` files or credentials to GitHub.

## Project structure
```text
manish-portfolio/
├── frontend/
│   ├── public/
│   │   └── (put resume.pdf here)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── data.js
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── backend/
    ├── server.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```
