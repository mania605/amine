//articl이 인수로 들어가면됨)
const btn = document.querySelector("button");
const box = document.querySelector("article");
const title = document.querySelector("h1");

btn.addEventListener("click", () => {
  //call Anime
  //new Amine(동작대상{DOM객체값, 변경할 css속성 프로퍼티},{duration:모션시간})
  //속성값 설정시 픽셀단위면 숫자만 쓰면 됨</left:100,>
  //퍼센트 단위는 문자열로 감싸서 입력
  //모션시간인 durtation은 숫자단위

  //opacity 제어:0-1사이의 속성값
  //제어가능 속성:width,height,opacity, top,left, bottom, left, color, backgroundColor, scroll
  new Anime(box, { backgroundColor: "#ff69b4" }, { duration: 1000 });
  new Anime(title, { color: "#ff69b4" }, { duration: 2000 });
});

