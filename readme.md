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

### 3-1. root 컴포넌트 Class 역할

- html에 연결하는 최초 entry js파일
- html에서 `<section class='document'></section>`를 찾아서(querySelector) constructor에 넘긴다.
- page 컴포넌트 Class를 인스턴스화 시켜 appRoute의 자식으로 붙인다.
- image 컴포넌트 Class를 인스턴스화 시켜 appRoute의 자식으로 붙인다.

### 3-2. page 컴포넌트 Class 역할

- `<ul>`태그로 템플릿을 만든다.

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
