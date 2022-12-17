import { ImageComponent } from './components/imageComponent.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  private readonly imageCom: ImageComponent;
  // 초기화될때 실행되는 constructor 함수
  constructor(appRoute: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoute, 'afterbegin');
    this.imageCom = new ImageComponent(
      'https://d2lmphbmp3ptuw.cloudfront.net/assets/Screen_Shot_2021_02_25_at_1_40_19_PM_63945e7ab4.png?updated_at=2022-08-24T02:08:45.843Z',
      '컴포넌트',
    );
    this.imageCom.attachTo(this.page);
  }
}

/**
 * HTML파일에 이미 존재하는 HTMLelement이므로 as 키워드 사용가능!
 * 동적으로 만드는 htmlElement가 아니기때문.
 */
const main = document.querySelector('.document')! as HTMLElement;
const app = new App(main);
console.log(app);
