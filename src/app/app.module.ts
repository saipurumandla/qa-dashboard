import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// Fire Base Imports //
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// end Fire Base Imports //
import { ProjectsComponent } from './component/projects/projects.component';
import { QadashboardService } from './service/qadashboard.service';
import { NavbarComponent } from './component/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [QadashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
