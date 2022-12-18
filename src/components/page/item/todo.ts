import { BaseComponent } from '../../component.js';

export class Todo extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`
    <section class='todo'>
      <h1 class='todo-title'></h1>
      <input type='checkbox' class='todo-checkbox' />
    </section>
  `);

    const titleElement = this.element.querySelector(
      '.todo-title',
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const inputElement = this.element.querySelector(
      '.todo-checkbox',
    )! as HTMLInputElement;
    inputElement.insertAdjacentText('afterend', todo);
  }
}
