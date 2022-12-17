// - 사용자가 image url 과 image title을 입력한다.
// - 이미지 컴포넌트 인스턴스에 url과 title을 전달받아서 이미지 컴포넌트 인스턴스가 생성된다.
// - 이미지 컴포넌트 인스턴스 구성은
// <article class='image-container'>
//  <img src='https://image-image.png' />
//  <h1>이미지 제목</h1>
// </article>

// 내부적으로 돔 요소를 만든다....
export class ImageComponent {
  private element: HTMLElement;

  constructor(url: string, title: string) {
    const template = document.createElement('template');
    console.log(template);
    template.innerHTML = `
      <section class='image'>
        <div class='image_holder'>
          <img class='image_thumbnail' >
          <p class='image_title'></p>
        </div>
      </section>
    `;

    this.element = template.content.firstElementChild! as HTMLElement;
    // 유저가 입력한 값을 바로 template literal에 넣으면 위험 할 수 있기 때문에
    // querySelector에서 imageComponent를 찾아서 src, alt를 할당해 준다.
    const imageComponent = this.element.querySelector(
      '.image_thumbnail',
    )! as HTMLImageElement;
    console.log(imageComponent);
    imageComponent.src = url;
    imageComponent.alt = title;

    const titleComponent = this.element.querySelector(
      '.image_title',
    )! as HTMLParagraphElement;
    titleComponent.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
