// PERSONALISE YOUR BIRTHDAY PAGE HERE
const birthdayName = "Beautiful Human"; // Replace with the person's name

document.getElementById("letterName").textContent = birthdayName;
document.getElementById("birthdayName").textContent = birthdayName;

const openingScreen = document.getElementById("openingScreen");
const letterScreen = document.getElementById("letterScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const envelopeButton = document.getElementById("envelopeButton");
const tapButton = document.getElementById("tapButton");

function openSurprise() {
  if (openingScreen.classList.contains("opening")) return;

  openingScreen.classList.add("opening");

  // After the envelope animation, remove the welcome screen from page layout.
  setTimeout(() => {
    openingScreen.classList.add("fade-out");
    letterScreen.classList.add("show");
    letterScreen.setAttribute("aria-hidden", "false");

    // This prevents the hidden welcome screen from pushing the next page down.
    setTimeout(() => {
      openingScreen.style.display = "none";
    }, 800);
  }, 850);
}
envelopeButton.addEventListener("click", openSurprise);
tapButton.addEventListener("click", openSurprise);
openingScreen.addEventListener("click", event => {
  if (event.target === openingScreen) openSurprise();
});

document.getElementById("continueButton").addEventListener("click", () => {
  letterScreen.style.opacity = "0";

  setTimeout(() => {
    letterScreen.classList.remove("show");
    letterScreen.setAttribute("aria-hidden", "true");

    // Ensure the first two stages no longer occupy page space.
    openingScreen.style.display = "none";
    letterScreen.style.display = "none";

    birthdayScreen.classList.add("show");
    birthdayScreen.setAttribute("aria-hidden", "false");

    window.scrollTo({ top: 0, behavior: "instant" });
  }, 450);
});
document.getElementById("wishButton").addEventListener("click", () => {
  document.getElementById("wishResult").textContent = "May all your wishes come true! ✨";
  makeConfetti();
});

// Photo picker: previews the selected image in its frame; nothing is uploaded.
document.querySelectorAll(".memory-card input").forEach(input => {
  input.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const card = input.closest(".memory-card");
    const image = card.querySelector("img");
    image.src = URL.createObjectURL(file);
    image.style.display = "block";
    card.querySelector("span").style.display = "none";
  });
});

// Floating decorative stars and flowers.
const sparkleBox = document.getElementById("sparkles");
const sparkleSymbols = ["✿", "♡", "✧", "·", "✦"];
for (let i = 0; i < 24; i++) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = sparkleSymbols[i % sparkleSymbols.length];
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.fontSize = `${10 + Math.random() * 13}px`;
  sparkle.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
  sparkle.style.setProperty("--move", `${-18 + Math.random() * 36}px`);
  sparkleBox.appendChild(sparkle);
}

function makeConfetti() {
  const symbols = ["♡", "✿", "✧", "♥"];
  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(piece.style, {
      position: "fixed", left: `${Math.random() * 100}vw`, top: "-25px",
      zIndex: 20, color: ["#d45c89", "#e8a8bd", "#a98acb"][i % 3],
      fontSize: `${14 + Math.random() * 16}px`, pointerEvents: "none",
      transition: "transform 2.8s ease-in, opacity 2.8s"
    });
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translate(${(Math.random() - .5) * 180}px, ${innerHeight + 80}px) rotate(${Math.random() * 500}deg)`;
      piece.style.opacity = "0";
    });
    setTimeout(() => piece.remove(), 3000);
  }
}
