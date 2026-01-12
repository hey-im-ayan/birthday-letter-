document.addEventListener("DOMContentLoaded", () => {

  /* ================= POPPERS ================= */
  const leftPopper = document.querySelector(".left-popper");
  const rightPopper = document.querySelector(".right-popper");

  // first page pop
  setTimeout(() => {
    leftPopper.classList.add("show-left");
    rightPopper.classList.add("show-right");
  }, 300);

  /* ================= PAGE SWITCH ================= */
  const startBtn = document.getElementById("startBtn");
  const page1 = document.getElementById("page-1");
  const page2 = document.getElementById("page-2");
  const page3 = document.getElementById("page-3");
  const page4 = document.getElementById("page-4");
  const page5 = document.getElementById("page-5");

  startBtn?.addEventListener("click", () => {
    page1.classList.remove("active");
    page2.classList.add("active");
  });

  /* ================= FLOWER RAIN ================= */
  const flowers = ["🌸", "💮", "✨", "🌷", "🌺"];

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 5 + Math.random() * 5 + "s";
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 10000);
  }

  setInterval(createFlower, 600);

  /* ================= ENVELOPE ================= */
  const envelope = document.getElementById("envelope");
  const seal = document.getElementById("seal");
  const letter = document.getElementById("letter");
  const typedText = document.getElementById("typedText");
  const continueBtn = document.querySelector(".continue-btn");

  continueBtn?.addEventListener("click", () => {
    page2.classList.remove("active");
    page3.classList.add("active");
  });

  if (seal && envelope && letter && typedText) {
    const message =
      "My dear 💗\n\n This little letter comes with warmth, smiles and birthday wishes.\nI hope it makes you feel truly special ✨";

    let index = 0;

    seal.addEventListener("click", () => {
      envelope.classList.add("open");
      letter.classList.add("show");
      seal.style.display = "none";

      setTimeout(() => letter.classList.add("fixed"), 900);
      typeText(message);
    });

    function typeText(text) {
      typedText.innerHTML = "";
      index = 0;

      const typing = setInterval(() => {
        if (index < text.length) {
          typedText.innerHTML += text[index] === "\n" ? "<br>" : text[index];
          index++;
        } else clearInterval(typing);
      }, 40);
    }
  }

  /* ================= CAKE CUT ================= */
  const cake = document.querySelector(".cake");

  let startX = 0;
  let dragging = false;

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function startDrag(e) {
    dragging = true;
    startX = getX(e);
  }

  function moveDrag(e) {
    if (!dragging) return;

    const diff = Math.max(0, Math.min(getX(e) - startX, 120));

    if (diff >= 120) {
      dragging = false;
      cutCake();
    }
  }

  function stopDrag() {
    dragging = false;
  }

  cake?.addEventListener("mousedown", startDrag);
  cake?.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", moveDrag);
  document.addEventListener("touchmove", moveDrag);

  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);

  function cutCake() {
    cake.classList.add("cut");

    // 🎉 pop first
    leftPopper.classList.remove("show-left");
    rightPopper.classList.remove("show-right");

    void leftPopper.offsetWidth;
    void rightPopper.offsetWidth;

    leftPopper.classList.add("show-left");
    rightPopper.classList.add("show-right");

    // ⏱ then page change
    setTimeout(() => {
      page3.classList.remove("active");
      page4?.classList.add("active");
    }, 1200);
  }

  /* ================= WISH DONE → PAGE 5 ================= */
  const wishDoneBtn = document.getElementById("wishDoneBtn");

  wishDoneBtn?.addEventListener("click", () => {

    // ✨ sparkles
    for (let i = 0; i < 20; i++) {
      const s = document.createElement("div");
      s.innerText = "✨";
      s.style.position = "fixed";
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = "60%";
      s.style.fontSize = "22px";
      s.style.animation = "pop 1.2s ease forwards";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }

    setTimeout(() => {
      page4.classList.remove("active");
      page5.classList.add("active");
    }, 600);
  });

});
const page4 = document.getElementById("page-4");
const wishVideo = document.getElementById("wishVideo");

if (page4) {
  const observer = new MutationObserver(() => {
    if (page4.classList.contains("active") && wishVideo) {
      wishVideo.muted = false;
      wishVideo.volume = 1;
      wishVideo.play().catch(() => {});
    }
  });

  observer.observe(page4, { attributes: true });
}

/* ================= PLAYLIST MUSIC ================= */

const bgMusic = document.getElementById("bgMusic");
const songCards = document.querySelectorAll(".song-card");

songCards.forEach(card => {
  card.addEventListener("click", () => {
    const song = card.getAttribute("data-song");

    if (bgMusic.src !== song) {
      bgMusic.src = song;
      bgMusic.play();
    }
  });
});

/* ===== MUSIC PAGE CONTINUE ===== */

