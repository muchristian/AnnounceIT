
const menu = document.querySelector('#js_menu');
const nav_toggle = document.querySelector('#js_navbar_toggle');
const navbar = document.querySelector('.navbar');
const latest_toggle = document.querySelector('#js-latest-toggle');
const latest_close = document.querySelector('#js-latest-close');
let tab_link = document.querySelectorAll('.tab-link');
let email = document.querySelector('#login-form #email');
let password = document.querySelector('#login-form #password');
let form = document.querySelector('#login-form');

nav_toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.addEventListener('click', function (e) {
  e = e || window.event;
  let target = e.target || e.srcElement;
  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
    if (target.hasAttribute('data-target')) {
        let m_ID = target.getAttribute('data-target');
        document.getElementById(m_ID).classList.add('open');
        e.preventDefault();
    }
}

if (target.classList.contains('modal')) {
  let modal = document.querySelector('[class="modal open"]');
  modal.classList.remove('open');
  e.preventDefault();
}
}, false);

    const clear = function() {
      for(let i = 0; i < tab_link.length ; i++) {
        tab_link[i].classList.remove('active');
        let id = tab_link[i].getAttribute('data-tab');
        document.getElementById(id).classList.remove('active');
      }
    }
  
    const change = function(e) {
      clear();
      e.target.classList.add('active');
      let id = e.currentTarget.getAttribute('data-tab');
      document.getElementById(id).classList.add('active');
    }

    for(let i = 0; i < tab_link.length ; i++) {
      tab_link[i].addEventListener('click', change, false);
    }








  





