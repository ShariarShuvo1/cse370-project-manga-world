class Manga {
  mid: number;
  mtitle: string;
  mstatus: string;
  mpublishDate: Date;
  mview: number;
  mdescription: string;

  constructor(
    mid: number,
    mtitle: string,
    mstatus: string,
    mpublishDate: Date,
    mview: number,
    mdescription: string
  ) {
    this.mid = mid;
    this.mtitle = mtitle;
    this.mstatus = mstatus;
    this.mpublishDate = mpublishDate;
    this.mview = mview;
    this.mdescription = mdescription;
  }
}
export default Manga;
