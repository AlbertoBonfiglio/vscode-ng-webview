import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // ng
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // core
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
