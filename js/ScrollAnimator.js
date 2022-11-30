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

class ScrollAnimator {
  constructor(element) {
    this.element = element;
    this.animations = [];

    element.onscroll = this.scroll.bind(this);
  }

  add(begin, end, func) {
    this.animations.push(new ScrollAnimation(begin, end, func));
  }

  scroll() {
    this.animations.forEach((anim) => anim.animate(this.scrollPercent()));
  }

  scrollPercent() {
    return (
      this.element.scrollTop /
      (this.element.scrollHeight - this.element.clientHeight)
    );
  }
}
