(()=>{function e(e,t,n,r,o,i,c){try{var s=e[i](c),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}function t(t){return function(){var n=this,r=arguments;return new Promise((function(o,i){var c=t.apply(n,r);function s(t){e(c,o,i,s,a,"next",t)}function a(t){e(c,o,i,s,a,"throw",t)}s(void 0)}))}}var n=document.querySelector("video"),r=(document.getElementById("userImg"),document.getElementById("likeIcon")),o=document.getElementById("dislikeIcon"),i=document.getElementById("likedCount");function c(){""===o.style.color?(o.style.color="blue",r.style.color=""):o.style.color=""}function s(e){i.innerText=e,""===r.style.color?(r.style.color="blue",o.style.color=""):r.style.color=""}function a(){return(a=t(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.dataset.id,e.next=3,fetch("/api/like",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})});case 3:if(201!==(r=e.sent).status){e.next=10;break}return e.next=7,r.json();case 7:s(e.sent.liked);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(){return(u=t(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.dataset.id,e.next=3,fetch("/api/dislike",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})});case 3:201===e.sent.status&&c();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}r.addEventListener("click",(function(){return a.apply(this,arguments)})),o.addEventListener("click",(function(){return u.apply(this,arguments)}))})();