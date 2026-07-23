// =========================================================
// 何巧琳 老師 - 九合一旗艦數位教學儀表板 (Ultimate 9-in-1 Portal)
// =========================================================

// --- View Switcher ---
function switchView(mode, tabBtn) {
    const grid = document.getElementById('mainDashboard');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(btn => btn.classList.remove('active'));
    if (tabBtn) {
        tabBtn.classList.add('active');
    } else {
        // Highlight active tab by mode if triggered from portal card
        tabs.forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${mode}'`)) {
                btn.classList.add('active');
            }
        });
    }

    grid.className = 'dashboard-grid view-' + mode;

    if (mode === 'whiteboard' || mode === 'all' || mode === 'dashboard') {
        setTimeout(resizeCanvas, 100);
    }

    // Smooth scroll top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
// 1. TIMER LOGIC
// =========================================================
let defaultSeconds = 600;
let totalSeconds = defaultSeconds;
let remainingSeconds = defaultSeconds;
let timerInterval = null;
let isRunning = false;
let soundEnabled = true;

const timeDisplay = document.getElementById('timeDisplay');
const timerStatus = document.getElementById('timerStatus');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerContainer = document.getElementById('timerContainer');
const progressRing = document.getElementById('progressRing');
const soundIcon = document.getElementById('soundIcon');
const soundLabel = document.getElementById('soundLabel');

const radius = progressRing ? progressRing.r.baseVal.value : 115;
const circumference = 2 * Math.PI * radius;
if (progressRing) progressRing.style.strokeDasharray = `${circumference} ${circumference}`;

function updateDisplay() {
    if (!timeDisplay) return;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeDisplay.textContent = formattedTime;

    if (progressRing) {
        const offset = circumference - (remainingSeconds / totalSeconds) * circumference;
        progressRing.style.strokeDashoffset = isNaN(offset) ? 0 : offset;
    }
}

function startTimer() {
    if (isRunning) return;
    clearAlarmState();
    if (remainingSeconds <= 0) remainingSeconds = totalSeconds;

    isRunning = true;
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    if (timerStatus) {
        timerStatus.textContent = '⏱️ 倒數計時中...';
        timerStatus.style.color = '#ff477e';
    }

    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();
        if (remainingSeconds <= 0) triggerAlarm();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (timerStatus) {
        timerStatus.textContent = '⏸️ 已暫停';
        timerStatus.style.color = '#d97706';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    remainingSeconds = totalSeconds;
    clearAlarmState();
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (timerStatus) {
        timerStatus.textContent = '準備就緒';
        timerStatus.style.color = '#8a4a5c';
    }
    updateDisplay();
}

function setPreset(minutes, btnElement) {
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    totalSeconds = minutes * 60;
    defaultSeconds = totalSeconds;
    resetTimer();
}

function triggerAlarm() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (timerStatus) {
        timerStatus.textContent = '🔔 時間到！請停止練習';
        timerStatus.style.color = '#d90429';
    }
    if (timeDisplay) timeDisplay.classList.add('time-expired');
    if (progressRing) progressRing.classList.add('ring-expired');
    document.body.classList.add('alarm-flash');
    if (timerContainer) timerContainer.classList.add('alarm-flash');

    if (soundEnabled) playBeepSound();
}

function clearAlarmState() {
    if (timeDisplay) timeDisplay.classList.remove('time-expired');
    if (progressRing) progressRing.classList.remove('ring-expired');
    document.body.classList.remove('alarm-flash');
    if (timerContainer) timerContainer.classList.remove('alarm-flash');
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
        if (soundLabel) soundLabel.textContent = '時間結束提示音：開啟';
    } else {
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
        if (soundLabel) soundLabel.textContent = '時間結束提示音：關閉';
    }
}

function playBeepSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const audioCtx = new AudioContext();
        const times = [0, 0.25, 0.5];
        const freqs = [880, 1046.5, 1318.5];

        times.forEach((timeOffset, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freqs[idx], audioCtx.currentTime + timeOffset);
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime + timeOffset);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + timeOffset + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + timeOffset);
            osc.stop(audioCtx.currentTime + timeOffset + 0.35);
        });
    } catch (e) {}
}

