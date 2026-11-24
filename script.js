// PERSONALISE THESE TWO VALUES BEFORE SHARING
const girlfriendName = "My Love";
const birthdayDate = "2026-12-25T00:00:00"; // YYYY-MM-DDTHH:MM:SS (local time)

document.title = `A Surprise for ${girlfriendName} ♡`;
const stages = [...document.querySelectorAll(".stage")];
const stepLabel = document.getElementById("stepLabel");
const progress = document.getElementById("progress");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const navHint = document.getElementById("navHint");
let current = 0;

function showStage(index) {
  if (index < 0 || index >= stages.length) return;
  stages.forEach((stage, i) => {
    stage.classList.toggle("active", i === index);
    stage.setAttribute("aria-hidden", String(i !== index));
  });
  current = index;
  stepLabel.innerHTML = `${String(index + 1).padStart(2, "0")} <i>/</i> 09`;
  progress.style.width = `${((index + 1) / stages.length) * 100}%`;
  backButton.disabled = index === 0;
  nextButton.disabled = index === 0 || (index === 1 && !giftOpened) || (index === 2 && !letterOpened) || (index === 4 && !allReasonsChosen()) || index === 8;
  const reasonsContinue = document.querySelector('[data-stage="4"] [data-next]');
  if (reasonsContinue) reasonsContinue.disabled = !allReasonsChosen();
  nextButton.textContent = index === 8 ? "Finished ♥" : "Next →";
  navHint.textContent = [
    "Tap the heart to begin", "Open the gift to continue", "Open your letter to continue",
    "A story made of little moments", "Choose all three hearts", "A countdown just for you",
    "Make a birthday wish", "A promise from my heart", "Choose a song for us"
  ][index];
  if (index === 5) updateCountdown();
}
function allReasonsChosen(){ return [...document.querySelectorAll(".reason-heart")].every(item => item.classList.contains("selected")); }
function goNext(){ if (!nextButton.disabled) showStage(current + 1); }
function goBack(){ showStage(current - 1); }

let giftOpened = false;
let letterOpened = false;
document.getElementById("beginButton").addEventListener("click", () => showStage(1));
document.getElementById("beginText").addEventListener("click", () => showStage(1));
backButton.addEventListener("click", goBack);
nextButton.addEventListener("click", goNext);
document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => showStage(current + 1)));

const giftButton = document.getElementById("giftButton");
giftButton.addEventListener("click", () => {
  if (giftOpened) return;
  giftOpened = true;
  giftButton.classList.add("open");
  document.getElementById("giftMessage").textContent = `For ${girlfriendName}: a little reminder that you are loved more than words can say. ♥`;
  document.getElementById("giftNext").disabled = false;
  nextButton.disabled = false;
});
document.getElementById("giftNext").addEventListener("click", () => showStage(2));

const envelopeButton = document.getElementById("envelopeButton");
envelopeButton.addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;
  envelopeButton.classList.add("open");
  document.getElementById("letterText").classList.add("show");
  document.getElementById("letterNext").disabled = false;
  nextButton.disabled = false;
});
document.getElementById("letterNext").addEventListener("click", () => showStage(3));

document.querySelectorAll(".reason-heart").forEach((heart, index) => {
  heart.addEventListener("click", () => {
    heart.classList.add("selected");
    document.getElementById("reasonMessage").textContent = heart.dataset.message;
    const allChosen = [...document.querySelectorAll(".reason-heart")].every(item => item.classList.contains("selected"));
    navHint.textContent = allChosen ? "All three messages revealed — continue when ready" : `Lovely! ${[...document.querySelectorAll(".reason-heart")].filter(item => item.classList.contains("selected")).length} of 3 hearts explored`;
    if (allChosen) {
      nextButton.disabled = false;
      const reasonsContinue = document.querySelector('[data-stage="4"] [data-next]');
      if (reasonsContinue) reasonsContinue.disabled = false;
    }
  });
});

const target = new Date(birthdayDate);
function updateCountdown(){
  if (Number.isNaN(target.getTime())) {
    document.getElementById("countdownNote").textContent = "Please enter a valid birthday date in script.js.";
    return;
  }
  let diff = target - new Date();
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    document.getElementById("countdownNote").textContent = "It's your special day! Happy Birthday! ♡";
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("wishButton").addEventListener("click", () => {
  document.getElementById("wishMessage").textContent = "May every beautiful wish in your heart come true! ✨";
  const symbols = ["♥","♡","✦","✧","🌸"];
  for(let i=0;i<30;i++){
    const item=document.createElement("span");
    item.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    item.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-24px;z-index:20;pointer-events:none;color:${["#e94d91","#f5a1c5","#c48acb"][i%3]};font-size:${14+Math.random()*16}px;transition:transform 2.5s ease-in,opacity 2.5s`;
    document.body.appendChild(item);
    requestAnimationFrame(()=>{item.style.transform=`translate(${(Math.random()-.5)*130}px,${innerHeight+50}px) rotate(${Math.random()*400}deg)`;item.style.opacity="0";});
    setTimeout(()=>item.remove(),2700);
  }
});

const songInput=document.getElementById("songInput");
const audio=document.getElementById("audioPlayer");
let audioUrl=null;
songInput.addEventListener("change",event=>{
  const file=event.target.files?.[0];
  if(!file)return;
  if(audioUrl)URL.revokeObjectURL(audioUrl);
  audioUrl=URL.createObjectURL(file);
  audio.src=audioUrl;
  document.getElementById("songName").textContent=file.name;
});
audio.addEventListener("play",()=>document.getElementById("vinyl").classList.add("playing"));
audio.addEventListener("pause",()=>document.getElementById("vinyl").classList.remove("playing"));

document.getElementById("restartButton").addEventListener("click",()=>{
  giftOpened=false;letterOpened=false;
  giftButton.classList.remove("open");
  document.getElementById("giftNext").disabled=true;
  envelopeButton.classList.remove("open");
  document.getElementById("letterText").classList.remove("show");
  document.getElementById("letterNext").disabled=true;
  document.querySelectorAll(".reason-heart").forEach(h=>h.classList.remove("selected"));
  const reasonsContinue = document.querySelector('[data-stage="4"] [data-next]');
  if (reasonsContinue) reasonsContinue.disabled = true;
  document.getElementById("reasonMessage").textContent="Choose a heart to reveal your message ♡";
  document.getElementById("wishMessage").textContent="";
  audio.pause();
  showStage(0);
});

const particles=document.getElementById("particles");
for(let i=0;i<24;i++){
  const p=document.createElement("span");
  p.className="particle";p.textContent=["♡","✦","·","♥"][i%4];
  p.style.left=`${Math.random()*100}%`;p.style.top=`${Math.random()*100}%`;
  p.style.fontSize=`${9+Math.random()*13}px`;p.style.animationDelay=`${Math.random()*4}s`;
  particles.appendChild(p);
}
showStage(0);
