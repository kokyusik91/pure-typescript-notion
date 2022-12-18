import { BaseComponent } from '../../component.js';

export class Video extends BaseComponent<HTMLElement> {
  constructor(url: string, title: string) {
    super(`
      <section class='video'>
        <div class="video_player"><iframe class='video_iframe'></iframe></div>
        <h3 class='video_title'></h3>
      </section>
    `);
    console.log(url);
    const videoElement = this.element.querySelector(
      '.video_iframe',
    )! as HTMLIFrameElement;
    videoElement.src = this.convertEmbeddUrl(url);

    const titleElement = this.element.querySelector(
      '.video_title',
    ) as HTMLHeadingElement;

    titleElement.textContent = title;
  }
  /**
   * 내부에서 쓰이는 메서드이므로 'private'키워드 붙여야함.
   * 사용자가 입력한 url을 받아서 -> embedd용 url로 convert해주는 함수 😚
   */
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
}

/**
 * todo
 * 우리는 유저가 유투브 주소를 복사해 왔을때 ID를 추출해서 Embeded용 url로 변경해야한다.
 * 가능한 url 종류 (input)
 * 1. https://www.youtube.com/watch?v=PJP26U-ko08
 * 2. https://youtu.be/PJP26U-ko08
 *
 * 만들어야하는 url (output)
 * 👉🏻 https://www.youtube.com/embed/PJP26U-ko0
 */
