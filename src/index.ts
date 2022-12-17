import { PageComponent } from './components/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoute: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoute);
  }
}

const main = document.querySelector('.document')! as HTMLElement;
new App(main);
