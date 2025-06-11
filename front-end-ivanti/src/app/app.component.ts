import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {UserService} from './shared/services/user.service';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
