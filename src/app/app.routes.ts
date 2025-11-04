// import { Routes } from '@angular/router';
// import { EmployeeListComponent } from './components/employee-list/employee-list.component';
// import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/employees', pathMatch: 'full' },
//   { path: 'employees', component: EmployeeListComponent },
//   { path: 'add-employee', component: EmployeeFormComponent },
//   { path: 'edit-employee/:id', component: EmployeeFormComponent }
// ];

import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'edit-employee/:id', component: EmployeeFormComponent } // Make sure this route has :id
];