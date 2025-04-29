// ------------------------------------------------------------------------------
//  Component: AppComponent
//  Description: Main application root component
//  Author: Ahmad Alzafiri
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { RosterViewComponent } from './components/roster-view/roster-view.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    EmployeeFormComponent,
    RosterViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Roster Wizard Frontend';
}
