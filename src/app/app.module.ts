import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, DoBootstrap } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { AppComponent } from './app.component';

export function initApp(http: HttpClient) {
  return () => {
    return http.get('https://api.github.com/users/sagar-ganatra')
      .toPromise()
      .then((resp) => {
        console.log('Response 1 - ', resp);
      });
  };

  // return () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log('In initApp');
  //       resolve();
  //     }, 3000);
  //   });
  // };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