// =========================================================
// 2. SCOREBOARD LOGIC
// =========================================================
let teams = [
    { name: '第一組', score: 0 },
    { name: '第二組', score: 0 },
    { name: '第三組', score: 0 },
    { name: '第四組', score: 0 },
    { name: '第五組', score: 0 },
    { name: '第六組', score: 0 }
];

const teamsGrid = document.getElementById('teamsGrid');

function renderTeams() {
    if (!teamsGrid) return;
    teamsGrid.innerHTML = '';

    const scores = teams.map(t => t.score);
    const maxScore = Math.max(...scores);
    const hasLeader = maxScore > 0;

    teams.forEach((team, idx) => {
        const isLeader = hasLeader && team.score === maxScore;

        const card = document.createElement('article');
        card.className = `team-card ${isLeader ? 'is-leader' : ''}`;

        card.innerHTML = `
            <div class="crown-badge">
                <i class="fa-solid fa-crown"></i> 最高分
            </div>
            <div class="team-header">
                <h3 class="team-name">${team.name}</h3>
            </div>
            <div class="score-box">
                <span class="score-number">${team.score}</span>
            </div>
            <div class="button-group">
                <button class="score-btn btn-add" onclick="changeScore(${idx}, 1)">
                    <i class="fa-solid fa-plus"></i> 加一分
                </button>
                <button class="score-btn btn-subtract" onclick="changeScore(${idx}, -1)">
                    <i class="fa-solid fa-minus"></i> 扣一分
                </button>
            </div>
        `;

        teamsGrid.appendChild(card);
    });
}

function changeScore(teamIndex, delta) {
    teams[teamIndex].score += delta;
    if (teams[teamIndex].score < 0) teams[teamIndex].score = 0;

    if (delta > 0) playScoreTone(600, 850, 0.15);
    else playScoreTone(350, 250, 0.15);

    renderTeams();
}

function resetAllScores() {
    if (confirm('確定要將所有小組的分數歸零重置嗎？')) {
        teams.forEach(t => t.score = 0);
        renderTeams();
    }
}

function playScoreTone(startFreq, endFreq, duration) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

// =========================================================
// 3. LOTTERY LOGIC
// =========================================================
const defaultRoster = ["武今天", "甄快樂", "右學到", "辛ＡＩ", "辛技能", "郝幸福"];
let currentRoster = [...defaultRoster];
let availableRoster = [...defaultRoster];
let isLotteryRolling = false;

const drawBtn = document.getElementById('drawBtn');
const winnerBox = document.getElementById('winnerBox');
const winnerLabel = document.getElementById('winnerLabel');
const winnerName = document.getElementById('winnerName');
const rosterInput = document.getElementById('rosterInput');
const rosterCount = document.getElementById('rosterCount');
const noRepeatToggle = document.getElementById('noRepeatToggle');

function parseRosterInput() {
    if (!rosterInput) return defaultRoster;
    const rawText = rosterInput.value;
    if (!rawText.trim()) return [];
    
    return rawText
        .split(/[,、\n\s]+/)
        .map(name => name.trim())
        .filter(name => name.length > 0);
}

function updateRoster() {
    const names = parseRosterInput();
    if (names.length === 0) {
        alert('⚠️ 名單不能為空！');
        return;
    }
    currentRoster = [...names];
    availableRoster = [...names];
    updateRosterCount();
    alert(`✅ 抽籤名單更新成功！共有 ${currentRoster.length} 位同學。`);
}

function updateRosterCount() {
    if (!rosterCount) return;
    const names = parseRosterInput();
    rosterCount.textContent = `共 ${names.length} 人`;
}

