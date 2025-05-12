import { Component } from '@angular/core';
import { DeadlineComponent } from './components/deadline/deadline.component';

@Component({
  selector: 'app-root',
  imports: [DeadlineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'deadline';
}
