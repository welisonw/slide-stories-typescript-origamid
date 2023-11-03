import { Timeout } from "./Timeout.js";
export class Slide {
    container;
    elements;
    controls;
    time;
    index;
    slideActive;
    timeout;
    paused;
    pausedTimeout;
    thumbItems;
    thumbActive;
    constructor(container, elements, controls, time = 5000) {
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
        this.thumbItems = null;
        this.thumbActive = null;
        this.init();
    }
    ;
    hideSlide(element) {
        element.classList.remove("active");
        if (element instanceof HTMLVideoElement) {
            element.currentTime = 0;
            element.pause();
        }
    }
    ;
    showSlide(index) {
        this.index = index;
        this.slideActive = this.elements[this.index];
        localStorage.setItem("activeSlide", String(this.index));
        if (this.thumbItems) {
            this.thumbActive = this.thumbItems[index];
            this.thumbItems.forEach(thumb => thumb.classList.remove("active"));
            this.thumbActive.classList.add("active");
        }
        ;
        this.elements.forEach(element => this.hideSlide(element));
        this.slideActive.classList.add("active");
        if (this.slideActive instanceof HTMLVideoElement) {
            this.autoSlideVideo(this.slideActive);
        }
        else {
            this.autoSlide(this.time);
        }
        ;
    }
    ;
    autoSlideVideo(video) {
        const SECONDS_IN_MILLISECONDS = 1000;
        video.muted = true;
        video.play();
        let firstPlay = true;
        video.addEventListener("playing", () => {
            if (firstPlay)
                this.autoSlide(video.duration * SECONDS_IN_MILLISECONDS);
            firstPlay = false;
        });
    }
    ;
    autoSlide(time) {
        this.timeout?.clearTimeout();
        this.timeout = new Timeout(() => this.nextSlide(), time);
        if (this.thumbActive)
            this.thumbActive.style.animationDuration = `${time}ms`;
    }
    ;
    prevSlide() {
        if (this.paused)
            return;
        const prevSlide = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.showSlide(prevSlide);
    }
    ;
    nextSlide() {
        if (this.paused)
            return;
        const nextSlide = (this.index + 1) < this.elements.length ? this.index + 1 : 0;
        this.showSlide(nextSlide);
    }
    ;
    pauseSlide() {
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pauseMoment();
            this.paused = true;
            this.thumbActive?.classList.add("paused");
            if (this.slideActive instanceof HTMLVideoElement)
                this.slideActive.pause();
        }, 300);
    }
    ;
    continueSlideAfterPause() {
        this.pausedTimeout?.clearTimeout();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            this.thumbActive?.classList.remove("paused");
            if (this.slideActive instanceof HTMLVideoElement)
                this.slideActive.play();
        }
        ;
    }
    ;
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener("pointerdown", () => this.pauseSlide());
        this.controls.addEventListener("pointerup", () => this.continueSlideAfterPause());
        prevButton.addEventListener("pointerup", () => this.prevSlide());
        nextButton.addEventListener("pointerup", () => this.nextSlide());
    }
    ;
    addThumbItems() {
        const thumbContainer = document.createElement("div");
        thumbContainer.id = "slide-thumb";
        for (let index = 0; index < this.elements.length; index++) {
            thumbContainer.innerHTML += `
        <span>
          <span class="thumb-item">

          </span>
        </span>
      `;
        }
        ;
        this.controls.appendChild(thumbContainer);
        this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
    }
    ;
    init() {
        this.showSlide(this.index);
        this.addControls();
        this.addThumbItems();
    }
    ;
}
;
//# sourceMappingURL=Slide.js.map