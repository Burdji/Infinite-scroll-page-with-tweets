let tweets= document.querySelector(".tweets");
const loading= document.createElement('div');
loading.className="loadingEl";
loading.innerHTML=`
    <img class="loadGif" src="LoaderGif.gif">`;
let text = document.querySelectorAll('.lorem');
let mid= document.querySelector(".mid");
const url= 'http://localhost:8080/home';
let stamp=1;
load(8);
const modal = document.getElementById('modal');
const btn = document.getElementById('btn');
const span = document.getElementsByClassName('close')[0];
const logged = document.getElementsByClassName('logged')[0];
const userPic = document.getElementsByClassName('userPic')[0];
const user = document.getElementsByClassName('user')[0];
const crtPost = document.getElementById('crtPost');

btn.onclick = function() {
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

const makePost= document.getElementById('makePost')
const closePost= document.getElementById('closePost')
crtPost.onclick = function(){
    makePost.style.display = 'block';
}
closePost.onclick = function(){
    makePost.style.display = 'none';
}

const form = document.getElementById('registerForm');
form.addEventListener('submit', async (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Registration successful');
            form.reset();
            modal.style.display = 'none';
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    logged.style.filter = 'opacity(100%)';
    const pic = formData.get('image');
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      userPic.src = reader.result;
      user.textContent = formData.get('displayName');
      btn.style.filter = 'opacity(0%)';
      crtPost.style.display = 'block'
    });
    reader.readAsDataURL(pic);
});
const tweetForm = document.getElementById('tweetForm');
const meme = document.getElementById('meme');
const postText = document.getElementById('postText');
tweetForm.addEventListener('submit', function(event){
    makePost.style.display = 'none';
    event.preventDefault();
    const postData = new FormData(event.target);
    const pic = postData.get('meme');
    const content = postData.get('postText');
    fetch(url,{ method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data.profile)
        let id = data.profile.length-1;
        let title = data.profile[id].displayName;
        let usrName = data.profile[id].userName;
        let meme='';
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            if(reader.result)meme='<img id="tweetPic" src="">'
            createTweet(userPic.src,title,usrName, 0, content,1,meme);
            const tweetPic = document.getElementById('tweetPic');
            tweetPic.src = reader.result;
        });
        reader.readAsDataURL(pic);
        tweetPic.style.display = 'block';
    });
    document.documentElement.scrollTop = 0;
    tweetForm.reset();
});


function createTweet(img, name, handle, timeStamp, text, order,meme){
    const tweet=document.createElement(`div`);
    tweet.classList.add('tweet');
    tweet.innerHTML=`
    <div class="tweet_column avatar">
        <img class="pic" src="${img}">  
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
           ${meme}
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
    
    tweets.appendChild(tweet);
    if(order)tweet.style.order = timeStamp-1;
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
            let img = `http://localhost:8080/media/${data.profile[id].img}`;
            createTweet(img,title,usrName,stamp,randomLorem(),0,'');
            stamp++;
        }
    });
}
function load(count){
    tweets.appendChild(loading);
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
