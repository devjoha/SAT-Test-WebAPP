# Running SAT Bluebook on Your Arch Linux PC

This guide walks you through getting the app running locally on Arch Linux,
both in development mode (instant hot-reload) and as a production build
served by nginx.

---

## What You Need

| Tool | Minimum version | Used for |
|------|----------------|----------|
| Node.js | 24.x | Running the app |
| pnpm | 10.x | Installing packages |
| git | any | Downloading the project |
| nginx | any | Serving the production build (optional) |

---

## Step 1 — Install Node.js 24

Arch's official repos ship a recent Node, but the exact version matters.
Use **nvm** (Node Version Manager) so you can pin to v24:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload your shell so nvm is available
source ~/.bashrc     # or ~/.zshrc if you use zsh

# Install and use Node 24
nvm install 24
nvm use 24

# Verify
node --version   # should print v24.x.x
```

> **Alternative (pacman):** `sudo pacman -S nodejs npm` installs the version
> in the official repos. As long as it is ≥ 22 the app will work, but 24 is
> recommended to match the development environment.

---

## Step 2 — Install pnpm

```bash
npm install -g pnpm@10

# Verify
pnpm --version   # should print 10.x.x
```

---

## Step 3 — Get the Project Files

### Option A — Download a ZIP from Replit (easiest)

1. In Replit, click the three-dot menu (⋯) → **Download as ZIP**
2. Extract the ZIP somewhere on your machine:
   ```bash
   unzip sat-bluebook.zip -d ~/sat-bluebook
   cd ~/sat-bluebook
   ```

### Option B — Clone via git (if you have a git remote set up)

```bash
git clone <your-repo-url> ~/sat-bluebook
cd ~/sat-bluebook
```

---

## Step 4 — Install Dependencies

Run this once from the project root (the folder that contains `pnpm-workspace.yaml`):

```bash
pnpm install
```

This installs packages for every workspace package at once.
It will take a minute or two on the first run.

---

## Running in Development Mode

Development mode gives you instant hot-reload — edit a file, the browser
updates immediately without a page refresh.

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run dev
```

Then open **http://localhost:3000** in your browser.

### Make it shorter with an alias

Add this to your `~/.bashrc` or `~/.zshrc`:

```bash
alias sat='PORT=3000 BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run dev'
```

Then just type `sat` to start the app.

---

## Building for Production

A production build minifies all code and assets into a single static folder
that can be served by any web server (nginx, Apache, Caddy, etc.).

```bash
# Build the frontend
BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run build
```

The output lands in:
```
artifacts/sat-bluebook/dist/public/
```

---

## Serving the Production Build with nginx

### 1. Install nginx

```bash
sudo pacman -S nginx
```

### 2. Create a site config

Create the file `/etc/nginx/sites-available/sat-bluebook`:

```nginx
server {
    listen 80;
    server_name localhost;

    root /home/YOUR_USERNAME/sat-bluebook/artifacts/sat-bluebook/dist/public;
    index index.html;

    # Route all requests to index.html so client-side routing works
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

> Replace `/home/YOUR_USERNAME/sat-bluebook` with the actual absolute path
> to your project folder. Run `pwd` inside the project to find it.

### 3. Enable the site

Arch's default nginx config doesn't include a `sites-enabled` folder.
Either edit `/etc/nginx/nginx.conf` directly, or set up the include pattern:

```bash
# Create the sites-enabled folder
sudo mkdir -p /etc/nginx/sites-enabled

# Symlink your site config
sudo ln -s /etc/nginx/sites-available/sat-bluebook \
           /etc/nginx/sites-enabled/sat-bluebook
```

Then add this line inside the `http {}` block of `/etc/nginx/nginx.conf`:
```
include /etc/nginx/sites-enabled/*;
```

### 4. Test and start nginx

```bash
# Check the config for syntax errors
sudo nginx -t

# Start nginx
sudo systemctl start nginx

# Enable it to start on boot
sudo systemctl enable nginx
```

Open **http://localhost** in your browser — the app should load.

### Rebuild after making changes

Any time you edit questions, users, or config, rebuild and nginx picks it up instantly:

```bash
BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run build
```

No nginx restart needed — it serves the files directly from disk.

---

## Quick-Serve Without nginx (simpler alternative)

If you just want to test the production build without setting up nginx:

```bash
# Install the 'serve' tool once
npm install -g serve

# Serve the built files
serve -s artifacts/sat-bluebook/dist/public -l 3000
```

Then open **http://localhost:3000**.

---

## Customizing Before You Build

| What to change | File |
|---------------|------|
| Add/remove login accounts | `artifacts/sat-bluebook/src/data/users.ts` |
| Edit questions | `artifacts/sat-bluebook/src/data/questions.ts` |
| Colors, break duration | `artifacts/sat-bluebook/src/config.ts` |

After any edit, re-run the build command and reload your browser.

---

## App Features

### Login
- Two-stage sign-in screen matching the real Bluebook UI
- Password field is visually masked without using `type="password"`, so browsers won't trigger password-breach warnings or offer to save credentials
- The eye icon toggles between hidden and visible password
- Credentials are validated against `artifacts/sat-bluebook/src/data/users.ts`

### Home Screen (Menu)
- Displays "Your Tests" and "Practice and Prepare" sections
- Click your name / avatar in the top-right corner to open the account menu
- The account menu shows who is signed in and a **Sign Out** button that returns you to the login screen

### Test Interface
- Full SAT Digital test flow: R&W Module 1 → R&W Module 2 → Break → Math Module 1 → Math Module 2
- **More menu (⋮)** — clicking the three-dot button in the top-right of the test opens a dropdown with:
  - **Help** — quick reference for all test tools
  - **Return to Home Screen** — exits the test (shows an in-app confirmation dialog, not a browser popup)
  - **Finish Test** — submits the test early (also shows an in-app confirmation dialog)
- **Question palette** — open from the bottom pill; answered questions show as solid blue squares, unanswered as dashed outlines
- **Timer** — hide/show toggle; turns red in the last 5 minutes
- **Mark for Review** — bookmark flag shown in the question palette
- **Eliminate answers** — right-click an option or click the circled letter to cross it out
- **Desmos graphing calculator** — available in Math modules (requires internet)
- **Reference sheet** — math formulas panel in Math modules

---

## Common Issues

### `vite: command not found`
You forgot to run `pnpm install`. Do that first.

### `Error: PORT environment variable is required`
You must pass `PORT=3000` before the command. See the dev and build commands above.

### `Error: BASE_PATH environment variable is required`
Same as above — pass `BASE_PATH=/` before the command.

### Port 3000 already in use
Either stop whatever is using it, or use a different port:
```bash
PORT=4000 BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run dev
```
Then open http://localhost:4000.

### nginx shows "403 Forbidden"
nginx can't read the files. Fix the permissions:
```bash
# Make the dist folder readable
chmod -R 755 artifacts/sat-bluebook/dist/public

# Also make sure nginx can traverse your home directory
chmod 755 ~
```

### Desmos calculator doesn't load
The Desmos calculator requires an internet connection — it loads from
`https://www.desmos.com/api/v1.8/calculator.js` at runtime.
Make sure your machine can reach the internet when the app is open.

---

## Summary of Commands

```bash
# One-time setup
pnpm install

# Development (hot-reload, open http://localhost:3000)
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run dev

# Production build
BASE_PATH=/ pnpm --filter @workspace/sat-bluebook run build

# Quick production serve (no nginx)
serve -s artifacts/sat-bluebook/dist/public -l 3000
```
