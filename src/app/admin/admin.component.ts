import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'User', icon: 'pi pi-fw pi-home', routerLink: 'user' },
            { label: 'Company', icon: 'pi pi-fw pi-calendar', routerLink: 'company' },
            { label: 'Machines', icon: 'pi pi-fw pi-pencil', routerLink: 'machines' }
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }
}
