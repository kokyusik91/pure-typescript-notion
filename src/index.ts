import { ImageComponent } from './components/page/item/imageComponent.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  // 초기화될때 실행되는 constructor 함수
  constructor(appRoute: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoute, 'afterbegin');

    const image = new ImageComponent(
      'https://picsum.photos/600/300',
      'Image Title',
    );

    console.log('image', image);

    image.attachTo(appRoute, 'beforeend');
  }
}

/**
 * HTML파일에 이미 존재하는 HTMLelement이므로 as 키워드 사용가능!
 * 동적으로 만드는 htmlElement가 아니기때문.
 */
const main = document.querySelector('.document')! as HTMLElement;
const app = new App(main);
console.log(app);
