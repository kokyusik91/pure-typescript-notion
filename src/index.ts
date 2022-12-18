import { Composable, PageComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/imageComponent.js';
import { Note } from './components/page/item/note.js';
import { Todo } from './components/page/item/todo.js';
import { Video } from './components/page/item/video.js';
import { Component } from './components/component.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoute: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoute);

    const image = new ImageComponent(
      'https://picsum.photos/600/300',
      'Image Title',
    );
    this.page.addChild(image);

    const note = new Note(
      '2022년 마무으리',
      '내년엔 어떤것을 해야할지 생각해 보아야겠다!',
    );

    this.page.addChild(note);

    const todo = new Todo('객체지향 마무리', '구현을 얼른 마쳐야함!');
    this.page.addChild(todo);
    const video = new Video(
      'https://www.youtube.com/watch?v=t3M6toIflyQ',
      '프롱트',
    );
    this.page.addChild(video);
  }
}
/**
 * HTML파일에 이미 존재하는 HTMLelement이므로 as 키워드 사용가능!
 * 동적으로 만드는 htmlElement가 아니기때문.
 */
const section = document.querySelector('.document')! as HTMLElement;
const app = new App(section);
console.log(app);
