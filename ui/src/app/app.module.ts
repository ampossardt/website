import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactSectionComponent } from './components/home/contact.component';
import { TechnologySectionComponent } from './components/home/technology.component';
import { NavigationComponent } from './components/home/navigation.component';
import { CanvasComponent } from './components/common/canvas.component';

import { ContentfulService } from './services/contentful.service'

@NgModule({
  declarations: [
    AppComponent, ContactSectionComponent, TechnologySectionComponent, NavigationComponent, CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ContentfulService],
  bootstrap: [AppComponent, ContactSectionComponent, TechnologySectionComponent, NavigationComponent]
})
export class AppModule { }