let yesCount = 0;

function showScreen(number){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen" + number).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function answerLove(answer){
  const msg=document.getElementById("noMessage");
  const noButton=document.getElementById("noButton");

  if(answer){
    msg.textContent="I knew it. ❤️";
    setTimeout(()=>showScreen(2),500);
  }else{
    msg.textContent="Wrong answer. Try again. 😭❤️";
    noButton.animate(
      [{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],
      {duration:350}
    );
  }
}

function updateLove(value){
  value=Number(value);

  document.getElementById("loveNumber").textContent=value+"%";

  const face=document.getElementById("loveMeterFace");
  const msg=document.getElementById("sliderMessage");
  const button=document.getElementById("continue2");

  if(value<20){
    face.textContent="😭";
    msg.textContent="That's very low... my heart is breaking. 😭";
  }else if(value<40){
    face.textContent="🥺";
    msg.textContent="Please... a little more? 🥺";
  }else if(value<60){
    face.textContent="😐";
    msg.textContent="We're getting there...";
  }else if(value<80){
    face.textContent="🙂";
    msg.textContent="Okay, that's better! ❤️";
  }else if(value<100){
    face.textContent="🥰";
    msg.textContent="Almost there! Keep going! 💕";
  }else{
    face.textContent="😍";
    msg.textContent="100%! Now I can smile. ❤️";
  }

  button.disabled=value!==100;
  button.classList.toggle("disabled-btn",value!==100);
}

function clickYes(){
  if(yesCount>=100)return;

  yesCount++;
  document.getElementById("yesCount").textContent=yesCount;

  const button=document.getElementById("hundredButton");
  button.animate(
    [{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],
    {duration:120}
  );

  const remaining=100-yesCount;

  if(remaining>0){
    document.getElementById("hundredMessage").textContent=
      remaining+" more YES"+(remaining===1?"":"es")+" to go 😈❤️";
  }else{
    document.getElementById("hundredMessage").textContent=
      "Okay okay, you did it! 😂❤️";
    button.textContent="DONE ❤️";
    button.disabled=true;

    setTimeout(()=>showScreen(4),800);
  }
}

function createHeart(){
  const heart=document.createElement("div");
  heart.className="floating-heart";
  heart.textContent=["❤️","💗","💕","💖"][Math.floor(Math.random()*4)];
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(14+Math.random()*22)+"px";
  heart.style.animationDuration=(5+Math.random()*6)+"s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),12000);
}

setInterval(createHeart,700);
for(let i=0;i<10;i++)setTimeout(createHeart,i*250);
