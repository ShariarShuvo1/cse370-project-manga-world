import Publisher from "./Publisher";

class PublisherPicture {
  ppId: number;
  ppPicture: string;
  publisher: Publisher;

  constructor(ppId: number, ppPicture: string, publisher: Publisher) {
    this.ppId = ppId;
    this.ppPicture = ppPicture;
    this.publisher = publisher;
  }
}

export default PublisherPicture;
