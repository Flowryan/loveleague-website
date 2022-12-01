class ScrollAnimatorMarker extends ScrollAnimator {
  constructor(element) {
    super(element);

    this.sectionCount = this.element.scrollHeight / this.element.clientHeight;
    this.createCursorMarker();
    this.markers = {};

    console.log(
      `[ScrollAnimator] Registered to ${element} with rootElement <${this.element.tagName}> and ${this.sectionCount} sections.`
    );
  }

  createCursorMarker() {
    this.createMarker('fixed', 0, 'blue', '95px').innerHTML = '---';

    this.createMarker('absolute', -0.05, 'blue', '75px').innerHTML =
      this.element.scrollHeight;
    this.createMarker('absolute', -0.04, 'blue', '75px').innerHTML =
      this.element.clientHeight;
    this.createMarker('absolute', -0.03, 'blue', '75px').innerHTML =
      this.sectionCount;

    for (let i = 0; i < this.sectionCount; i++) {
      this.createMarker(
        'absolute',
        i / (this.sectionCount - 1),
        'black',
        '75px'
      ).innerHTML = `-${i}-`;
    }
  }

  add(begin, end, func, id) {
    super.add(begin, end, func);
    this.createAnimationMarkers(begin, end, id);
  }

  animate(scrollPercent) {
    // console.log(`[ScrollAnimator] animate(${scrollPercent})`);
    super.animate(scrollPercent);
  }

  createAnimationMarkers(begin, end, id) {
    this.addMarker(begin, 'green', id);
    this.addMarker(end, 'red', id);
  }

  addMarker(positionPercent, color, id) {
    console.log(
      `[ScrollAnimator] addMarker(${id}, ${positionPercent}, ${color})`
    );

    let key = `${positionPercent}_${color}`;
    let marker = this.markers[key];
    if (!(key in this.markers)) {
      let right;
      if (color == 'green') {
        right = '100px';
      } else {
        right = '0px';
      }

      marker = this.createMarker('absolute', positionPercent, color, right);
      this.markers[key] = marker;
    }

    marker.innerHTML += ` ${id ? id : this.animations.length}`;
  }

  createMarker(position, positionPercent, color, right) {
    let topPercent =
      (0.5 + positionPercent * (this.sectionCount - 1)) * 100 + '%';

    const div = document.createElement('div');
    div.style.position = position;
    div.style.height = '20px';
    div.style.color = 'white';
    div.style.top = topPercent;
    div.style.background = color;
    div.style.right = right;
    this.element.appendChild(div);
    return div;
  }
}

ScrollAnimator = ScrollAnimatorMarker;