function drawWinner() {
    if (isLotteryRolling) return;

    const names = parseRosterInput();
    if (names.length === 0) {
        alert('請先輸入名單！');
        return;
    }

    let pool = (noRepeatToggle && noRepeatToggle.checked) ? availableRoster : names;

    if (pool.length === 0) {
        alert('🎉 所有同學都已抽過一輪囉！即將重置名單。');
        availableRoster = [...names];
        pool = availableRoster;
    }

    isLotteryRolling = true;
    if (drawBtn) drawBtn.disabled = true;
    if (winnerBox) winnerBox.classList.remove('celebrate');
    if (winnerLabel) winnerLabel.textContent = '🎲 幸運兒抽選中...';

    let count = 0;
    const totalRolls = 20;
    let speed = 40;

    function rollStep() {
        const randomIdx = Math.floor(Math.random() * pool.length);
        if (winnerName) winnerName.textContent = pool[randomIdx];
        playTickTone();

        count++;
        if (count < totalRolls) {
            speed += 8;
            setTimeout(rollStep, speed);
        } else {
            const finalIndex = Math.floor(Math.random() * pool.length);
            const winner = pool[finalIndex];

            if (noRepeatToggle && noRepeatToggle.checked) {
                availableRoster.splice(finalIndex, 1);
            }

            if (winnerName) winnerName.textContent = winner;
            if (winnerLabel) winnerLabel.textContent = '🎉 今日恭喜幸運兒 🎉';

            if (winnerBox) winnerBox.classList.add('celebrate');
            playFanfareTone();

            isLotteryRolling = false;
            if (drawBtn) drawBtn.disabled = false;
        }
    }

    rollStep();
}

function playTickTone() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch(e){}
}

function playFanfareTone() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = ctx.currentTime + idx * 0.1;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.35);
        });
    } catch(e){}
}

// =========================================================
// 4. WHITEBOARD LOGIC
// =========================================================
const canvas = document.getElementById('whiteboardCanvas');
let wbCtx = null;
const eraserBtn = document.getElementById('eraserBtn');

let isWhiteboardDrawing = false;
let currentPenColor = '#1e1e1e';
let currentPenWidth = 4;
let isEraserMode = false;
let wbLastX = 0;
let wbLastY = 0;

if (canvas) {
    wbCtx = canvas.getContext('2d');
    canvas.addEventListener('pointerdown', startWbDrawing);
    canvas.addEventListener('pointermove', wbDraw);
    canvas.addEventListener('pointerup', stopWbDrawing);
    canvas.addEventListener('pointerleave', stopWbDrawing);
    canvas.addEventListener('pointercancel', stopWbDrawing);
}

