import Volume from "./Volume";

class Chapter {
  cid: number;
  cnumber: number;
  creleaseDate: Date;
  cpageCount: number;
  cview: number;
  volume: Volume;

  constructor(
    cid: number,
    cnumber: number,
    creleaseDate: Date,
    cpageCount: number,
    cview: number,
    volume: Volume
  ) {
    this.cid = cid;
    this.cnumber = cnumber;
    this.creleaseDate = creleaseDate;
    this.cpageCount = cpageCount;
    this.cview = cview;
    this.volume = volume;
  }
}

export default Chapter;
