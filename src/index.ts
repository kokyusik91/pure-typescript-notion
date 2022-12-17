import { PageComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/imageComponent.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoute: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoute);

    const image = new ImageComponent(
      'https://picsum.photos/600/300',
      'Image Title',
    );
    image.attachTo(appRoute, 'beforeend');
  }
}
/**
 * HTML파일에 이미 존재하는 HTMLelement이므로 as 키워드 사용가능!
 * 동적으로 만드는 htmlElement가 아니기때문.
 */
const section = document.querySelector('.document')! as HTMLElement;
const app = new App(section);
console.log(app);
