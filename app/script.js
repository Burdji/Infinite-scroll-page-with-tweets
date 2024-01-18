

let body= document.querySelector("body");
const loading= document.createElement('div');
    loading.className="loadingEl";
    loading.innerHTML=`
    <img class="loadGif" src="LoaderGif.gif">`;
let text = document.querySelectorAll('.lorem');
let mid= document.querySelector(".mid");
load(8);
function createTweet(name, handle, timeStamp, text){
   const template=`<div class="tweet">
   <div class="tweet_column avatar">
       <img class="pic" src="https://media.tenor.com/Mv3Nh1d4TsoAAAAC/steve-harvey-meatcanyon.gif">  
   </div>  
   <div class="tweet_column main">
       <div class="top">
           <div class="topleft">
               <div class="header">${name}</div>
               <div class="badge">
                   <img class="checkmark" src="pngwing.com.png" alt="">
               </div>
               <div class="username">@${handle}<span class="dot">·</span><span class="time">${timeStamp}h</span></div>
           </div>
           <div class="options">
               <img class="dots" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/more-horizontal-512.png" alt="">
           </div>
       </div>
       <div class="mid">
           <div class="lorem" id="lorem">${text}</div>
       </div>
       <div class="bot">
           <div class="icons">
               <img class="icon reply" src="https://cdn3.iconfinder.com/data/icons/twitter-25/512/158_Twitter_Chat_Chatting-512.png" alt="">
               <div class="count reply_count">100</div>
           </div>
           <div class="icons">
               <img class="icon retweet" src="https://cdn1.iconfinder.com/data/icons/systemui-vol-2/21/retweet-256.png" alt="">
               <div class="count">300</div>
           </div>
           <div class="icons">
               <img class="icon like" src="https://cdn3.iconfinder.com/data/icons/twitter-25/512/166_Heart_Love_Like_Twitter-256.png" alt="">
               <div class="count">100</div>
           </div>
           <div class="icons">
               <img class="icon views" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/bar-chart-2-256.png" alt="">
               <div class="count">100</div>
           </div>
       </div>
   </div>
</div>`
   return template;
}
function randomLorem(){
   let lorem= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur numquam ratione molestiae laudantium sed, minima, laborum vitae eveniet sapiente maxime, esse velit porro praesentium nam magnam delectus? Exercitationem, praesentium illo.".split(' ');
   result="";
   for(let i=0; i<=100; i+=Math.floor(Math.random() * 9)){
      result+=lorem[Math.floor(Math.random()*30)]+" ";
      
   }
   // text.innerHTML=result;
   return result;
}
function populatePage(num){
   let stamp=0;
   for(let i=0;i<num;i++){
      body.innerHTML+=createTweet('name','username',stamp,randomLorem());
      stamp++;
   }
}
function load(count){
    body.appendChild(loading);
    setTimeout(()=>{
        loading.remove();
        populatePage(count);
    },'2000');
}
window.addEventListener('scroll',()=>{
    let docHeight=document.documentElement.scrollHeight-window.innerHeight;
    let scrolled=window.scrollY;
    if (scrolled==docHeight){
        load(3);
    }
})
