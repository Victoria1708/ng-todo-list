import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskFormComponent} from './components/new-task-form/task-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TaskComponent} from './components/task-list/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
