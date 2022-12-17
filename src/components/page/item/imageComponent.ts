// - 사용자가 image url 과 image title을 입력한다.
// - 이미지 컴포넌트 인스턴스에 url과 title을 전달받아서 이미지 컴포넌트 인스턴스가 생성된다.
// - 이미지 컴포넌트 인스턴스 구성은
// <article class='image-container'>
//  <img src='https://image-image.png' />
//  <h1>이미지 제목</h1>
// </article>

// 내부적으로 돔 요소를 만든다....
export class ImageComponent {
  private element: HTMLLIElement;
  private imageElement: HTMLImageElement;
  private titleElement: HTMLHeadingElement;
  constructor(url: string, title: string) {
    this.element = document.createElement('li');
    // 이미지 태그를 만듬.
    this.imageElement = document.createElement('img');
    this.titleElement = document.createElement('h1');
    this.titleElement.innerText = title;
    this.imageElement.setAttribute('src', url);
    this.element.appendChild(this.imageElement);
    this.element.appendChild(this.titleElement);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
