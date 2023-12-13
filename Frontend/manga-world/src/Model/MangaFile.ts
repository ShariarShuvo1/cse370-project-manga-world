import Chapter from "./Chapter";

class MangaFile {
  mfId: number;
  mfFile: string;
  chapter: Chapter;

  constructor(mfId: number, mfFile: string, chapter: Chapter) {
    this.mfId = mfId;
    this.mfFile = mfFile;
    this.chapter = chapter;
  }
}

export default MangaFile;
