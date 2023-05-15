import { SidebarStateService } from './../../services/sidebar-state.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private sidebarService: SidebarStateService) {
    
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
