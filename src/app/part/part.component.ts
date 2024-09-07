import { Component, OnInit } from '@angular/core';
import { PartService } from '../services/part.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Part } from './part';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrl: './part.component.css',
  providers: [MessageService, ConfirmationService, PartService],
})
export class PartComponent implements OnInit{

  productDialog: boolean = false;
  parts!: Part[];
  part!: Part;
  selectedParts!: Part[] | null;
  submitted: boolean = false  ;
  roles!: any[];
  partID: any;
  editData: Part | undefined;
  dataId: any;
  data = [];

  constructor(private partService: PartService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.partService.getPartsData().subscribe((data) => {
        this.parts = data;
      }, error => {
        console.error('Error fetching data:', error);
      });

      this.roles = [
          { label: 'ROLE_ADMIN', value: 'ROLE_ADMIN' },
          { label: 'ROLE_USER', value: 'ROLE_USER' }
      ];
  }

  openNew() {
      this.part = {id: '', name: '', quantity: '', weight: '', drawingURL: '', rawMaterial: [], machines: []};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedParts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.parts = this.parts.filter((val) => !this.selectedParts?.includes(val));
              this.selectedParts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
          }
      });
  }

  deletePart(partID: String) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + partID + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.partService.deletePart(partID).subscribe(() => {
              this.parts = this.parts.filter(part => part.id !== partID);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            });
          }
        });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  editPart(part: Part) {
    this.part = { ...part };
    this.productDialog = true;
  }

  savePart(form: any): void {

      this.submitted = true;
      let id = this.part.id;
      this.part = form.value;
      this.part.id = id;
      console.log(this.part);

      this.partService.postData(this.part).subscribe(
        response => {
          console.log('Data saved successfully:', response);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Saved', life: 3000 });

          this.partService.getPartsData().subscribe((data) => {
            this.parts = data;
          }, error => {
            console.error('Error fetching data:', error);
          });

        },
        error => {
          console.error('Error saving data:', error);
          this.messageService.add({ severity: 'warning', summary: 'Failed', detail: 'User Not Saved', life: 3000 });

        }
      );
      this.hideDialog();
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.parts.length; i++) {
          if (this.parts[i].id === id) {
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
