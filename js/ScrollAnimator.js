class ScrollAnimator {
  constructor(scrollable) {
    this.animations = [];
    this.scrollable = scrollable;

    scrollable.onscroll = this.scroll.bind(this);
    document.body.onresize = this.resize.bind(this);
  }

  add(begin, end, func) {
    this.animations.push(new ScrollAnimation(begin, end, func));
  }

  scroll() {
    this.animate(this.scrollPercent());
  }

  resize() {
    this.scroll();
  }

  animate(scrollPercent) {
    this.animations.forEach((anim) => anim.animate(scrollPercent));
  }

  scrollPercent() {
    return (
      this.scrollable.scrollTop /
      (this.scrollable.scrollHeight - this.scrollable.clientHeight)
    );
  }
}

class ScrollAnimation {
  constructor(begin, end, func) {
    this.begin = begin;
    this.end = end;
    this.func = func;
  }

  animate(scrollPercent) {
    var scrollModifier = (scrollPercent - this.begin) / (this.end - this.begin);

    if (scrollModifier < 0) {
      if (this.lastScrollModifier > 0) {
        scrollModifier = 0;
      }
    } else if (scrollModifier > 1) {
      if (this.lastScrollModifier < 1) {
        scrollModifier = 1;
      }
    }
    this.lastScrollModifier = scrollModifier;

    if (scrollModifier >= 0 && scrollModifier <= 1) {
      this.func(scrollModifier, 1 - scrollModifier);
    }
  }
}
