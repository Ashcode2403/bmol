const $ = (id) => document.getElementById(id);
const toast = (message) => { const el=$("toast"); el.textContent=message; el.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600); };

$("enterBtn").addEventListener("click",()=>{$("mood").scrollIntoView({behavior:"smooth"});});
document.querySelectorAll(".mood-card").forEach(card=>card.addEventListener("click",()=>{
  document.querySelectorAll(".mood-card").forEach(c=>c.classList.remove("selected")); card.classList.add("selected");
  const messages={
    sad:"It's okay to feel sad, Bathu Mole. You don't have to hide it. Take your time. ❤️",
    overthinking:"One thought at a time. You don't need to solve tomorrow tonight. Namukku pathukke samsaarikkaam.",
    love:"Sending you the biggest virtual hug. You are loved, exactly as you are. 🫂",
    happy:"Keep that smile! I hope today gives you a hundred little reasons to be happy. 🌷"
  };
  $("moodResponse").textContent=messages[card.dataset.mood];
}));
const loveMessages=[
  "You don't have to be perfect to be loved. I love you on the ordinary days too. ❤️",
  "Your feelings are important to me. I want to understand them, not argue them away.",
  "Even when the future feels unclear, we can make the next right step together.",
  "Bathu Mole, your smile is one of my favourite things. I hope you find a reason to smile today.",
  "Ninte santhosham enikku important aanu. Take care of your heart, my favourite person."
];
$("loveBoxBtn").addEventListener("click",()=>{$("loveBoxMessage").textContent=loveMessages[Math.floor(Math.random()*loveMessages.length)];});
$("releaseWorryBtn").addEventListener("click",()=>{
  const value=$("worryInput").value.trim();
  if(!value){$("worryMessage").textContent="You can write a thought here first, if you want. No pressure.";return;}
  $("worryInput").value="";
  $("worryMessage").textContent="Thank you for giving that thought a little space. You can come back to it when you're ready. For now, take one gentle breath. ❤️";
});
const missions=["Stretch your shoulders and take three slow breaths.","Play your favourite part of our song and enjoy it.","Think of one tiny thing that made you smile today.","Send me a random heart when you feel like it. No explanation needed.","Drink a little water and give yourself a soft smile.","Imagine our next happy day together. What would we do?"];
$("missionBtn").addEventListener("click",()=>{$("missionMessage").textContent=missions[Math.floor(Math.random()*missions.length)];});
let breathing=false, breathInterval=null, breathTimeout=null, phase=0;
$("breathBtn").addEventListener("click",()=>{
  if(breathing){clearInterval(breathInterval);clearTimeout(breathTimeout);breathing=false;$("breathFlower").classList.remove("breathe");$("breathLabel").textContent="Paused. Take your time.";$("breathBtn").textContent="Start again";return;}
  breathing=true;let elapsed=0;phase=0;
  const update=()=>{const inhale=phase%2===0;$("breathFlower").classList.toggle("breathe",inhale);$("breathLabel").textContent=inhale?"Breathe in gently · 4 seconds":"Breathe out slowly · 6 seconds";phase++;};
  update();breathInterval=setInterval(update,5000);
  breathTimeout=setTimeout(()=>{clearInterval(breathInterval);breathing=false;$("breathFlower").classList.remove("breathe");$("breathLabel").textContent="You did lovely. Take a moment. ❤️";$("breathBtn").textContent="Start again";},60000);
  $("breathBtn").textContent="Pause breathing";
});
$("letterButton").addEventListener("click",()=>{$("letter").scrollIntoView({behavior:"smooth"});toast("A little reminder, whenever you need it. ❤️");});
$("saveMemoryBtn").addEventListener("click",()=>{
  const value=$("memoryText").value.trim();if(!value){toast("Write a little memory first.");return;}
  $("savedMemory").textContent="Saved in this page for now: “"+value+"”";$("memoryText").value="";
});
$("photoUpload").addEventListener("change",e=>{
  const files=[...e.target.files];if(!files.length)return;
  const grid=$("photoGrid");
  files.forEach(file=>{if(!file.type.startsWith("image/"))return;const url=URL.createObjectURL(file);const img=document.createElement("img");img.src=url;img.alt="A memory with Bathu Mole";grid.prepend(img);});
  toast(files.length+" photo(s) added to this browser view.");
});
$("memoryUpload").addEventListener("change",async e=>{
  const file=e.target.files[0];if(!file)return;const text=await file.text();$("chatPreview").textContent=text.slice(0,500)+(text.length>500?"…":"");toast("Your memory text has been added to the diary.");
});
$("hugBtn").addEventListener("click",()=>{
  $("finalReveal").innerHTML="🧸 <strong>Hug delivered!</strong><br>Oru big tight hug, Bathu Mole. I hope you can feel how much you are loved. ❤️";
  for(let i=0;i<18;i++){const h=document.createElement("span");h.textContent=["♡","♥","✦"][i%3];h.style.position="fixed";h.style.left=Math.random()*100+"vw";h.style.top="100vh";h.style.color="#d47da2";h.style.fontSize=(16+Math.random()*22)+"px";h.style.zIndex=30;h.style.transition="transform 3s ease, opacity 3s";document.body.append(h);requestAnimationFrame(()=>{h.style.transform=`translateY(-110vh) rotate(${Math.random()*180}deg)`;h.style.opacity="0";});setTimeout(()=>h.remove(),3200);}
});
$("secretLetterBtn").addEventListener("click",()=>{
  $("finalReveal").textContent="My love, if you ever feel afraid, please tell me. I may not always know the perfect words, but I want to listen, understand and keep building something honest with you. You are not a burden. Your feelings are never too much. ❤️";
});
$("voiceUpload").addEventListener("change",e=>{
  const file=e.target.files[0];if(!file)return;const url=URL.createObjectURL(file);$("voicePlayer").src=url;$("voicePlayer").hidden=false;$("voicePlayer").play().catch(()=>{});toast("Your voice recording is ready to play.");
});
const song=$("song"),play=$("playSong");
if(!song.getAttribute("src")){play.disabled=true;play.title="Add the provided MP3 to assets to enable music.";}
play.addEventListener("click",async()=>{if(song.paused){try{await song.play();play.textContent="Ⅱ";}catch(e){toast("Please check that the song file is in the assets folder.");}}else{song.pause();play.textContent="▶";}});
song.addEventListener("ended",()=>play.textContent="▶");
$("volume").addEventListener("input",e=>song.volume=Number(e.target.value));
song.volume=.7;
$("musicToggle").addEventListener("click",()=>{$("musicPlayer").classList.toggle("closed");});
$("closeMusic").addEventListener("click",()=>{$("musicPlayer").classList.add("closed");});

// Added feelings form: opens the visitor's configured email app with a prefilled draft.
$("feelingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("feelingName").value.trim();
  const senderEmail = $("feelingEmail").value.trim();
  const mood = $("feelingMood").value;
  const message = $("feelingMessage").value.trim();
  if (!name || !senderEmail || !mood || !message) {
    $("feelingsStatus").textContent = "Please fill in all the fields first. ❤️";
    return;
  }
  const recipient = "ashfaquethuyyadi600@gmail.com";
  const subject = encodeURIComponent("A message from " + name + " ❤️");
  const body = encodeURIComponent(
    "Hi Ashfaque,\n\n" +
    "Name: " + name + "\n" +
    "Email: " + senderEmail + "\n" +
    "Feeling: " + mood + "\n\n" +
    "What's in my heart:\n" + message + "\n\n" +
    "With love,\n" + name + " ❤️"
  );
  $("feelingsStatus").textContent = "Opening your email app with your message... ❤️";
  window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
});
