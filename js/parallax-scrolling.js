// Für Parallax Scrolling aus dem Hintergrundbild "rauszoomen", damit das Bild genau 2x in den Viewport passt
let background = document.querySelector("#background");
background.style.backgroundSize = "auto 200vh";
background.style.backgroundPosition = "center 0vh";

scrollAnimator = new ScrollAnimator(document.querySelector("main"));

// Parallax Background
scrollAnimator.add(
  0,
  1,
  function (progress) {
    background.style.backgroundPosition = `center ${-progress * 100}vh`;
  },
  "PS"
);
