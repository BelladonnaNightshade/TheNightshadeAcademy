const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const hub = document.getElementById("hub");
const faculty = document.getElementById("faculty");
const students = document.getElementById("students");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");
const orientationButton = document.getElementById("orientationButton");
const hubBackButton = document.getElementById("hubBackButton");
const facultyCard = document.getElementById("facultyCard");
const facultyBackButton = document.getElementById("facultyBackButton");
const studentsCard = document.getElementById("studentsCard");
const studentsBackButton = document.getElementById("studentsBackButton");
const studentButtons = document.querySelectorAll("[data-student-button]");
const studentEntries = document.querySelectorAll("[data-student-entry]");
const facultyButtons = document.querySelectorAll("[data-faculty-button]");
const facultyEntries = document.querySelectorAll("[data-faculty-entry]");
const introNarration = document.getElementById("introNarration");
const audioToggle = document.getElementById("audioToggle");
const academyAnthem = document.getElementById("academyAnthem");
const musicMuteButton = document.getElementById("musicMuteButton");
const musicCrankButton = document.getElementById("musicCrankButton");

let narrationEnabled = true;
let musicMuted = false;
const mediumMusicVolume = 0.45;

function switchFaculty(facultyId) {
  if (!facultyId) return;

  facultyButtons.forEach((button) => {
    const isActive = button.dataset.facultyButton === facultyId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  facultyEntries.forEach((entry) => {
    const isActive = entry.dataset.facultyEntry === facultyId;
    entry.classList.toggle("active", isActive);
  });
}


function switchStudent(studentId) {
  if (!studentId) return;

  studentButtons.forEach((button) => {
    const isActive = button.dataset.studentButton === studentId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  studentEntries.forEach((entry) => {
    const isActive = entry.dataset.studentEntry === studentId;
    entry.classList.toggle("active", isActive);
  });
}

function showScreen(screen) {
  [landing, intro, hub, faculty, students].forEach((section) => {
    section.classList.remove("active");
  });

  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });

  if (screen === intro && narrationEnabled) {
    playIntroNarration();
  } else {
    stopIntroNarration();
  }

  if (screen === hub && !musicMuted) {
    playAcademyAnthem();
  } else if (screen !== hub) {
    stopAcademyAnthem();
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

function playAcademyAnthem() {
  if (!academyAnthem) return;

  if (!musicMuted && academyAnthem.volume === 0) {
    academyAnthem.volume = mediumMusicVolume;
  }

  const playAttempt = academyAnthem.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      // The user can start music with the music buttons if the browser blocks autoplay.
    });
  }
}

function stopAcademyAnthem() {
  if (!academyAnthem) return;

  academyAnthem.pause();
}

function updateMusicButtons() {
  if (musicMuteButton) {
    musicMuteButton.textContent = musicMuted ? "Music Muted" : "Mute Music";
    musicMuteButton.setAttribute("aria-pressed", String(musicMuted));
    musicMuteButton.classList.toggle("is-muted", musicMuted);
  }

  if (musicCrankButton) {
    const isCranked = academyAnthem && academyAnthem.volume >= 0.99 && !musicMuted;
    musicCrankButton.classList.toggle("is-cranked", Boolean(isCranked));
  }
}

function updateAudioButton() {
  if (!audioToggle) return;

  audioToggle.textContent = narrationEnabled ? "Narration: On" : "Narration: Off";
  audioToggle.setAttribute("aria-pressed", String(!narrationEnabled));
  audioToggle.classList.toggle("is-muted", !narrationEnabled);
}

if (academyAnthem) {
  academyAnthem.volume = mediumMusicVolume;
}

enterButton.addEventListener("click", () => showScreen(intro));
backButton.addEventListener("click", () => showScreen(landing));
orientationButton.addEventListener("click", () => showScreen(hub));
hubBackButton.addEventListener("click", () => showScreen(intro));

if (facultyCard) {
  facultyCard.addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(faculty);
  });
}

if (facultyBackButton) {
  facultyBackButton.addEventListener("click", () => showScreen(hub));
}

facultyButtons.forEach((button) => {
  button.addEventListener("click", () => switchFaculty(button.dataset.facultyButton));
});

if (studentsCard) {
  studentsCard.addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(students);
  });
}

if (studentsBackButton) {
  studentsBackButton.addEventListener("click", () => showScreen(hub));
}

studentButtons.forEach((button) => {
  button.addEventListener("click", () => switchStudent(button.dataset.studentButton));
});

if (audioToggle) {
  audioToggle.addEventListener("click", () => {
    narrationEnabled = !narrationEnabled;
    updateAudioButton();

    if (narrationEnabled && intro.classList.contains("active")) {
      playIntroNarration();
    } else {
      stopIntroNarration();
    }
  });
}

if (musicMuteButton) {
  musicMuteButton.addEventListener("click", () => {
    musicMuted = !musicMuted;

    if (musicMuted) {
      stopAcademyAnthem();
    } else {
      if (academyAnthem && academyAnthem.volume === 0) {
        academyAnthem.volume = mediumMusicVolume;
      }

      if (hub.classList.contains("active")) {
        playAcademyAnthem();
      }
    }

    updateMusicButtons();
  });
}

if (musicCrankButton) {
  musicCrankButton.addEventListener("click", () => {
    musicMuted = false;

    if (academyAnthem) {
      academyAnthem.volume = 1;
    }

    if (hub.classList.contains("active")) {
      playAcademyAnthem();
    }

    updateMusicButtons();
  });
}

switchFaculty("elaine");
switchStudent("cassandra");
updateAudioButton();
updateMusicButtons();
