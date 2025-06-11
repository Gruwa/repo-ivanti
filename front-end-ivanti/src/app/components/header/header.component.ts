import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavigationLinkDirective} from '../../shared/directives/navigation-link.directive';
import {ButtonComponent} from '../../../../projects/shared-components/src/lib/button/button.component';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NavigationLinkDirective,
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dataService = inject(UserService);
}
