import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

/**
 * PageComponent이전에 video, image, todo, note 컴포넌트를 자식으로 담는 <li> 컴포넌트
 */
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`
    <li class='item'>
      <section class='item_body'></section>
      <div class='page_item_control'>
        <button>X</button>
      </div>
    </li>
    `);
  }

  /**
   *
   * @param child 어떤 자식을 전달하던 간에 class='item_body'에 자식으로 붙여주는 함수
   * Component타입의 인자에는 어떤 컴포넌트가 들어올지 모르지만 interface안에는 attachTo라는 함수가 명시되어있다.
   */
  addChild(child: Component) {
    const item = this.element.querySelector('.item_body')! as HTMLElement;
    child.attachTo(item);
  }
}

/**
 * li 컴포넌트들이 담기는 ul 컴포넌트
 */
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class='page'></page>`);
  }

  addChild(sectionComponent: Component) {
    const item = new PageItemComponent();
    item.attachTo(this.element, 'beforeend');
    item.addChild(sectionComponent);
  }
}
