/************************************************************
 * 1) Simple Login
 ************************************************************/
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password";

function loginUser() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const loginMsg = document.getElementById("loginMessage");

  if (user === VALID_USERNAME && pass === VALID_PASSWORD) {
    // Hide login, show main wrapper
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("mainWrapper").style.display = "flex";
  } else {
    loginMsg.textContent = "Invalid credentials. Try 'admin' / 'password'.";
  }
  return false; // Prevent form submission refresh
}

/************************************************************
 * 2) Navigation: Show/Hide Sections
 ************************************************************/
function showSection(sectionId) {
  // Hide all .page-section elements
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Show the requested section
  document.getElementById(sectionId).style.display = 'block';
}

/************************************************************
 * 3) Super Composer (3375×3375)
 ************************************************************/
// Canvas is truly 3375×3375, visually scaled to 500×500 in CSS.
let bgImage = null;
let overlayImage = null;

const bgInput = document.getElementById("bgImageInput");
const overlayInput = document.getElementById("overlayImageInput");
const composerCanvas = document.getElementById("composerCanvas");
const ctx = composerCanvas.getContext("2d");

// Listen for changes on file inputs
bgInput.addEventListener("change", handleBgChange);
overlayInput.addEventListener("change", handleOverlayChange);

function handleBgChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    bgImage = new Image();
    bgImage.onload = function() {
      drawImages();
    };
    bgImage.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function handleOverlayChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    overlayImage = new Image();
    overlayImage.onload = function() {
      drawImages();
    };
    overlayImage.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

/**
 * Draws the background image, then the overlay image, 
 * onto the full 3375×3375 canvas.
 */
function drawImages() {
  // Clear canvas
  ctx.clearRect(0, 0, composerCanvas.width, composerCanvas.height);

  // Draw background if available
  if (bgImage) {
    ctx.drawImage(bgImage, 0, 0, composerCanvas.width, composerCanvas.height);
  }

  // Draw overlay if available
  if (overlayImage) {
    ctx.drawImage(overlayImage, 0, 0, composerCanvas.width, composerCanvas.height);
  }
}

/**
 * Compose (merge) images on the canvas.
 */
function composeImages() {
  drawImages();
  alert("Images composed on the 3375×3375 canvas (scaled to 500×500 visually).");
}

/**
 * Download the composed image at full 3375×3375 resolution.
 */
function downloadComposedImage() {
  const link = document.createElement("a");
  link.download = "composed_image_3375x3375.png";
  link.href = composerCanvas.toDataURL("image/png");
  link.click();
}
