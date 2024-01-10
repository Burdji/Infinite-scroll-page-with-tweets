

let body= document.querySelector("body");
// let tweet= document.createElement('div');
// document.body.appendChild(tweet);
let text = document.querySelectorAll('.lorem');
let mid= document.querySelector(".mid");
// let pole= document.getElementById("pole");
// let get= document.getElementById("get");
// let post= document.getElementById("post");
// get.addEventListener('click', getInfo);
// post.addEventListener('click', postInfo);
// async function getInfo(x){
//     x.preventDefault();
//     let res= await fetch('http://localhost:8080',{
//         method: 'GET'
//     });
//     console.log(res);
// }
// async function postInfo(x){
//     x.preventDefault();
//     if (input.value=='') {return};
//     console.log(parcel);
//     let res= await fetch('http://localhost:8080',{
//         method: 'POST',
//         headers: {
//             "Content-Type": 'application.json'
//         },
//         body: JSON.stringify({
//             parcel: input.value
//         })
//     });
//     console.log(res);
// }
//let tweet = document.querySelector(".tweet");
//text.innerHTML=randomLorem();
// text.addEventListener("click", function() {
//    text.innerHTML =randomLorem();
// });
populatePage(10);
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
      body.innerHTML+=createTweet('hui','pedal',stamp,randomLorem());
      stamp++;
   }
}

// fetch("http://localhost:3000")
//    .then(res=>res.json())
//    .then(json => console.log(json));

// console.log(result);
REQUEST_DELAY = 2000
const RESPONSE_DELAY = 5000
const delayResponse = (req, res, next) => {
  if (THROTTLE_PATHS(req.url)) {
    // Delay request by 2 seconds
    setTimeout(next, REQUEST_DELAY)

    // Delay response completion by 5 seconds
    const endOriginal = res.end
    res.end = (...args) => {
      setTimeout(() => {
        endOriginal.apply(res, args)
      }, RESPONSE_DELAY)
    }
  } else {
    next()
  }
}

