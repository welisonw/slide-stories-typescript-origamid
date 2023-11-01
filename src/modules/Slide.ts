import { Timeout } from "./Timeout.js";

export class Slide {
  container;
  elements;
  controls;
  time;
  index: number;
  slideActive: Element;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;

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
    this.paused = false;

    this.timeout = null;
    this.pausedTimeout = null;

    this.init();
  };

  hideSlide(element: Element) {
    element.classList.remove("active");
  };
 
  showSlide(index : number) {
    this.index = index;
    this.slideActive = this.elements[this.index];

    // first removes active class from all elements, then activates it from the indicated slide
    this.elements.forEach(element => this.hideSlide(element));

    this.slideActive.classList.add("active");

    this.autoSlide(this.time);
  };


  autoSlide(time: number) {
    this.timeout?.clearTimeout();

    this.timeout = new Timeout(() => this.nextSlide(), time);
  };

  prevSlide() {
    if (this.paused) return;

    const prevSlide = this.index > 0 ? this.index - 1 : this.elements.length -1;

    this.showSlide(prevSlide);
  };

  nextSlide() {
    if (this.paused) return;

    const nextSlide = (this.index + 1) < this.elements.length ? this.index + 1 : 0;

    this.showSlide(nextSlide);
  };

  pauseSlide() {
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pauseMoment();
      this.paused = true;
    }, 300);
  };

  continueSlideAfterPause() {
    this.pausedTimeout?.clearTimeout();

    if (this.paused) {
      this.paused = false;
      
      this.timeout?.continue();
    };
  };

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    prevButton.innerText = "Slide Anterior";
    nextButton.innerText = "Próximo Slide";

    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    // pause slide
    this.controls.addEventListener("pointerdown", () => this.pauseSlide());

    // continue slide after pause
    this.controls.addEventListener("pointerup", () => this.continueSlideAfterPause());

    prevButton.addEventListener("pointerup", () => this.prevSlide());
    nextButton.addEventListener("pointerup", () => this.nextSlide());
  };

  private init() {
    this.showSlide(this.index);

    this.addControls();
  };
};
