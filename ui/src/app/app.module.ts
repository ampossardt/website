import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectTileComponent } from './components/project-widget/projectTile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectTileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, ProjectTileComponent]
})
export class AppModule { }
