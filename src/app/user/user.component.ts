import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from './user';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    providers: [MessageService, ConfirmationService, UserService],
})
export class UserComponent implements OnInit{

    productDialog: boolean = false;
    users!: User[];
    user!: User;
    selectedUsers!: User[] | null;
    submitted: boolean = false  ;
    roles!: any[];
    userID: any;
    editData: User | undefined;
    dataId: any;

    constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.userService.getUsersData().subscribe((data) => {
          this.users = data;
        }, error => {
          console.error('Error fetching data:', error);
        });

        this.roles = [
            { label: 'ROLE_ADMIN', value: 'ROLE_ADMIN' },
            { label: 'ROLE_USER', value: 'ROLE_USER' }
        ];
    }

    openNew() {
        this.user = {emailId: '', id: '', firstName: '', lastName: '', role: ''};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter((val) => !this.selectedUsers?.includes(val));
                this.selectedUsers = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteUser(userID: String) {
        debugger;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + userID + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.deleteUser(userID).subscribe(() => {
                this.users = this.users.filter(user => user.id !== userID);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              });
            }
          });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    editUser(user: User) {
      this.user = { ...user };
      this.productDialog = true;
    }

    saveUser(form: any): void {

        this.submitted = true;
        let id = this.user.id;
        this.user = form.value;
        this.user.id = id;
        console.log(this.user);

        this.userService.postData(this.user).subscribe(
          response => {
            console.log('Data saved successfully:', response);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Saved', life: 3000 });
          },
          error => {
            console.error('Error saving data:', error);
            this.messageService.add({ severity: 'warning', summary: 'Failed', detail: 'Product Not Saved', life: 3000 });

          }
        )
        this.hideDialog();
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(role: string): any {
        switch (role) {
            case 'ADMIN':
                return 'success';
            case 'USER':
                return 'warning';
        }
    }
}
