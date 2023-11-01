
export class Slide {
  container;
  elements;
  controls;
  time;
  index: number;
  slideActive: Element;

  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    time: number = 5000,
    ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.time = time;
    this.index = 0,
    this.showSlide(this.index);
    this.slideActive = this.elements[this.index];
  };

  hideSlide(element: Element) {
    element.classList.remove("active");
  };
 
  showSlide(index : number) {
    this.index = index;
    this.slideActive = this.elements[this.index]

    // first removes active class from all elements, then activates it from the indicated slide
    this.elements.forEach(element => this.hideSlide(element));

    this.slideActive.classList.add("active");
  };

};
