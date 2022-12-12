class ScrollAnimatorMarker extends ScrollAnimator {
  constructor(scrollable, showPercentMarker) {
    super(scrollable);
    console.log("[ScrollAnimatorMarker] Registered.");

    this.TEXT_COLOR = "white";
    this.MARKER_OFFSET = "40vh";

    this.BEGIN = { color: "green", right: "10em" };
    this.END = { color: "red", right: "0em" };
    this.CURSOR = { color: "blue", right: "5em" };

    this.markers = {};
    this.container = this.createContainer(scrollable);
    this.cursor = this.createCursorMarker();

    if (showPercentMarker) {
      this.createPercentMarker();
    }
  }

  createContainer(parent) {
    let container = document.createElement("scrollContainer");
    //container.innerHTML = parent.innerHTML;
    //parent.innerHTML = "";
    parent.insertBefore(container, parent.firstChild);

    container.style.position = "absolute";
    container.style.width="100%";
    container.style.color = this.TEXT_COLOR;
    container.style.fontSize = "3vmin";
    container.style.zIndex = 10;
    return container;
  }

  createCursorMarker() {
    let cursor = this.createMarker("fixed", 0, this.CURSOR);
    cursor.style.zIndex = 1;
    cursor.innerHTML = this.getCursorText(0);
    return cursor;
  }

  getCursorText(scrollPercent) {
    return `=${(scrollPercent * 100).toFixed(1)}%=`;
  }

  createPercentMarker() {
    for (let i = 0; i <= 10; i++) {
      this.addMarker(i / 10, this.CURSOR, i * 10 + "%");
    }
  }

  add(begin, end, func, id) {
    super.add(begin, end, func);
    this.createAnimationMarkers(begin, end, id ?? this.animations.length);
  }

  animate(scrollPercent) {
    super.animate(scrollPercent);
    this.cursor.innerHTML = this.getCursorText(scrollPercent);
  }

  resize() {
    super.resize();
    this.repositionMarkers();
  }

  repositionMarkers() {
    /* required if mobile addressbar gets hidden and window.innerHeight increases */
    console.log("[ScrollAnimatorMarker] resize -> reposition markers.");
    for (var key in this.markers) {
      let marker = this.markers[key];
      marker.style.top = this.getTopPercent(marker.positionPercent);
    }
  }

  createAnimationMarkers(begin, end, id) {
    this.addMarker(begin, this.BEGIN, id);
    this.addMarker(end, this.END, id);
  }

  addMarker(positionPercent, type, id) {
    console.log(
      `[ScrollAnimatorMarker] addMarker(${id}, ${positionPercent}, ${type.color})`
    );

    let key = `${positionPercent}_${type.color}`;
    if (!(key in this.markers)) {
      this.markers[key] = this.createMarker("absolute", positionPercent, type);
    }
    this.markers[key].innerHTML += ` ${id}`;
  }

  getTopPercent(positionPercent) {
    return `calc(${this.MARKER_OFFSET} + ${
      positionPercent *
      (this.scrollable.scrollHeight - this.scrollable.clientHeight)
    }px)`;
  }

  createMarker(position, positionPercent, type) {
    const marker = document.createElement("marker");
    this.container.appendChild(marker);
    marker.positionPercent = positionPercent;

    marker.style.position = position;
    marker.style.top = this.getTopPercent(positionPercent);
    marker.style.background = type.color;
    marker.style.right = type.right;

    return marker;
  }
}

ScrollAnimator = ScrollAnimatorMarker;