const musicContinue = document.getElementById("musicContinue");

if (musicContinue) {
  musicContinue.addEventListener("click", () => {
    const page5 = document.getElementById("page-5");
    const page6 = document.getElementById("page-6");

    page5.classList.remove("active");
    page6.classList.add("active");
  });
}

/* ================= WISH CARD LOGIC ================= */

let flippedCount = 0;
const totalCards = document.querySelectorAll(".wish-card").length;
const percentText = document.getElementById("flipPercent");
const finalBtn = document.getElementById("finalBtn");
const page6 = document.getElementById("page-6");
const page7 = document.getElementById("page-7");

function flipCard(card) {
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCount++;

  const percent = Math.round((flippedCount / totalCards) * 100);
  percentText.innerText = percent + "%";

  if (flippedCount === totalCards) {
    setTimeout(() => {
      finalBtn.style.display = "block";
      finalBtn.classList.add("cute-btn");
    }, 600);
  }
}

/* ================= PAGE 7 TRIGGER ================= */

finalBtn?.addEventListener("click", () => {
  page6.classList.remove("active");
  page7.classList.add("active");

  setTimeout(() => {
    startTyping();
    startCandleFloat();  // 🕯️ floating candle
    startHeartFloat();   // 💗 floating hearts
    startFinalEmojiRain(); // 🎉 emoji rain (once)
  }, 300);
});


/* ================= FINAL EMOJI RAIN ================= */

let finalEffectPlayed = false;

function startFinalEmojiRain() {
  if (finalEffectPlayed) return;
  finalEffectPlayed = true;

  const emojis = ["🎉", "🎊", "💖", "✨", "🥳", "🎈", "💝"];
  const container = document.getElementById("emojiRain");

  for (let i = 0; i < 40; i++) {
    const e = document.createElement("div");
    e.className = "final-emoji";
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    e.style.left = Math.random() * 100 + "vw";
    e.style.animationDelay = Math.random() * 0.8 + "s";

    container.appendChild(e);
    setTimeout(() => e.remove(), 3500);
  }
}
/* =========================
   PAGE 7 – FINAL LOGIC
========================= */

const letterText = `
My Dearest Nandi,
Happy Birthday,
You deserve everything and so much more.—Always loving, caring ar unmatchable.
Eto talkative ba experince noi tai same line barbar bolchi, Haste thak.fullfill ur dream.
ar cake ta amar jonno rakh! 🎂,always be happy 🧿
`;

const letterBox = document.getElementById("finalTypedText");
const sealBtn = document.getElementById("sealLetterBtn");
const restartBtn = document.getElementById("restartBtn");
const sealDialog = document.getElementById("sealDialog");
const sendBtn = document.getElementById("sendThanksBtn");

let typingIndex = 0;

/* TYPE EFFECT */
function startTyping() {
  letterBox.innerHTML = "";
  typingIndex = 0;

  const interval = setInterval(() => {
    letterBox.innerHTML += letterText.charAt(typingIndex);
    typingIndex++;

    if (typingIndex >= letterText.length) {
      clearInterval(interval);
    }
  }, 35);
}


/* SEAL LETTER */
sealBtn.addEventListener("click", () => {
  sealDialog.style.display = "flex";

  const box = document.querySelector(".seal-box");
  box.classList.add("seal-animate");

  
});


/* SEND THANKS – EMOJI BLAST */
sendBtn.addEventListener("click", () => {
  blastEmoji();
});

/* RESTART EXPERIENCE */
restartBtn.addEventListener("click", () => {
  location.reload();
});

/* EMOJI BLAST FUNCTION */
function blastEmoji() {
  const emojis = ["🎉", "💖", "✨", "🥳", "🎈", "💝"];

  for (let i = 0; i < 30; i++) {
    const e = document.createElement("div");
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    e.style.position = "fixed";
    e.style.left = Math.random() * 100 + "vw";
    e.style.top = "50%";
    e.style.fontSize = "22px";
    e.style.zIndex = "1000";
    e.style.animation = "emojiFly 2.8s linear";

    document.body.appendChild(e);

    setTimeout(() => e.remove(), 2800);
  }
}
function startHeartFloat() {
  setInterval(() => {
    const h = document.createElement("div");
    h.innerText = "💗";
    h.style.position = "fixed";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.fontSize = "18px";
    h.style.opacity = "0.7";
    h.style.animation = "heartUp 6s linear";

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }, 900);
}
const dateEl = document.getElementById("todayDate");

if (dateEl) {
  const today = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  dateEl.innerText = today.toLocaleDateString("en-GB", options);
}
function startCandleFloat() {
  setInterval(() => {
    const c = document.createElement("div");
    c.className = "floating-candle";
    c.innerText = "🕯️";
    c.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 10000);
  }, 1800);
}

