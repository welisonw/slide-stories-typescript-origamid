
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
    this.slideActive = this.elements[this.index];

    this.init();
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

  prevSlide() {
    const prevSlide = this.index > 0 ? this.index - 1 : this.elements.length -1;

    this.showSlide(prevSlide);
  };

  nextSlide() {
    const nextSlide = (this.index + 1) < this.elements.length ? this.index + 1 : 0;

    this.showSlide(nextSlide);
  };

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    prevButton.innerText = "Slide Anterior";
    nextButton.innerText = "Próximo Slide";

    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    prevButton.addEventListener("pointerup", () => this.prevSlide())
    nextButton.addEventListener("pointerup", () => this.nextSlide())
  };

  private init() {
    this.showSlide(this.index);

    this.addControls();
  };
};
