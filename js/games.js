/* ============================================
   Games — JavaScript Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initGameTabs();
  initNumberGuess();
  initTypingTest();
  initReactionTest();
});

/* --- Tab Switching --- */
function initGameTabs() {
  const btns = document.querySelectorAll('.games-tabs__btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('games-tabs__btn--active'));
      btn.classList.add('games-tabs__btn--active');
      const gameId = btn.dataset.game;
      document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('game-panel--active'));
      document.getElementById(`game-${gameId}`).classList.add('game-panel--active');
    });
  });
}

/* ========== Game 1: Number Guessing ========== */
function initNumberGuess() {
  const input = document.getElementById('guess-input');
  const btn = document.getElementById('guess-btn');
  const reset = document.getElementById('guess-reset');
  const result = document.getElementById('guess-result');
  const roundsEl = document.getElementById('guess-rounds');
  const bestEl = document.getElementById('guess-best');
  const hintEl = document.getElementById('guess-hint');
  const historyEl = document.getElementById('guess-history');

  let target = Math.floor(Math.random() * 100) + 1;
  let rounds = 0;
  let best = parseInt(localStorage.getItem('guess-best') || '0') || null;
  let guesses = [];
  let gameOver = false;

  if (best) bestEl.textContent = best;

  function updateHint(val) {
    if (!val || gameOver) { hintEl.textContent = '🟢'; return; }
    if (val < target) hintEl.textContent = '⬆️ 大一点';
    else if (val > target) hintEl.textContent = '⬇️ 小一点';
    else hintEl.textContent = '🎉';
  }

  function handleGuess() {
    if (gameOver) return;
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1 || val > 100) {
      result.textContent = '请输入 1-100 之间的数字';
      result.style.color = 'var(--accent-rose)';
      return;
    }
    rounds++;
    roundsEl.textContent = rounds;
    guesses.push(val);

    if (val === target) {
      result.textContent = `🎉 恭喜！你用了 ${rounds} 次猜中了数字 ${target}！`;
      result.style.color = 'var(--accent-emerald)';
      gameOver = true;
      input.disabled = true;
      if (!best || rounds < best) {
        best = rounds;
        localStorage.setItem('guess-best', best);
        bestEl.textContent = best;
      }
    } else if (val < target) {
      result.textContent = `${val} 太小了，再大一点！`;
      result.style.color = 'var(--accent-gold)';
    } else {
      result.textContent = `${val} 太大了，再小一点！`;
      result.style.color = 'var(--accent-gold)';
    }

    updateHint(val);
    historyEl.textContent = '历史: ' + guesses.join(', ');
    input.value = '';
    input.focus();
  }

  function resetGame() {
    target = Math.floor(Math.random() * 100) + 1;
    rounds = 0;
    guesses = [];
    gameOver = false;
    roundsEl.textContent = '0';
    hintEl.textContent = '🟢';
    result.textContent = '';
    result.style.color = '';
    historyEl.textContent = '';
    input.value = '';
    input.disabled = false;
    input.focus();
  }

  btn.addEventListener('click', handleGuess);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleGuess(); });
  reset.addEventListener('click', resetGame);
}

/* ========== Game 2: Typing Speed ========== */
function initTypingTest() {
  const display = document.getElementById('typing-display');
  const input = document.getElementById('typing-input');
  const startBtn = document.getElementById('typing-start');
  const resetBtn = document.getElementById('typing-reset');
  const wpmEl = document.getElementById('typing-wpm');
  const accuracyEl = document.getElementById('typing-accuracy');
  const timeEl = document.getElementById('typing-time');
  const resultEl = document.getElementById('typing-result');

  const texts = [
    'The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.',
    'Algorithm visualization makes complex computer science concepts intuitive and accessible to learners of all levels.',
    'Open source is not just about code. It is about sharing knowledge, building communities, and learning together.',
    'Every great developer you know got there by solving problems they had no business solving, until they did.',
    'Code is like humor. When you have to explain it, it is bad. The best code speaks for itself and needs no comments.',
    'First solve the problem. Then write the code. Too many developers start writing code before understanding the problem.',
    'Simplicity is the soul of efficiency. Great software is not measured by lines of code but by the problems it solves.',
    'The best way to learn programming is to build something you actually want to use. Tutorials only take you so far.',
    'Debugging is twice as hard as writing the code. If you write code as cleverly as possible, you are not smart enough to debug it.',
    'Technology is best when it brings people together. The internet was built on open protocols and shared knowledge.'
  ];

  let currentText = '';
  let startTime = null;
  let timerInterval = null;
  let isRunning = false;
  let isFinished = false;

  function pickText() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    display.innerHTML = currentText.split('').map(ch => `<span>${ch}</span>`).join('');
    input.value = '';
    input.disabled = true;
    wpmEl.textContent = '0';
    accuracyEl.textContent = '100';
    timeEl.textContent = '0';
    resultEl.textContent = '';
    isRunning = false;
    isFinished = false;
    clearInterval(timerInterval);
    startTime = null;
  }

  function startGame() {
    if (isRunning || isFinished) return;
    pickText();
    input.disabled = false;
    isRunning = true;
    startTime = Date.now();
    input.focus();
    timerInterval = setInterval(updateTimer, 200);
  }

  function updateTimer() {
    if (!startTime) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timeEl.textContent = elapsed;
  }

  function updateStats() {
    if (!startTime) return;
    const typed = input.value;
    const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes

    let correct = 0;
    for (let i = 0; i < typed.length && i < currentText.length; i++) {
      if (typed[i] === currentText[i]) correct++;
    }

    const wpm = elapsed > 0 ? Math.round((correct / 5) / elapsed) : 0;
    const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;

    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
  }

  function updateDisplay() {
    const typed = input.value;
    const spans = display.querySelectorAll('span');
    spans.forEach((span, i) => {
      span.classList.remove('correct', 'incorrect', 'current');
      if (i < typed.length) {
        span.classList.add(typed[i] === currentText[i] ? 'correct' : 'incorrect');
      }
    });
    if (typed.length < spans.length) {
      spans[typed.length].classList.add('current');
    }
  }

  function finishGame() {
    if (!isRunning || isFinished) return;
    isRunning = false;
    isFinished = true;
    clearInterval(timerInterval);
    input.disabled = true;
    updateStats();

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const wpm = parseInt(wpmEl.textContent);
    const accuracy = parseInt(accuracyEl.textContent);
    let emoji = wpm > 60 ? '🔥' : wpm > 40 ? '👍' : '💪';
    resultEl.textContent = `${emoji} 完成！WPM: ${wpm} | 准确率: ${accuracy}% | 用时: ${elapsed}秒`;
  }

  input.addEventListener('input', () => {
    if (!isRunning || isFinished) return;
    updateDisplay();
    updateStats();
    if (input.value.length >= currentText.length) {
      finishGame();
    }
  });

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', () => { pickText(); startGame(); });
  pickText();
}

