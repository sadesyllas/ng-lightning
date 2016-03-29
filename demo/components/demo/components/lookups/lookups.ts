import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'demo-lookups',
  directives: [NGL_DIRECTIVES],
  template: require('./lookups.html'),
  providers: [HTTP_PROVIDERS],
})
export class DemoLookups {
  superhero: string;
  address: Object;

  constructor(public http: Http) {
    // Important if you want your `lookupAsync` function to use `Http`.
    this.lookupAsync = this.lookupAsync.bind(this);
  }

  lookup(query: string): string[] {
    const superheroes = ['Hulk', 'Flash', 'Superman', 'Batman', 'Spiderman', 'Iron Man', 'Thor', 'Wolverine', 'Deadpool'];
    if (!query) {
      return null;
    }

    return superheroes.filter((d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  onHeroPick(item: string) {
    this.superhero = item;
  }

  lookupAsync(query: string): Observable<any[]> {
    if (!query) {
      return null;
    }

    return this.http.get(`//maps.googleapis.com/maps/api/geocode/json?address=${query}`)
      .map((res: Response) => res.json())
      .map((response: any) => response.results);
  }

  onAddressPick(item: Object) {
    this.address = item;
  }
}
