const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const navbar = $(".navbar-bars");
const headerMenu = $(".header-menu-mb");
const close = $(".icon-close");
const logIn = $(".header-login");

//headerScroll
window.addEventListener("scroll", function () {
  const projectWrap = $$(".project-content");
  const projectImg = $$(".project-img");
  const header = $(".header");
  const scrollY = window.pageYOffset;
  // console.log(scrollY);
  if (scrollY >= 10) {
    header && header.classList.add("scrollHeader");
  } else {
    header && header.classList.remove("scrollHeader");
  }

  for (let i = 0; i < projectWrap.length; i++) {
    const windowheight = window.innerHeight;
    // console.log(windowheight);
    const revealtop = projectWrap[i].getBoundingClientRect().top;
    // console.log(revealtop);
    // const revealpoint = 150;
    if (revealtop < windowheight) {
      projectWrap[i].classList.add("active");
    } else {
      projectWrap[i].classList.remove("active");
    }
  }

  for (let i = 0; i < projectImg.length; i++) {
    const windowheight = window.innerHeight;
    // console.log(windowheight);
    const revealtop = projectImg[i].getBoundingClientRect().top;
    // console.log(revealtop);
    const revealpoint = 140;
    if (revealtop < windowheight - revealpoint) {
      projectImg[i].classList.add("active");
    } else {
      projectImg[i].classList.remove("active");
    }
  }
});

//open close headerMenu-MB
navbar.addEventListener("click", function (e) {
  headerMenu.classList.add("show_menu-mb");
  headerMenu.classList.remove("close_menu-mb");
});

close.addEventListener("click", function (e) {
  headerMenu.classList.remove("show_menu-mb");
  headerMenu.classList.add("close_menu-mb");
});
// //submit alert
