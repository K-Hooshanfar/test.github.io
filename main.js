var posX = 100, posY = 100, px = 0, py = 0, an = false;
var nyan = $('.nyan');
var rainbow = null;
var altura = $(document).height();
var largura = parseInt($('body').width());
var tamanhoTela = parseInt(largura/9);
var pilha = [];

function getRandomInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

$(document).on('mousemove', function(event) {
    posX = event.pageX;
    posY = event.pageY;
})

for(var i = 0; i < tamanhoTela; i++)
{
    var rain = $('<div class="rainbow"/>').css('left', i*9+'px');
    $('body').append(rain);
}
rainbow = $('.rainbow');

function criarEstrela()
{
    var rand = getRandomInt(3, 14);
    var tempoDeVida = getRandomInt(5,10);
    var star = $('<div class="star"/>').css({
        width:rand+'px',
        height:rand+'px',
        left: largura-10+'px', 
        top: Math.floor((Math.random()*altura)+1), 
        '-webkit-transition': 'all '+tempoDeVida+'s linear',
        '-webkit-transform': 'translate(0px, 0px)'
    });
    $('body').append(star);
    
    window.setTimeout(function(){
        star.css({
            '-webkit-transform': 'translate(-'+largura+'px, 0px)'
        });
    }, getRandomInt(5,10)*10);  

    window.setTimeout(function(){star.remove();}, tempoDeVida*1000);
}

function moveNyan()
{
    var tamX = nyan.width()/2,
        tamY = nyan.height()/2;
    px += (posX - px - tamX) / 50;
    py += (posY - py - tamY) / 50;
 
    nyan.css({
        left: px + 'px',
        top: py + 'px'
    });
}
function peidaArcoIris()
{
    var qnt = Math.floor(nyan.position().left/9)+2;

    if(pilha.length >= qnt) pilha.pop();
  
    pilha.unshift(py);
  
    rainbow.hide();
    for(var i = 0; i < qnt; i++)
    {
        var am = (i%2);
        if(an) am = (i%2) ? 0 : 1 ;
    
        rainbow.eq(qnt-i).css({top: pilha[i]+am}).show();
    }
}

window.setInterval(function(){
    moveNyan();
    peidaArcoIris();
}, 10);

window.setInterval(function(){ criarEstrela(); }, 300);

window.setInterval(function(){ an = !an; }, 500);

var frame = 0;
window.setInterval(function(){   
    nyan.css({'background-position': 34*frame+'px'});
    frame++;
}, 100);

// Smooth scroll to section on link click
$('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    
    var target = this.hash;
    var $target = $(target);

    $('html, body').animate({
        scrollTop: $target.offset().top
    }, 800, 'swing');
});



/**
* Template Name: MyResume
* Updated: Nov 17 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()