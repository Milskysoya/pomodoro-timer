// JavaScript untuk fungsionalitas timer
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const alarmSound = document.getElementById('alarmSound');

let timerInterval;
let timeLeft = 1500; // 25 menit dalam detik
let currentMode = 'pomodoro';
let isRunning = false;
let pomodoroCount = 0; // hitung berapa kali pomodoro selesai

const modes = {
    pomodoro: 1500,   // 25 menit
    shortBreak: 300,  // 5 menit
    longBreak: 900    // 15 menit
};

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchMode(mode) {
    currentMode = mode;
    timeLeft = modes[mode];
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Mulai';
    updateTimerDisplay();

    // Update tampilan tombol mode yang aktif
    document.querySelectorAll('.modes button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${mode}Btn`).classList.add('active');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Jeda';
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alarmSound.currentTime = 0;
                alarmSound.play();

                // Auto ganti mode
                if (currentMode === 'pomodoro') {
                    pomodoroCount++;
                    if (pomodoroCount % 4 === 0) {
                        switchMode('longBreak'); // setiap 4 sesi → long break
                    } else {
                        switchMode('shortBreak');
                    }
                } else {
                    switchMode('pomodoro');
                }
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = 'Mulai';
    }
}

function resetTimer() {
    switchMode(currentMode);
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => switchMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => switchMode('shortBreak'));
longBreakBtn.addEventListener('click', () => switchMode('longBreak'));

// Inisialisasi tampilan awal
updateTimerDisplay();
