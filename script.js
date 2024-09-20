const btns = document.querySelectorAll("button");
const posArr = [0, 2000, 4000]; // 스크롤할 위치 배열

btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    new Anime(window, { scroll: posArr[index] }, { duration: 500 });
  });
});


//const [btn1, btn2, btn3] = document.querySelectorAll("button");
// btn1.addEventListener("click", () => {
//   new Anime(window,
//     { scroll: 0 }, { duration: 500, });
// });

// btn2.addEventListener('click', () => {
//   new Anime(window,
//     { scroll: 2000 }, { duration: 500 });
// });

// btn3.addEventListener('click', () => {
//   new Anime(window,
//     { scroll: 4000 }, { duration: 500 });
// })


