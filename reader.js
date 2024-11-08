let book;
let rendition;
async function initReader() {
  try {
    const response = await fetch('/book.epub');
    const arrayBuffer = await response.arrayBuffer();
    // Initialize exactly as in working version
    book = ePub();
    await book.open(arrayBuffer);
    rendition = book.renderTo('viewer', {
      width: '100%',
      height: '100%',
      flow: 'paginated',
      spread: 'none'
    });

    // Get stored location
    const storedLocation = localStorage.getItem('bookLocation');
    if (storedLocation) {
      await rendition.display(storedLocation);
    } else {
      await rendition.display();
    }

    // Only after successful display, set up remaining features
    rendition.on('locationChanged', function (location) {
      console.log('Location changed:', location);
      if (location.start) {
        localStorage.setItem('bookLocation', location.start);
        console.log('Saved location:', location.start);
      }
    });

    setupEventListeners();
  } catch (error) {
    console.error('Detailed error:', error);
    alert('Error loading book');
  }
}

function setupEventListeners() {
  // Setup touch events for mobile
  let touchStart = null;
  let touchEnd = null;
  document.addEventListener('touchstart', e => {
    touchStart = e.changedTouches[0].screenX;
  });
  document.addEventListener('touchend', e => {
    touchEnd = e.changedTouches[0].screenX;
    handleSwipe();
  });
  function handleSwipe() {
    if (touchStart && touchEnd) {
      const diff = touchStart - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          rendition.next();
        } else {
          rendition.prev();
        }
      }
    }
  }
  // Add tap event listeners
  document.getElementById('left-tap').addEventListener('click', () => {
    rendition && rendition.prev();
  });
  document.getElementById('right-tap').addEventListener('click', () => {
    rendition && rendition.next();
  });
  // Keyboard navigation
  document.addEventListener('keyup', e => {
    if (!rendition) return;
    if (e.key === 'ArrowLeft') {
      rendition.prev();
    }
    if (e.key === 'ArrowRight') {
      rendition.next();
    }
  });
}
// Initialize when page loads
initReader();
