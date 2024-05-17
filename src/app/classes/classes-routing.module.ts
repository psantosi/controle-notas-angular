import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'new-student/:classroomId', component: StudentFormComponent },
  { path: 'edit-student/:studentId', component: StudentFormComponent },
  { path: 'new-class', component: ClassFormComponent },
  { path: 'task/:classroomId', component: TaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
