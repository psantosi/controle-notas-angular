import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroDialogComponent } from './components/erro-dialog/erro-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';



@NgModule({
  declarations: [
    ErroDialogComponent,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErroDialogComponent,
    SuccessDialogComponent
  ]
})
export class SharedModule { }
