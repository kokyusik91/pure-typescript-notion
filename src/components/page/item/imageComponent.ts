import { BaseComponent } from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(url: string, title: string) {
    /**
     * super로 부모의 constructor(👉🏻 여기)로 템플릿이 전달되어 element가 만들어진다.
     */
    super(
      `
      <section>
        <div class="image_holder">
          <img class="image_thumbnail" />
          <p class="title"></p>
        </div>
      </section>,
      `,
    );
    // 부모 class에서 this.element를 만든다. 그 다음 코드 실행
    const imageTag = this.element.querySelector(
      '.image_thumbnail',
    )! as HTMLImageElement;
    imageTag.src = url;
    imageTag.alt = title;
    // template에서
    const titleTag = this.element.querySelector(
      '.title',
    )! as HTMLParagraphElement;
    titleTag.textContent = title;
  }
}
