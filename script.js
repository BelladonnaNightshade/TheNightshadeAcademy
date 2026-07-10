const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const hub = document.getElementById("hub");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");
const orientationButton = document.getElementById("orientationButton");
const hubBackButton = document.getElementById("hubBackButton");

function showScreen(screen) {
  [landing, intro, hub].forEach((section) => {
    section.classList.remove("active");
  });

  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

enterButton.addEventListener("click", () => showScreen(intro));
backButton.addEventListener("click", () => showScreen(landing));
orientationButton.addEventListener("click", () => showScreen(hub));
hubBackButton.addEventListener("click", () => showScreen(intro));
