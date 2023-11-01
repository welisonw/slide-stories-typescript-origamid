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

    this.index = localStorage.getItem("activeSlide")
      ? Number(localStorage.getItem("activeSlide"))
      : 0,
    this.slideActive = this.elements[this.index];
    this.paused = false;

    this.timeout = null;
    this.pausedTimeout = null;

    this.init();
  };


  hideSlide(element: Element) {
    element.classList.remove("active");

    // return to beginning of video
    if (element instanceof HTMLVideoElement) {
      element.currentTime = 0;
      element.pause();
    }
  };

 
  showSlide(index : number) {
    this.index = index;
    this.slideActive = this.elements[this.index];

    localStorage.setItem("activeSlide", String(this.index));

    // first removes active class from all elements, then activates it from the indicated slide
    this.elements.forEach(element => this.hideSlide(element));

    this.slideActive.classList.add("active");

    if (this.slideActive instanceof HTMLVideoElement) {
      this.autoSlideVideo(this.slideActive);
    } else {
      this.autoSlide(this.time);
    };
  };


  autoSlideVideo(video: HTMLVideoElement) {
    const SECONDS_IN_MILLISECONDS = 1000;

    video.muted = true;
    video.play();

    let firstPlay = true;

    video.addEventListener("playing", () => {
      if (firstPlay) this.autoSlide(video.duration * SECONDS_IN_MILLISECONDS);
      firstPlay = false;
    });
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

      if (this.slideActive instanceof HTMLVideoElement) this.slideActive.pause();
    }, 300);
  };


  continueSlideAfterPause() {
    this.pausedTimeout?.clearTimeout();

    if (this.paused) {
      this.paused = false;
      
      this.timeout?.continue();

      if (this.slideActive instanceof HTMLVideoElement) this.slideActive.play();
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
