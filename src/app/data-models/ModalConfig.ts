export class ModalConfig {
  public animated: boolean;
  public keyboard: boolean;
  public ignoreBackdropClick: boolean;
  public constructor() {
    this.animated = true;
    this.keyboard = false;
    this.ignoreBackdropClick = true;
  }
}
