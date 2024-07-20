import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { AdminRoutingModule } from './admin-routing.module';
import { CompanyComponent } from '../company/company.component';
import { MachinesComponent } from '../machines/machines.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AuthInterceptor } from '../user/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';

@NgModule({
  declarations:[
    CompanyComponent,
    MachinesComponent,
    UserComponent
  ],
  imports:[
    AdminRoutingModule,
    MenubarModule,
    CardModule,
    TabMenuModule,
    ButtonModule,
    TableModule,
    ToastModule,
    CommonModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule,
    RatingModule,
    RadioButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }, MessageService, UserService]
})
export class AdminModule { }
