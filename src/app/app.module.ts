import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompMaterialComponent } from './component/comp-material/comp-material.component';

import { ModMaterialModule } from './modules/mod-material/mod-material.module';
import { PdfCvComponent } from './component/pdf-cv/pdf-cv.component';

@NgModule({
  declarations: [
    AppComponent,
    CompMaterialComponent,
    PdfCvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ModMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
