import {Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {routes as editRoutes} from '../../projects/sub-ivanti/src/app/app.routes';
import {AppComponent} from '../../projects/sub-ivanti/src/app/app.component';

export const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: 'users-list/:id', component: UsersListComponent},
  {path: 'full-users-list', component: UsersListComponent},
  {path: 'edit-user/:id', component: AppComponent, children: editRoutes},
  {path: '404', redirectTo: 'home'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];
