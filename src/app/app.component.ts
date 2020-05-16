import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userStore';
  showDashboard = false;

  toggleShowDashboard() {
    this.showDashboard = !this.showDashboard;
  }
}
