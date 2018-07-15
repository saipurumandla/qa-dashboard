import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule, WavesModule } from 'angular-bootstrap-md';
// Fire Base Imports //
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// end Fire Base Imports //
import { ProjectsComponent } from './component/projects/projects.component';
import { QadashboardService } from './service/qadashboard.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProjectModalComponent } from './component/project-modal/project-modal.component';
import { DataTableComponent } from './component/data-table/data-table.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NavbarComponent,
    ProjectModalComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    WavesModule
  ],
  providers: [QadashboardService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