function resizeCanvas() {
    if (!canvas || !wbCtx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    if (canvas.width > 0 && canvas.height > 0) {
        tempCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = rect.width;
    canvas.height = rect.height;

    wbCtx.fillStyle = '#ffffff';
    wbCtx.fillRect(0, 0, canvas.width, canvas.height);

    if (tempCanvas.width > 0 && tempCanvas.height > 0) {
        wbCtx.drawImage(tempCanvas, 0, 0);
    }

    resetPenStyles();
}

function resetPenStyles() {
    if (!wbCtx) return;
    wbCtx.lineCap = 'round';
    wbCtx.lineJoin = 'round';
    if (isEraserMode) {
        wbCtx.strokeStyle = '#ffffff';
        wbCtx.lineWidth = 28;
    } else {
        wbCtx.strokeStyle = currentPenColor;
        wbCtx.lineWidth = currentPenWidth;
    }
}

function getWbCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startWbDrawing(e) {
    isWhiteboardDrawing = true;
    const pos = getWbCoordinates(e);
    wbLastX = pos.x;
    wbLastY = pos.y;
    wbCtx.beginPath();
    wbCtx.moveTo(wbLastX, wbLastY);
}

function wbDraw(e) {
    if (!isWhiteboardDrawing) return;
    e.preventDefault();

    const pos = getWbCoordinates(e);

    wbCtx.beginPath();
    wbCtx.moveTo(wbLastX, wbLastY);
    wbCtx.lineTo(pos.x, pos.y);
    wbCtx.stroke();

    wbLastX = pos.x;
    wbLastY = pos.y;
}

function stopWbDrawing() {
    if (isWhiteboardDrawing) {
        wbCtx.closePath();
        isWhiteboardDrawing = false;
    }
}

function setPenColor(color, btnElement) {
    isEraserMode = false;
    currentPenColor = color;
    currentPenWidth = 4;

    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    if (eraserBtn) eraserBtn.classList.remove('active');

    resetPenStyles();
}

function enableEraser(btnElement) {
    isEraserMode = true;
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    resetPenStyles();
}

function clearCanvas() {
    if (!wbCtx || !canvas) return;
    wbCtx.fillStyle = '#ffffff';
    wbCtx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);

// =========================================================
// 5. FLASHCARD LOGIC
// =========================================================
const fallbackCards = [
    { word: "一心一意", pinyin: "yī xīn yī yì", meaning: "形容心思專一，毫無雜念。" },
    { word: "三心二意", pinyin: "sān xīn èr yì", meaning: "形容猶豫不決，或是意志不堅定。" },
    { word: "五花八門", pinyin: "wǔ huā bā mén", meaning: "形容花樣繁多，變化莫測。" },
    { word: "七上八下", pinyin: "qī shàng bā xià", meaning: "形容忐忑不安，心情起伏不定。" },
    { word: "九牛一毛", pinyin: "jiǔ niú yī máo", meaning: "比喻極其微小，微不足道。" },
    { word: "十全十美", pinyin: "shí quán shí měi", meaning: "比喻圓滿完美，毫無瑕疵。" },
    { word: "百發百中", pinyin: "bǎi fā bǎi zhòng", meaning: "比喻動作精準，做事很有把握。" },
    { word: "千方百計", pinyin: "qiān fāng bǎi jì", meaning: "想盡各種方法與計策。" },
    { word: "萬無一失", pinyin: "wàn wú yī shī", meaning: "絕對不會出錯，非常有把握。" },
    { word: "畫蛇添足", pinyin: "huà shé tiān zú", meaning: "比喻多此一舉，反而把事情弄糟糕。" },
    { word: "胸有成竹", pinyin: "xiōng yǒu chéng zhú", meaning: "比喻做事之前已有完整的計畫與把握。" },
    { word: "鵬程萬里", pinyin: "péng chéng wàn lǐ", meaning: "比喻前程遠大，事業光明。" }
];

let flashcardsList = [...fallbackCards];
let cardCurrentIndex = 0;
let isCardFlipped = false;

const flashcardEl = document.getElementById('flashcard');
const frontWordEl = document.getElementById('frontWord');
const backPinyinEl = document.getElementById('backPinyin');
const backMeaningEl = document.getElementById('backMeaning');
const prevBtnEl = document.getElementById('prevBtn');
const nextBtnEl = document.getElementById('nextBtn');
const progressTextEl = document.getElementById('progressText');
const progressFillEl = document.getElementById('progressFill');

function updateFlashcard() {
    if (flashcardsList.length === 0 || !frontWordEl) return;

    if (isCardFlipped && flashcardEl) {
        flashcardEl.classList.remove('is-flipped');
        isCardFlipped = false;
    }

    const cardData = flashcardsList[cardCurrentIndex];
    frontWordEl.textContent = cardData.word;
    if (backPinyinEl) backPinyinEl.textContent = cardData.pinyin;
    if (backMeaningEl) backMeaningEl.textContent = cardData.meaning;

    if (progressTextEl) progressTextEl.textContent = `卡片 ${cardCurrentIndex + 1} / ${flashcardsList.length}`;
    if (progressFillEl) progressFillEl.style.width = `${((cardCurrentIndex + 1) / flashcardsList.length) * 100}%`;

    if (prevBtnEl) prevBtnEl.disabled = cardCurrentIndex === 0;
    if (nextBtnEl) nextBtnEl.disabled = cardCurrentIndex === flashcardsList.length - 1;
}

function flipCard() {
    if (!flashcardEl) return;
    isCardFlipped = !isCardFlipped;
    flashcardEl.classList.toggle('is-flipped', isCardFlipped);
    playFlipTone();
}

function prevCard() {
    if (cardCurrentIndex > 0) {
        cardCurrentIndex--;
        updateFlashcard();
    }
}

function nextCard() {
    if (cardCurrentIndex < flashcardsList.length - 1) {
        cardCurrentIndex++;
        updateFlashcard();
    }
}

function randomCard() {
    let randIdx;
    do {
        randIdx = Math.floor(Math.random() * flashcardsList.length);
    } while (randIdx === cardCurrentIndex && flashcardsList.length > 1);

    cardCurrentIndex = randIdx;
    updateFlashcard();
}

function playFlipTone() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
}

// Initial Calls
updateDisplay();
renderTeams();
updateRosterCount();
updateFlashcard();
window.addEventListener('load', resizeCanvas);
setTimeout(resizeCanvas, 150);
