//typewriter effect

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.06em solid #646464}";
    document.body.appendChild(css);
};


//Toggle theme — disabled while feature hidden
//  const themeBtn = document.querySelector('.theme-btn');
//  themeBtn.addEventListener('click',() =>{
//      let element = document.body;
//      element.classList.toggle('dark-mode');
//  })


//Toggle theme 2
const themeBtn2 = document.querySelector('.theme-toggle');
themeBtn2.addEventListener('click',() =>{
    themeBtn2.classList.toggle('theme-toggle--toggled');
    let element = document.body;
    element.classList.toggle('dark-mode');
})

//Native animate on scroll (Fireship: https://www.youtube.com/watch?v=T33NN_pPeNI)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        // if (entry.isIntersecting) {
        //     entry.target.classList.add('show');
        // } else {
        //     entry.target.classList.remove('show');
        // }
        entry.target.classList.toggle('show', entry.isIntersecting); // Kudos @donniedamato YT
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


//Mobile menu

let burger = document.getElementById('burger'),
	 nav    = document.getElementById('main-nav');
	//  slowmo = document.getElementById('slowmo');

burger.addEventListener('click', function(e){
	this.classList.toggle('is-open');
	nav.classList.toggle('is-open');
});

// slowmo.addEventListener('click', function(e){
// 	this.classList.toggle('is-slowmo');
// });

/* Onload demo - dirty timeout */
let clickEvent = new Event('click');

// window.addEventListener('load', function(e) {
// 	// slowmo.dispatchEvent(clickEvent);
// 	burger.dispatchEvent(clickEvent);
	
// 	setTimeout(function(){
// 		burger.dispatchEvent(clickEvent);
		
// 		setTimeout(function(){
// 			// slowmo.dispatchEvent(clickEvent);
// 		}, 3500);
// 	}, 5500);
// });




// Lazy Load Background Images

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })



  // moving text

  const first = document.getElementById("first")
  const second = document.getElementById("second")
  const container = document.getElementById("container")
  const rect = container.getBoundingClientRect()
  
  const animate = (element,position) => {
       element.style.transform = `translateX(${position}px)`
  } 
  
         
  
  document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;
      
     window.requestAnimationFrame(function() {
       
        animate(first,lastKnownScrollPosition*.2)
        animate(second,lastKnownScrollPosition*-.2)
        
      });
  });








  // Wrap every letter in a span
var textWrapper = document.querySelector('.anim');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.anim .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 4950,
    delay: (el, i) => 270*i
  }).add({
    targets: '.anim',
    opacity: 0,
    duration: 99991000,
    easing: "easeOutExpo",
    delay: 1000
  });



  let constrain = 100;
  let mouseOverContainer = document.getElementById("hero");
  let postCard = document.getElementById("postcard");
  
  function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;
    
    return "perspective(900px) "
      + "   rotateX("+ calcX +"deg) "
      + "   rotateY("+ calcY +"deg) ";
  };
  
   function transformElement(el, xyEl) {
    el.style.transform  = transforms.apply(null, xyEl);
  }
  
  mouseOverContainer.onmousemove = function(e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([postCard]);
  
    window.requestAnimationFrame(function(){
      transformElement(postCard, position);
    });
  };
  

  