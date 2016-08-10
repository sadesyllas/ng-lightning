import {AppComponent} from '...';
import {NglModule, provideNglConfig} from 'ng-lightning/ng-lightning';

@NgModule({
  imports: [NglModule, ...],
  declarations: [AppComponent, ...],
  providers: [provideNglConfig(/* optional configuration object with overrides */), ...],
  bootstrap: [AppComponent],
})
export class AppModule {}
