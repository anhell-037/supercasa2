# Super Casa

Shared family grocery list web app with a permanent dark theme and browser-to-browser sync.

## Setup

1. Install dependencies.
2. Start the app:

```bash
npm install
npm run dev
```

## Notes

- The app uses a lightweight name picker instead of passwords.
- Data is stored in the browser, so it persists on the device and syncs live across tabs using `BroadcastChannel`.
- If you open the app on another phone, it will need its own copy of the site and browser storage unless we later add a hosted backend.

## Deploy

This repo is ready for Vercel:

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Accept the default Next.js settings.
4. Deploy.

No environment variables are required.
