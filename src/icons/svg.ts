import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NglConfig, NglConfigurable} from '../config/config';

@Component({
  selector: 'svg[nglIcon]',
  templateUrl: './svg.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-hidden]': 'true',
  },
})
@NglConfigurable()
export class NglIconSvg {

  @Input('nglIconCategory') category: string = 'utility';
  @Input('nglIcon') icon: string;

  constructor(private config: NglConfig, private cd: ChangeDetectorRef) {}

  iconPath() {
    return `${this.config.svgPath}/${this.category}-sprite/svg/symbols.svg#${this.icon}`;
  }
}
