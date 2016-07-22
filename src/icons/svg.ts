import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {NglConfig} from '../config/config';

@Component({
  selector: 'svg[nglIcon]',
  templateUrl: './svg.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-hidden]': 'true',
  },
})
export class NglIconSvg {

  @Input('nglIconCategory') category: string = 'utility';
  @Input('nglIcon') icon: string;

  constructor(private config: NglConfig) {}

  iconPath() {
    return `${this.config.svgPath}/${this.category}-sprite/svg/symbols.svg#${this.icon}`;
  }
}
