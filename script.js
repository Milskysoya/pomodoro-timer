let countdown;
let totalTime = 0;
let timeLeft = 0;
let streak = 0;
let cycle = 0; // untuk hitung 3x fokus
let isBreak = false;

// Elemen HTML
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const alarmSound = document.getElementById('alarmSound');
const missionBtn = document.getElementById('missionBtn');
const streakCount = document.getElementById('streakCount');
const quoteEl = document.getElementById('quote');
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteList = document.getElementById('noteList');

// === Quotes Acak ===
const quotes = [
    "Focus on progress, not perfection.",
    "Discipline is the bridge between goals and success.",
    "Small steps every day lead to big results.",
    "Stay focused, the galaxy awaits your success.",
    "Your time is your greatest power. Use it wisely."
];
quoteEl.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

// === Timer Umum ===
function startTimer() {
    clearInterval(countdown);

    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTime = (minutes * 60) + seconds;

    if (totalTime <= 0) {
        alert("Masukkan waktu lebih dari 0 detik!");
        return;
    }

    timeLeft = totalTime;
    updateDisplay();

    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay();

        const progress = ((totalTime - timeLeft) / totalTime) * 100;
        progressBar.style.width = `${progress}%`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alarmSound.play();

            if (isBreak) {
                alert("☕ Istirahat selesai! Waktunya fokus lagi!");
                startFocusCycle();
            } else {
                alert("✅ Waktu fokus selesai! Sekarang istirahat 5 menit.");
                startBreakCycle();
            }
        }
    }, 1000);
}

// === Fungsi update waktu ===
function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent =
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// === Fungsi reset ===
function resetTimer() {
    clearInterval(countdown);
    progressBar.style.width = "0%";
    timerDisplay.textContent = "00:00";
    minutesInput.value = "";
    secondsInput.value = "";
    isBreak = false;
    cycle = 0;
}

// === Fungsi Mission Mode ===
function startMission() {
    alert("🚀 Mission dimulai! Kamu akan menjalani 3 sesi fokus (25m) dengan istirahat 5m.");
    streak++;
    cycle = 0;
    startFocusCycle();
}

// === Sesi Fokus 25 menit ===
function startFocusCycle() {
    cycle++;
    isBreak = false;
    if (cycle > 3) {
        alert("🌟 Mission Complete! Kamu telah menyelesaikan 3 siklus fokus!");
        streakCount.textContent = streak;
        return;
    }
    minutesInput.value = 25;
    secondsInput.value = 0;
    progressBar.style.width = "0%";
    startTimer();
}

// === Sesi Istirahat 5 menit ===
function startBreakCycle() {
    isBreak = true;
    minutesInput.value = 5;
    secondsInput.value = 0;
    progressBar.style.width = "0%";
    startTimer();
}

// === Notes Section ===
function addNote() {
    const text = noteInput.value.trim();
    if (text === "") return;
    const li = document.createElement("li");
    li.textContent = text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add("delete-btn");
    delBtn.onclick = () => li.remove();

    li.appendChild(delBtn);
    noteList.appendChild(li);
    noteInput.value = "";
}

// === Event Listener ===
document.getElementById('launchBtn').addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
missionBtn.addEventListener('click', startMission);
addNoteBtn.addEventListener('click', addNote);
