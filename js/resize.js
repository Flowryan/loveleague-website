function resizeContent() {
  let main = document.querySelector("main");
  if (window.innerHeight > document.body.scrollHeight) {
    main.style.maxHeight = "calc(100vh - 1px)";
  } else {
    main.style.maxHeight = null;
  }
}

window.addEventListener("resize", resizeContent);
