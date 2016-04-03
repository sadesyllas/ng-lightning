import {Directive} from 'angular2/core';

@Directive({
  selector: '[nglTreeHeading]',
  host: {
    'tabindex': '-1',
    'role': 'presentation',
    '[attr.id]': 'id || ""',
  },
})
export class NglTreeHeading {
  id: string;
}
