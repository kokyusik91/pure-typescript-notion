export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

/**
 * 캡슐화를 했음 HTML Elment를 만든다.
 * 외부에서는 HTML Elment를 어떻게 만드는지 관여하지 않는다.
 * 만들고 싶은 string 타입의 template을 넘기게 되면 알아서 htmlTemplate을 만들어준다.
 */
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  // 자식이 super(👉🏻 여기) 전달한 인자가 htmlString에 들어와서 this.element를 만든다.
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }
  /**
   *
   * @param parent HTMLElment 붙일 부모요소
   * @param position 어느 위치에 붙일건지
   */
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
