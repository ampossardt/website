import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactSectionComponent } from './components/home/contact.component';
import { TechnologySectionComponent } from './components/home/technology.component';
import { NavigationComponent } from './components/home/navigation.component';
import { CanvasComponent } from './components/common/canvas.component';

import { MailService } from './services/mail.service';

@NgModule({
  declarations: [
    AppComponent, ContactSectionComponent, TechnologySectionComponent, NavigationComponent, CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [MailService],
  bootstrap: [AppComponent, ContactSectionComponent, TechnologySectionComponent, NavigationComponent]
})
export class AppModule { }