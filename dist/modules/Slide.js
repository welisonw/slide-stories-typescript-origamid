export class Slide {
    container;
    elements;
    controls;
    time;
    index;
    slideActive;
    constructor(container, elements, controls, time = 5000) {
        this.container = container;
        this.elements = elements;
        this.controls = controls;
        this.time = time;
        this.index = 0,
            this.slideActive = this.elements[this.index];
        this.init();
    }
    ;
    hideSlide(element) {
        element.classList.remove("active");
    }
    ;
    showSlide(index) {
        this.index = index;
        this.slideActive = this.elements[this.index];
        this.elements.forEach(element => this.hideSlide(element));
        this.slideActive.classList.add("active");
    }
    ;
    prevSlide() {
        const prevSlide = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.showSlide(prevSlide);
    }
    ;
    nextSlide() {
        const nextSlide = (this.index + 1) < this.elements.length ? this.index + 1 : 0;
        this.showSlide(nextSlide);
    }
    ;
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        prevButton.addEventListener("pointerup", () => this.prevSlide());
        nextButton.addEventListener("pointerup", () => this.nextSlide());
    }
    ;
    init() {
        this.showSlide(this.index);
        this.addControls();
    }
    ;
}
;
//# sourceMappingURL=Slide.js.map