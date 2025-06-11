import { Routes } from '@angular/router';
import {EditUserComponent} from './components/edit-user/edit-user.component';

export const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'edit', component: EditUserComponent}
];
