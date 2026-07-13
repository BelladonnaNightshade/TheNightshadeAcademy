const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const hub = document.getElementById("hub");
const faculty = document.getElementById("faculty");
const students = document.getElementById("students");
const admissions = document.getElementById("admissions");
const headmistressOffice = document.getElementById("headmistressOffice");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");
const orientationButton = document.getElementById("orientationButton");
const hubBackButton = document.getElementById("hubBackButton");
const headmistressCard = document.getElementById("headmistressCard");
const headmistressBackButton = document.getElementById("headmistressBackButton");
const officeLinkButtons = document.querySelectorAll("[data-office-target]");
const facultyCard = document.getElementById("facultyCard");
const facultyBackButton = document.getElementById("facultyBackButton");
const studentsCard = document.getElementById("studentsCard");
const studentsBackButton = document.getElementById("studentsBackButton");
const admissionsCard = document.getElementById("admissionsCard");
const admissionsBackButton = document.getElementById("admissionsBackButton");
const admissionsForm = document.getElementById("admissionsForm");
const admissionsResult = document.getElementById("admissionsResult");
const resetAdmissions = document.getElementById("resetAdmissions");
const retakeAdmissions = document.getElementById("retakeAdmissions");
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
  [landing, intro, hub, headmistressOffice, faculty, students, admissions].forEach((section) => {
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

if (introNarration) {
  introNarration.volume = 0.5;
}

if (academyAnthem) {
  academyAnthem.volume = mediumMusicVolume;
}

enterButton.addEventListener("click", () => showScreen(intro));
backButton.addEventListener("click", () => showScreen(landing));
orientationButton.addEventListener("click", () => showScreen(hub));
hubBackButton.addEventListener("click", () => showScreen(intro));

if (headmistressCard) {
  headmistressCard.addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(headmistressOffice);
  });
}

if (headmistressBackButton) {
  headmistressBackButton.addEventListener("click", () => showScreen(hub));
}

officeLinkButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.officeTarget;
    const screenMap = { admissions, faculty, students };
    if (screenMap[target]) showScreen(screenMap[target]);
  });
});

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

if (admissionsCard) {
  admissionsCard.addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(admissions);
  });
}

if (admissionsBackButton) {
  admissionsBackButton.addEventListener("click", () => showScreen(hub));
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

function describeNature(score) {
  if (score >= 13) return "Magnificent Abomination";
  if (score >= 9) return "Established Horror";
  if (score >= 5) return "Emerging Monster";
  return "Suspiciously Ordinary";
}

function describeMalevolence(score) {
  if (score >= 13) return "Future World Disaster";
  if (score >= 9) return "Promising Menace";
  if (score >= 5) return "Socially Troublesome";
  return "Mostly Harmless";
}

function scoreGroup(formData, prefix, count) {
  let total = 0;
  for (let index = 1; index <= count; index += 1) {
    total += Number(formData.get(`${prefix}${index}`) || 0);
  }
  return total;
}

function resetAdmissionsView() {
  if (admissionsResult) admissionsResult.hidden = true;
  if (admissionsForm) admissionsForm.hidden = false;
}

if (admissionsForm) {
  admissionsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!admissionsForm.reportValidity()) return;

    const formData = new FormData(admissionsForm);
    const natureScore = scoreGroup(formData, "nature", 5);
    const malevolenceScore = scoreGroup(formData, "evil", 5);
    const combinedScore = natureScore + malevolenceScore;
    const accepted = combinedScore >= 18 && natureScore >= 6;
    const applicantName = String(formData.get("applicantName") || "Applicant").trim() || "Applicant";

    document.getElementById("natureResult").textContent = `${describeNature(natureScore)} (${natureScore}/15)`;
    document.getElementById("malevolenceResult").textContent = `${describeMalevolence(malevolenceScore)} (${malevolenceScore}/15)`;
    document.getElementById("resultAddress").textContent = `To: ${applicantName}`;

    const heading = document.getElementById("resultHeading");
    const letter = document.getElementById("resultLetter");
    const status = document.getElementById("resultStatus");

    admissionsResult.classList.toggle("is-accepted", accepted);
    admissionsResult.classList.toggle("is-rejected", !accepted);

    if (accepted) {
      status.textContent = "Official Acceptance";
      heading.textContent = "You Have Been Accepted";
      letter.textContent = "Your examinations reveal sufficient monstrosity, ambition, and potential for cultivated disaster. You are hereby granted provisional admission to The Nightshade Academy. Report after sunset with formal attire, a list of known curses, and any containment requirements.";
    } else {
      status.textContent = "Official Rejection";
      heading.textContent = "Your Application Has Been Declined";
      letter.textContent = "At present, your combination of monstrous nature and malevolent potential does not meet the Academy’s exacting standards. We encourage further haunting, cursing, transformation, or tasteful villainy before applying again. Please do not take this personally. The Academy certainly will not.";
    }

    admissionsForm.hidden = true;
    admissionsResult.hidden = false;
    admissionsResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (resetAdmissions) {
  resetAdmissions.addEventListener("click", () => {
    window.setTimeout(resetAdmissionsView, 0);
  });
}

if (retakeAdmissions) {
  retakeAdmissions.addEventListener("click", () => {
    admissionsForm.reset();
    resetAdmissionsView();
    admissionsForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

switchFaculty("elaine");
switchStudent("cassandra");
updateAudioButton();
updateMusicButtons();
