const LOVELEAGUE_CLOUD = "loveleague-cloud";
const GALERY_CLOUD = "galery-cloud";
const DOWNLOAD_CLOUD = "download-cloud";

const SCALE = 2;
const SCALED_TOP_PERCENT = 25;
const MID_PERCENT = 50;
const HALF_WIDTH_VMIN = 11;

// Love League Cloud nach Links
let loveLeagueCloud = document.getElementById(LOVELEAGUE_CLOUD);
scrollAnimator.add(
  0,
  0.2,
  function (progress, reverse) {
    loveLeagueCloud.style.scale = SCALE - progress;
    loveLeagueCloud.style.top = `${SCALED_TOP_PERCENT * reverse}%`;
  },
  "L-"
);
scrollAnimator.add(
  0,
  0.5,
  function (_, reverse) {
    loveLeagueCloud.style.left = `calc(${MID_PERCENT * reverse}% - ${
      HALF_WIDTH_VMIN * reverse
    }vmin)`;
  },
  "L<"
);

// Galery Cloud in die Mitte
let galeryCloud = document.getElementById(GALERY_CLOUD);
scrollAnimator.add(
  0,
  0.2,
  function (progress) {
    galeryCloud.style.top = `${2 * SCALED_TOP_PERCENT * progress}%`;
  },
  "Gv"
);
scrollAnimator.add(
  0.1,
  0.5,
  function (progress) {
    galeryCloud.style.left = `calc(${MID_PERCENT * progress}% - ${
      HALF_WIDTH_VMIN * progress
    }vmin)`;
  },
  "G>"
);
scrollAnimator.add(
  0.2,
  0.5,
  function (progress, reversed) {
    galeryCloud.style.top = `${
      SCALED_TOP_PERCENT + SCALED_TOP_PERCENT * reversed
    }%`;
    galeryCloud.style.scale = 1 + progress;
  },
  "G+"
);

// Galery Cloud nach Rechts
scrollAnimator.add(
  0.5,
  0.7,
  function (progress, reverse) {
    galeryCloud.style.scale = SCALE - progress;
    galeryCloud.style.top = `${SCALED_TOP_PERCENT * reverse}%`;
  },
  "G-"
);
scrollAnimator.add(
  0.5,
  1.0,
  function (progress) {
    galeryCloud.style.left = `calc(${50 + 50 * progress}% - ${
      11 + 11 * progress
    }vmin)`;
  },
  "G>"
);

//  Download Cloud in die Mitte
let downloadCloud = document.getElementById(DOWNLOAD_CLOUD);
scrollAnimator.add(
  0.5,
  0.7,
  function (progress) {
    downloadCloud.style.top = `${2 * SCALED_TOP_PERCENT * progress}%`;
  },
  "Dv"
);
scrollAnimator.add(
  0.6,
  1.0,
  function (progress) {
    downloadCloud.style.right = `calc(${50 * progress}% - ${
      11 * progress
    }vmin)`;
  },
  "D<"
);
scrollAnimator.add(
  0.7,
  1.0,
  function (progress, reversed) {
    downloadCloud.style.top = `${
      SCALED_TOP_PERCENT + SCALED_TOP_PERCENT * reversed
    }%`;
    downloadCloud.style.scale = 1 + progress;
  },
  "D+"
);
