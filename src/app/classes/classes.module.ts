import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes/classes.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassFormComponent } from './class-form/class-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';


@NgModule({
  declarations: [
    ClassesComponent,
    StudentFormComponent,
    ClassFormComponent,
    TaskFormComponent,
    GradeDialogComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClassesModule { }
