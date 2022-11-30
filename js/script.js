const BACKGROUND_SIZE = '355vh';

const LOVELEAGUE_CLOUD = 'loveleague-cloud';
const GALERY_CLOUD = 'galery-cloud';
const DOWNLOAD_CLOUD = 'download-cloud';

const MID_PERCENT = 40;
const RIGHT_PERCENT = 80;

const CLOUD_SCALE = 2;
const CLOUD_SCALED_TOP_VMIN = 5;

main = document.getElementsByTagName('main')[0];

// backgroundPosition ist im CSS auf center middle, weil es schöner aussieht, falls JS deaktiviert
// Für das Parallax Scrolling muss es aber mit top beginnen
main.style.backgroundPosition = 'center top';
main.style.backgroundSize = BACKGROUND_SIZE;

scrollAnimator = new ScrollAnimator(main);

// Parallax Background
scrollAnimator.add(
  0,
  1,
  function (progress) {
    main.style.backgroundPosition = `50% ${progress * 100}%`;
  },
  'PS'
);

// Love League Cloud nach Links
loveLeagueCloud = document.getElementById(LOVELEAGUE_CLOUD);
scrollAnimator.add(
  0,
  0.2,
  function (progress, reverse) {
    loveLeagueCloud.style.scale = CLOUD_SCALE - progress;
    loveLeagueCloud.style.top = `${CLOUD_SCALED_TOP_VMIN * reverse}vmin`;
  },
  'L-'
);
scrollAnimator.add(
  0,
  0.5,
  function (_, reverse) {
    loveLeagueCloud.style.left = `${MID_PERCENT * reverse}%`;
  },
  'L<'
);

// Galery Cloud in die Mitte
galeryCloud = document.getElementById(GALERY_CLOUD);
scrollAnimator.add(
  0,
  0.2,
  function (progress, reverse) {
    galeryCloud.style.top = `${CLOUD_SCALED_TOP_VMIN * 3 * progress}vmin`;
  },
  'Gv'
);
scrollAnimator.add(
  0.1,
  0.5,
  function (progress) {
    galeryCloud.style.left = `${MID_PERCENT * progress}%`;
  },
  'G>'
);
scrollAnimator.add(
  0.2,
  0.5,
  function (progress, reversed) {
    galeryCloud.style.top = `${
      CLOUD_SCALED_TOP_VMIN + CLOUD_SCALED_TOP_VMIN * 2 * reversed
    }vmin`;
    galeryCloud.style.scale = 1 + progress;
  },
  'G+'
);

// Galery Cloud nach Rechts
scrollAnimator.add(
  0.5,
  0.7,
  function (progress, reverse) {
    galeryCloud.style.scale = CLOUD_SCALE - progress;
    galeryCloud.style.top = `${CLOUD_SCALED_TOP_VMIN * reverse}vmin`;
  },
  'G-'
);
scrollAnimator.add(
  0.5,
  1.0,
  function (progress) {
    galeryCloud.style.left = `${
      MID_PERCENT + (RIGHT_PERCENT - MID_PERCENT) * progress
    }%`;
  },
  'G>'
);

//  Download Cloud in die Mitte
downloadCloud = document.getElementById(DOWNLOAD_CLOUD);
scrollAnimator.add(
  0.5,
  0.7,
  function (progress, reverse) {
    downloadCloud.style.top = `${CLOUD_SCALED_TOP_VMIN * 3 * progress}vmin`;
  },
  'Dv'
);
scrollAnimator.add(
  0.6,
  1.0,
  function (progress) {
    downloadCloud.style.right = `${MID_PERCENT * progress}%`;
  },
  'D<'
);
scrollAnimator.add(
  0.7,
  1.0,
  function (progress, reversed) {
    downloadCloud.style.top = `${
      CLOUD_SCALED_TOP_VMIN + CLOUD_SCALED_TOP_VMIN * 2 * reversed
    }vmin`;
    downloadCloud.style.scale = 1 + progress;
  },
  'D+'
);
