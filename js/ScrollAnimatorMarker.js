class ScrollAnimatorMarker extends ScrollAnimator {
  constructor(element) {
    super(element);

    this.sectionCount = element.scrollHeight / element.clientHeight;
    this.createCursorMarker();
    this.markers = {};
  }

  createCursorMarker() {
    this.createMarker('fixed', 0, 'blue', '---', '95px');
  }

  add(begin, end, func, id) {
    super.add(begin, end, func);
    this.createAnimationMarkers(begin, end, id);
  }

  createAnimationMarkers(begin, end, id) {
    this.addMarker(begin, 'green', id);
    this.addMarker(end, 'red', id);
  }

  addMarker(positionPercent, color, id) {
    let key = `${positionPercent}_${color}`;
    let marker = this.markers[key];
    if (!(key in this.markers)) {
      let right;
      if (color == 'green') {
        right = '100px';
      } else {
        right = '0px';
      }

      marker = this.createMarker('absolute', positionPercent, color, '', right);
      this.markers[key] = marker;
    }

    marker.innerHTML += ` ${id ? id : this.animations.length}`;
  }

  createMarker(position, positionPercent, color, id, right) {
    let topPercent =
      (0.5 + positionPercent * (this.sectionCount - 1)) * 100 + '%';

    const div = document.createElement('div');
    div.style.position = position;
    div.style.height = '20px';
    div.style.color = 'white';
    div.style.top = topPercent;
    div.style.background = color;
    div.innerHTML = id;
    div.style.right = right;
    this.element.appendChild(div);
    return div;
  }
}

ScrollAnimator = ScrollAnimatorMarker;
