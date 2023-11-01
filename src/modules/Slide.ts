
export class Slide {
  container;
  elements;
  controls;
  time;

  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.time = time;

    console.log(container)
    console.log(elements)
    console.log(controls)
    console.log(time)
  };

};
