# 노션 프로젝트 만들기

## 1. 프로젝트 오픈

- [x] index.html 파일 생성
- [x] 폴더 구조 설정
- [x] reset.css 생성하여 index.html에 연결
- [x] index.ts 파일을 만들고 빌드했을때 index.js로 변경되게 만듬
- [x] build폴더 하위에 index.js가 생성되게 만들고, index.html에 연결

```Html
  <script type='module' src='./dist/index.js' defer></script>
```

- 👉🏻 자바스크립트 파일을 모듈화 시키기 위해 `type='module'`옵션을 주고 `defer`옵션으로 비동기로 JS파일을 받아올 수 있게 만들어 준다.

## 2. 퍼블리싱 진행

- [x] index.html 마크업 진행
- [x] style.css로 해당 스타일링 진행
- [x] Modal Input창도 따로 스타일링 하여 만들기

## 3. 기본 기능개발

<br>

### 3-1. root 컴포넌트 Class 역할

- html에 연결하는 최초 entry js파일
- html에서 `<section class='document'></section>`를 찾아서(querySelector) constructor에 넘긴다.
- page 컴포넌트 Class를 인스턴스화 시켜 appRoute의 자식으로 붙인다.
- image 컴포넌트 Class를 인스턴스화 시켜 appRoute의 자식으로 붙인다.

<br>

### 3-2. page 컴포넌트 Class 역할

- `<ul>`태그로 템플릿을 만든다.

<br>

### 3-3. 이미지 컴포넌트 Class 역할

- 사용자가 image url 과 image title을 입력한다.
- 이미지 컴포넌트 인스턴스에 url과 title을 전달받아서 이미지 컴포넌트 인스턴스가 생성된다.
- 이미지 컴포넌트 인스턴스 구성은

```Html
<article class='image-container'>
  <img src='https://image-image.png' />
  <h1>이미지 제목</h1>
</article>
```

- 이미지 컴포넌트 인스턴스가 생성되어서 pageComponent에 부착된다.

<br>

### ⭐️ 3-4. 캡슐화 시킨 컴포넌트 BaseComponent Class 역할

- 존재 목적 : Page 컴포넌트 Class와 Image 컴포넌트 Class에서 공통으로 가지고 있는 element와 attachTo 메서드를 캡슐화한다. (밖에서는 볼수 없도록)
- **결국 string 타입의 htmlString을 contructor 인자로 받아서 만들어 주는 역할을 한다.**
- 추가로 공통 함수인 attachTo도 공통으로 선언해 놓았다.
- 자식 Class에서는 `super()`키워드로 string template을 전달하여 element를 생성 할 수 있다.

```Typescript
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
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
```

<br>

### 3-5. 기타 컴포넌트들 개발 (BaseComponent의 상속을 사용)

**예시) ImageComponent**

```ts
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
```

✨ **중요한 점** : **ImageComponent**는 BaseComponent를 상속받아서 구현하므로, super() 함수에 인자로 만들고 싶은 htmlTemplate을 string literal 형식으로 전달하게 되면, 부모(BaseComponent)의 constructor()에서 인자로 받아서 **ImageComponent** 멤버 변수로 this.element를 만들어준다. **ImageComponent** 는 이 this.element로 class 내부에서 참조하여 사용 할수 있다!

### 3-6. Video 컴포넌트 개발 (regex 사용)

🚨 문제점 : 유저가 유투브 링크를 복사해서 input에 전달할때, 유투브 임베디드 형식으로 변경해줘야한다.

- 우리는 유저가 유투브 주소를 복사해 왔을때 ID를 추출해서 Embeded용 url로 변경해야한다.
- 유저에게 받을 수 있는 가능한 url 종류 (유저의 input으로 받을 수 있는 url 타입 )

1.  https://www.youtube.com/watch?v=PJP26U-ko08
2.  https://youtu.be/PJP26U-ko08

- 개발자가 만들어야하는 url 타입

1.  👉🏻 https://www.youtube.com/embed/PJP26U-ko0

<br>

🌟 **해결책** : regex를 이용해서 유저에게 받은 url에서 맨뒤의 videoID만 추출해서 임베디드 url 형식으로 만들어 준다. -> videoComponent의 내부 private 메서드를 만들어 준다.

```ts
  private convertEmbeddUrl(url: string): string {
    // video Id를 전달받은 url로 부터 추출해야한다.
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;

    const match = url.match(regExp);
    // PJP26U-ko08
    const videoId = match ? match[1] || match[2] : undefined;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }
```

### 3-7. PageItemComponent 컴포넌트 개발 (어려웠음...이해가 잘 안감)

🔧 용도 : 기존에는 최상단 App Component에서 ImageComponent, note, video, todo Component들을 직접 `<section class='document'></section>` 에 자식으로 `insertAdjacentElement()` 해줬었는데, 이제는 PageComponent (ul태그로 이루어진) 하위에 PageItemComponent를 만들어서 거기에 여러가지 Item Component(Image, note, video, todo components)들을 붙여주려고한다.

```ts
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`
    <li class='item'>
      <section class='item_body'></section>
      <button>X</button>
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
```

✨ **중요한 점**

1. PageItemComponent 역시 BaseComponent를 상속받기 때문에 super() 키워드로 this.element를 만들 수 있다.
2. 내부의 addChild()메서드의 인자인 child는 어떤 인자가 들어올지는 모르는데... Component라는 interface 타입으로 interface에 명시된 attachTo() 메서드를 사용할 수 있다.

```ts
export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}
```

3. 👉🏻 PageItemComponent 하는 역할 : `<li>`태그로 감싸진 template을 만든다. 그리고 addChild라는 메서드를 사용해서 전달 받은 컴포넌트를 template하위에 붙일 수 있다.

<br>

### 3-8. PageComponent 컴포넌트 수정

`<ul>`로 감싸진 이 PageComponent Class는 내부에서 새로운 addChild 메서드를 선언한다. PageItemComponent를 인스턴스화 시켜서 붙이고 싶은 Item Component들을 인자로 받아서 PageItemComponent의 addChid메서드로 Item Component를 하위로 붙이고, 붙인 PageItemComponent의 인스턴스를 attchTo메서드로 PageComponent하위에 붙인다.

```ts
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class='page'></page>`);
  }

  addChild(sectionComponent: Component) {
    const item = new PageItemComponent();
    item.addChild(sectionComponent);
    item.attachTo(this.element, 'beforeend');
  }
}
```
