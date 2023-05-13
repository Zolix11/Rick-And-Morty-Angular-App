import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private isSidebarState = false;
  public sidebarStateChange = new EventEmitter<boolean>();

  constructor() { }

  toggleSidebar(): void {
    this.isSidebarState = !this.isSidebarState;
    this.sidebarStateChange.emit(this.isSidebarState);
  }

  isSidebarOpen(): boolean {
    return this.isSidebarState;
  }
}
