import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private isSidebarState = false;
  public sidebarStateChange = new EventEmitter<boolean>();

  constructor() { }

  /**
   * Toggles the sidebar state between open and closed.
   * Emits the updated sidebar state through the `sidebarStateChange` event emitter.
   */
  toggleSidebar(): void {
    this.isSidebarState = !this.isSidebarState;
    this.sidebarStateChange.emit(this.isSidebarState);
  }

  /**
   * Checks if the sidebar is currently open.
   * @returns A boolean value indicating whether the sidebar is open.
   */
  isSidebarOpen(): boolean {
    return this.isSidebarState;
  }
}
