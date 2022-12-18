import { BaseComponent } from '../../component.js';

export class Note extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(`
    <section class='note'>
      <h1 class='note-title'></h1>
      <p class='note-description'></p>
    </section>
  `);

    // 여기서 this는 BaseComponent에서 만들어진 template임
    console.log('@@@@this@@@', this.element);
    const titleTag = this.element.querySelector(
      '.note-title',
    )! as HTMLHeadElement;
    titleTag.textContent = title;

    const pTag = this.element.querySelector(
      '.note-description',
    )! as HTMLParagraphElement;
    pTag.textContent = body;
  }
}
