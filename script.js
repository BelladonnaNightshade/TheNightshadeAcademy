const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const hub = document.getElementById("hub");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");
const orientationButton = document.getElementById("orientationButton");
const hubBackButton = document.getElementById("hubBackButton");
const introNarration = document.getElementById("introNarration");
const audioToggle = document.getElementById("audioToggle");

let narrationEnabled = true;

function showScreen(screen) {
  [landing, intro, hub].forEach((section) => {
    section.classList.remove("active");
  });

  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });

  if (screen === intro && narrationEnabled) {
    playIntroNarration();
  } else {
    stopIntroNarration();
  }
}

function playIntroNarration() {
  if (!introNarration) return;

  introNarration.currentTime = 0;
  const playAttempt = introNarration.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      // Some browsers block audio until a direct user gesture. The toggle still works.
    });
  }
}

function stopIntroNarration() {
  if (!introNarration) return;

  introNarration.pause();
  introNarration.currentTime = 0;
}

function updateAudioButton() {
  if (!audioToggle) return;

  audioToggle.textContent = narrationEnabled ? "Narration: On" : "Narration: Off";
  audioToggle.setAttribute("aria-pressed", String(!narrationEnabled));
  audioToggle.classList.toggle("is-muted", !narrationEnabled);
}

enterButton.addEventListener("click", () => showScreen(intro));
backButton.addEventListener("click", () => showScreen(landing));
orientationButton.addEventListener("click", () => showScreen(hub));
hubBackButton.addEventListener("click", () => showScreen(intro));

audioToggle.addEventListener("click", () => {
  narrationEnabled = !narrationEnabled;
  updateAudioButton();

  if (narrationEnabled && intro.classList.contains("active")) {
    playIntroNarration();
  } else {
    stopIntroNarration();
  }
});

updateAudioButton();
