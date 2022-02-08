class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName);
  }
  display() {
    this.realImg.display();
  }
}
