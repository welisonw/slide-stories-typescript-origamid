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
            this.showSlide(this.index);
        this.slideActive = this.elements[this.index];
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
}
;
//# sourceMappingURL=Slide.js.map