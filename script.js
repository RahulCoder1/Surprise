const birthdayName = "My Love"; // Change this to your girlfriend's name
document.getElementById("gfName").textContent = birthdayName;
const opened = new Set();
const messages = {
 love:{symbol:"♥",kicker:"A LITTLE LOVE NOTE",title:"You are my favourite person.",text:"You make ordinary moments feel magical. I am grateful for your smile, your kindness and every little thing that makes you you."},
 sunshine:{symbol:"✿",kicker:"MY SUNSHINE",title:"Keep blooming, beautiful.",text:"May your days be bright, your heart stay light, and may life always give you reasons to smile like sunshine."},
 wish:{symbol:"✧",kicker:"A WISH FROM MY HEART",title:"May every dream find you.",text:"I wish you happiness in little things, courage for big dreams and beautiful surprises at every turn."}
};
const buttons=[...document.querySelectorAll(".neo-button")];
buttons.forEach(button=>button.addEventListener("click",()=>{
 const id=button.dataset.id, m=messages[id]; opened.add(id); button.classList.add("selected");
 document.getElementById("messageSymbol").textContent=m.symbol;
 document.getElementById("messageKicker").textContent=m.kicker;
 document.getElementById("messageTitle").textContent=m.title;
 document.getElementById("messageText").textContent=m.text;
 document.querySelectorAll(".progress-dots i").forEach((dot,i)=>dot.classList.toggle("done",i<opened.size));
 document.getElementById("helper").textContent=`${opened.size} of 3 opened · ${opened.size===3?"your surprise is ready":"open the remaining symbol(s)"}`;
 document.getElementById("unlockButton").disabled=opened.size!==3;
 burst(12);
}));
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("active",s.id===id));}
document.getElementById("unlockButton").addEventListener("click",()=>{if(opened.size===3)show("step2")});
document.getElementById("nextWish").addEventListener("click",()=>show("step3"));
document.querySelectorAll(".back").forEach(b=>b.addEventListener("click",()=>show(b.dataset.back)));
document.getElementById("heartBurst").addEventListener("click",()=>{document.getElementById("finalLine").textContent="A thousand hearts, and every one belongs to you. ♥";burst(55)});
function burst(n){const layer=document.getElementById("particles");const symbols=["♥","♡","✧","✿"];for(let i=0;i<n;i++){const el=document.createElement("span");el.textContent=symbols[i%symbols.length];el.style.left=Math.random()*100+"%";el.style.top=(25+Math.random()*65)+"%";el.style.fontSize=(12+Math.random()*18)+"px";el.style.animationDuration=(2+Math.random()*2)+"s";layer.appendChild(el);setTimeout(()=>el.remove(),4500)}}
const layer=document.getElementById("particles");for(let i=0;i<18;i++){const el=document.createElement("span");el.textContent=["♡","✧","·","✦"][i%4];el.style.left=Math.random()*100+"%";el.style.top=Math.random()*100+"%";el.style.fontSize=(9+Math.random()*12)+"px";el.style.animationDelay=Math.random()*3+"s";layer.appendChild(el)}
