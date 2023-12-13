import Chapter from "./Chapter";

class ChapterCover {
  ccId: number;
  ccPicture: string;
  chapter: Chapter;

  constructor(ccId: number, ccPicture: string, chapter: Chapter) {
    this.ccId = ccId;
    this.ccPicture = ccPicture;
    this.chapter = chapter;
  }
}

export default ChapterCover;
