const btns[btn1, btn2, btn3] = document.querySelectorAll("button");



btn1.addEventListener("click", () => {
  new Anime(window,
    { scroll: 0 }, { duration: 500, });
});

btn2.addEventListener('click', () => {
  new Anime(window,
    { scroll: 2000 }, { duration: 500 });
});

btn3.addEventListener('click', () => {
  new Anime(window,
    { scroll: 4000 }, { duration: 500 });
})
