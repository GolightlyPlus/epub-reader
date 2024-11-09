# Simple EPUB Reader

A lightweight, mobile-friendly EPUB reader that works as a Progressive Web App (PWA). Built using epub.js.

## Features

- Single EPUB book reader
- Mobile-friendly touch/swipe navigation
- Saves reading progress
- Works offline
- Installable as a PWA
- Clean, minimal interface

## Setup

1. Clone this repository
2. Add your EPUB file to the root directory and name it `book.epub`
3. Start a local server (see testing instructions below)

## File Structure

```
├── index.html
├── styles.css
├── reader.js
├── manifest.json
├── sw.js
├── book.epub (you need to add this)
├── logo.png
└── libraries/
├── jszip.min.js
└── epub.min.js
```

## Testing Locally

You can use Python's built-in HTTP server:

With Python 3:
```bash
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser.

## Usage

1. Start the server
2. Open in a mobile browser
3. Navigate using:
    - Tap right side of screen to go forward
    - Tap left side to go back
    - Swipe left/right also works
4. Progress is automatically saved

## Installing as a PWA

1. Open in Chrome or other modern browser
2. You should see an "Install" option in the browser menu
3. On iOS, use "Add to Home Screen" from the share menu

## Development
To modify the reader for your own use:

1. `index.html` - Main HTML structure
2. `styles.css` - Styling
3. `reader.js` - Reader functionality
4. `manifest.json` - PWA configuration
5. `sw.js` - Service Worker for offline functionality

## Note
The included .gitignore excludes:

- book.epub
- .firebase*
- firebase.json

Make sure to add your own book.epub file as it's not included in the repository.
