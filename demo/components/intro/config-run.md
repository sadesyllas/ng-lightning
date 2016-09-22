export class AppComponent {
  ...
  changeConfig() {
    this.config.svgPath = 'new/path';
    this.config.refresh();
  }
}
