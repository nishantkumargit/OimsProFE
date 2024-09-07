import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NodeMCU } from './nodemcu';
import { Observable } from 'rxjs';
import { NodeMCUService } from '../services/nodemcu.service';

@Component({
  selector: 'app-node-mcu',
  templateUrl: './node-mcu.component.html',
  styleUrl: './node-mcu.component.css',
  providers: [MessageService, ConfirmationService, NodeMCUService],
})
export class NodeMCUComponent implements OnInit{

  productDialog: boolean = false;
  nodeMcus!: NodeMCU[];
  nodeMcu!: NodeMCU;
  selectedNodeMcu!: NodeMCU[] | null;
  submitted: boolean = false  ;
  status!: any[];
  nodeID: any;
  editData: NodeMCU | undefined;
  dataId: any;
  data = [];

  constructor(private nodeMCUService: NodeMCUService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.nodeMCUService.getNodeMcusData().subscribe((data) => {
        this.nodeMcus = data;
      }, error => {
        console.error('Error fetching data:', error);
      });

      this.status = [
          { label: 'ROLE_ACTIVE', value: 'ROLE_ACTIVE' },
          { label: 'ROLE_INACTIVE', value: 'ROLE_INACTIVE' }
      ];
  }

  openNew() {
      this.nodeMcu = {id: '', deviceId: '', name: '', status: '', installationDate:  '', recievedTime: ''};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedNodeMcus() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.nodeMcus = this.nodeMcus.filter((val) => !this.selectedNodeMcu?.includes(val));
              this.selectedNodeMcu = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
          }
      });
  }

  deleteNodeMcu(nodeID: String) {
      debugger;
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + nodeID + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.nodeMCUService.deleteNodeMcu(nodeID).subscribe(() => {
              this.nodeMcus = this.nodeMcus.filter(nodeMcu => nodeMcu.id !== nodeID);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            });
          }
        });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  editMcu(nodeMcu: NodeMCU) {
    this.nodeMcu = { ...nodeMcu };
    this.productDialog = true;
  }

  saveNodeMcu(form: any): void {

      this.submitted = true;
      let id = this.nodeMcu.id;
      this.nodeMcu = form.value;
      this.nodeMcu.id = id;
      console.log(this.nodeMcu);

      this.nodeMCUService.postData(this.nodeMcu).subscribe(
        response => {
          console.log('Data saved successfully:', response);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Saved', life: 3000 });

          this.nodeMCUService.getNodeMcusData().subscribe((data) => {
            this.nodeMcus = data;
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
      for (let i = 0; i < this.nodeMcus.length; i++) {
          if (this.nodeMcus[i].id === id) {
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
          case 'ACTIVE':
              return 'success';
          case 'INACTIVE':
              return 'warning';
      }
  }
}

