import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroDialogComponent } from 'src/app/shared/components/erro-dialog/erro-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

import { Task } from '../model/task';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup;
  classroomId: string = '';
  tasks: Task[] = [];
  displayedColumns = ['name', 'actions'];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params: Params) => this.classroomId = params['classroomId']);

    this.form = this.formBuilder.group({
      name: [null]
    });

    this.listTask();
   }

  ngOnInit(): void {
  }

  listTask() {
    this.taskService.list(this.classroomId).subscribe(res => {
      this.tasks = res;
    });
  }

  onSubmit() {
    this.taskService.save(this.form.value, this.classroomId)
    .subscribe(res => {
      this.onSuccess('Tarefa cadatrada com sucesso!');
      this.form.controls.name.setValue('');
      this.listTask();
    });
  }

  onBack() {
    this.router.navigate(['classes']);
  }

  onDeleteTask(id: Number) {
    this.taskService.delete(id).subscribe(res => {
      this.onSuccess('Tarefa excluida com sucesso!');
      this.listTask();
    });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErroDialogComponent, {
      data: errorMessage,
    });
  }


  onSuccess(successMessage: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: successMessage,
    });

    setTimeout(() => this.dialog.closeAll(), 1500);
  }

}
