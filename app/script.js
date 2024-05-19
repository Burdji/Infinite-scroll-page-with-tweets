let body= document.querySelector("body");
const loading= document.createElement('div');
loading.className="loadingEl";
loading.innerHTML=`
    <img class="loadGif" src="LoaderGif.gif">`;
let text = document.querySelectorAll('.lorem');
let mid= document.querySelector(".mid");
const url= 'http://localhost:8080/home';
let stamp=0;
load(8);
function createTweet(img, name, handle, timeStamp, text){
    const tweet=document.createElement(`div`);
    tweet.classList.add('tweet');
    tweet.innerHTML=`
    <div class="tweet_column avatar">
        <img class="pic" src="http://localhost:8080/media/${img}">  
    </div>  
    <div class="tweet_column main">
        <div class="top">
            <div class="topleft">
                <div class="header">${name}</div>
                <div class="badge">
                   <img class="checkmark" src="http://localhost:8080/icons/verified.png" alt="">
                </div>
                <div class="username" id="usName">@${handle}<span class="dot">·</span><span class="time">${timeStamp}h</span></div>
            </div>
            <div class="options">
               <img class="dots" src="http://localhost:8080/icons/more.png" alt=""
               title="more">
            </div>
        </div>
        <div class="mid">
           <div class="lorem" id="lorem">${text}</div>
        </div>
        <div class="bot">
            <div class="icons">
               <img class="icon reply" src="http://localhost:8080/icons/reply.png" alt=""
               title="replies">
               <div class="replies count">100</div>
            </div>
            <div class="icons">
               <img class="icon retweet" src="http://localhost:8080/icons/retweet.png" alt=""
               title="retweets">
               <div class="retweets count">300</div>
            </div>
            <div class="icons">
               <img class="icon like" src="http://localhost:8080/icons/heart.png" alt=""
               title="likes">
               <div class="likes count"></div>
            </div>
            <div class="icons">
                <img class="icon views" src="http://localhost:8080/icons/views.png" alt=""
                title="views">
                <div class="view count">100</div>
            </div>
        </div>
    </div>`;
    const heart = tweet.querySelector('.like');
    const likes = tweet.querySelector('.likes');
    likes.textContent = random(101,999);
    let altLikes = Number(likes.textContent);
    let isLiked = false;

    heart.addEventListener('click', () => {
        isLiked = !isLiked;
        if (isLiked) {
            heart.src = 'http://localhost:8080/icons/heart2.png';
        } else {
            heart.src = 'http://localhost:8080/icons/heart.png';
        }
        likes.textContent = altLikes===Number(likes.textContent) ? altLikes+1 : altLikes; 
    });
    const reply = tweet.querySelector('.reply');
    const replies = tweet.querySelector('.replies');
    replies.textContent = random(101,999);
    let altReplies = Number(replies.textContent);
    let isReplied = false;

    reply.addEventListener('click', () => {
        isReplied = !isReplied;
        if (isReplied) {
            reply.src = 'http://localhost:8080/icons/reply2.png';
        } else {
            reply.src = 'http://localhost:8080/icons/reply.png';
        }
        replies.textContent = altReplies===Number(replies.textContent) ? altReplies+1 : altReplies; 
    });
    const retweet = tweet.querySelector('.retweet');
    const retweets = tweet.querySelector('.retweets');
    retweets.textContent = random(101,999);
    let altRetweets = Number(retweets.textContent);
    let isRetweet = false;

    retweet.addEventListener('click', () => {
        isRetweet = !isRetweet;
        retweet.classList.toggle('rotate');
        retweets.textContent = altRetweets===Number(retweets.textContent) ? altRetweets+1 : altRetweets; 
    });

    const views = tweet.querySelector('.view');
    views.textContent=random(1,99)+'K';

    body.appendChild(tweet);
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
    fetch(url,{ method: "GET" })
      .then(response => response.json())
      .then(data => {
        for(let i=0;i<num;i++){
            let id = random(0,19);
            let title = data.profile[id].displayName;
            let usrName = data.profile[id].userName;
            let img = data.profile[id].img;
            createTweet(img,title,usrName,stamp,randomLorem());
            stamp++;
        }
    });
}
function load(count){
    body.appendChild(loading);
    setTimeout(()=>{
        loading.remove();
        populatePage(count);
    },'2000');
}
window.addEventListener('scroll',function(){
    let docHeight=document.documentElement.scrollHeight-window.innerHeight;
    let scrolled=window.scrollY;
    if (scrolled==docHeight){
        load(3);
    }
});
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
  }
