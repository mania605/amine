/*
  forEach
  : 배열, 유사배열을 반복처리하기 위한 내장 함수
  Array.forEach((data, idx)=>{
    중괄호 안쪽의 코드블록은 배열의 갯수만큼 반복 처리됨
    해당 코드블록 안쪽에서는 data, idx라는 파라미터로 전달되는 값 활용 가능
    data: 현재 반복도는 배열의 데이터
    idx: 현재 반복도는 순서값
  })
*/
const btns = document.querySelectorAll("button");

btns.forEach((btn, idx) => {
  //forEach반복문 안쪽에서 반복도는 각 btn요소에 click이벤트 연결
  btn.addEventListener("click", (event) => {
    //각 반복도는 btn요소 클릭시 자동으로 전달되는 event.target
    //클릭이라는 이벹트가 발생한 바로그 DOM요소를 지칭
    console.log(event.target);
    //이벤트가 발생한 해당 DOM요소에 지정된 data-pos라는 정보값 가져옴
    console.log(event.target.getAttribute("data-pos"));
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


