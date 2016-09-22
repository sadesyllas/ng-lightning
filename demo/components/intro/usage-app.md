import {AppComponent} from '...';
import {NglModule} from 'ng-lightning/ng-lightning';

@NgModule({
  imports: [..., NglModule],
  declarations: [AppComponent, ...],
  bootstrap: [AppComponent],
})
export class AppModule {}