/* ========== Game 3: Reaction Test ========== */
function initReactionTest() {
  const zone = document.getElementById('reaction-zone');
  const text = document.getElementById('reaction-text');
  const timerEl = document.getElementById('reaction-timer');
  const lastEl = document.getElementById('reaction-last');
  const bestEl = document.getElementById('reaction-best');
  const avgEl = document.getElementById('reaction-avg');
  const resultEl = document.getElementById('reaction-result');
  const resetBtn = document.getElementById('reaction-reset');

  let state = 'idle'; // idle | waiting | ready | done | too-early
  let timeoutId = null;
  let startWait = null;
  let results = JSON.parse(localStorage.getItem('reaction-results') || '[]');

  function updateStats() {
    if (results.length > 0) {
      lastEl.textContent = results[results.length - 1];
      bestEl.textContent = Math.min(...results);
      avgEl.textContent = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
    }
  }

  function resetZone() {
    state = 'idle';
    zone.className = 'reaction-zone reaction-zone--idle';
    text.textContent = '点击这里开始';
    timerEl.textContent = '';
    if (timeoutId) clearTimeout(timeoutId);
    updateStats();
  }

  function startTest() {
    state = 'waiting';
    zone.className = 'reaction-zone reaction-zone--waiting';
    text.textContent = '等待...';
    timerEl.textContent = '';

    const delay = Math.random() * 3000 + 1000; // 1-4 seconds random
    timeoutId = setTimeout(() => {
      if (state === 'waiting') {
        state = 'ready';
        zone.className = 'reaction-zone reaction-zone--ready';
        text.textContent = '点击！';
        startWait = performance.now();
      }
    }, delay);
  }

  function handleClick() {
    if (state === 'idle') {
      startTest();
    } else if (state === 'waiting') {
      // Clicked too early
      state = 'too-early';
      zone.className = 'reaction-zone reaction-zone--too-early';
      text.textContent = '太早了！';
      timerEl.textContent = '等绿色再点';
      if (timeoutId) clearTimeout(timeoutId);
      resultEl.textContent = '😅 有点心急，等变成绿色再点击哦';
      resultEl.style.color = 'var(--accent-rose)';
      setTimeout(resetZone, 1500);
    } else if (state === 'ready') {
      const reactionTime = Math.round(performance.now() - startWait);
      state = 'done';
      zone.className = 'reaction-zone reaction-zone--done';
      text.textContent = '你的反应速度';
      timerEl.textContent = reactionTime + 'ms';
      results.push(reactionTime);
      if (results.length > 20) results = results.slice(-20);
      localStorage.setItem('reaction-results', JSON.stringify(results));
      updateStats();

      let feedback = '';
      if (reactionTime < 200) feedback = '⚡ 闪电般的反应！你是职业电竞选手吗？';
      else if (reactionTime < 300) feedback = '🔥 非常快！你的反应速度超过大多数人';
      else if (reactionTime < 400) feedback = '👍 不错的反应速度，继续保持';
      else if (reactionTime < 500) feedback = '😊 中等水平，可以多练练';
      else feedback = '🐢 稍微有点慢，再来一次吧';
      resultEl.textContent = feedback;
      resultEl.style.color = 'var(--accent-emerald)';

      setTimeout(resetZone, 2000);
    }
    // Nothing happens if 'done' or 'too-early'
  }

  function resetAll() {
    results = [];
    localStorage.removeItem('reaction-results');
    lastEl.textContent = '--';
    bestEl.textContent = '--';
    avgEl.textContent = '--';
    resultEl.textContent = '';
    resetZone();
  }

  zone.addEventListener('click', handleClick);
  resetBtn.addEventListener('click', resetAll);
  updateStats();
  resetZone();
}
