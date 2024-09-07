import { Component, OnInit } from '@angular/core';
import { Machines } from './machines';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MachinesService } from '../services/machines.service';

@Component({
  selector: 'app-machines',
  //imports: [],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css',
  providers: [MessageService, ConfirmationService, MachinesService],
})
export class MachinesComponent implements OnInit{

  productDialog: boolean = false;
  machines!: Machines[];
  machine!: Machines;
  selectedMachines!: Machines[] | null;
  submitted: boolean = false  ;
  roles!: any[];
  machinesID: any;
  editData: Machines | undefined;
  dataId: any;
  data = [];

  constructor(private machineService: MachinesService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.machineService.getMachinesData().subscribe((data) => {
        this.machines = data;
      }, error => {
        console.error('Error fetching data:', error);
      });

      this.roles = [
          { label: 'ROLE_ADMIN', value: 'ROLE_ADMIN' },
          { label: 'ROLE_USER', value: 'ROLE_USER' }
      ];
  }

  openNew() {
      this.machine = {id: '', code: '', name: '', machineOperator: '', type: '',status: '',part: [],rawMaterial: [],nodeMCU: []};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedMachines() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.machines = this.machines.filter((val) => !this.selectedMachines?.includes(val));
              this.selectedMachines = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Machines Deleted', life: 3000 });
          }
      });
  }

  deleteMachine(machinesID: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + machinesID + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.machineService.deleteMachine(machinesID).subscribe(() => {
              this.machines = this.machines.filter(machine => machine.id !== machinesID);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Machine Deleted', life: 3000 });
            });
          }
        });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  editMachine(machine: Machines) {
    this.machine = { ...machine };
    this.productDialog = true;
  }

  saveMachine(form: any): void {

      this.submitted = true;
      let id = this.machine.id;
      this.machine = form.value;
      this.machine.id = id;
      console.log(this.machine);

      this.machineService.postData(this.machine).subscribe(
        response => {
          console.log('Data saved successfully:', response);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Machine Saved', life: 3000 });

          this.machineService.getMachinesData().subscribe((data) => {
            this.machines = data;
          }, error => {
            console.error('Error fetching data:', error);
          });

        },
        error => {
          console.error('Error saving data:', error);
          this.messageService.add({ severity: 'warning', summary: 'Failed', detail: 'Machine Not Saved', life: 3000 });

        }
      );
      this.hideDialog();
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
