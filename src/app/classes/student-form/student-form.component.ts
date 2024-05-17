import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErroDialogComponent } from 'src/app/shared/components/erro-dialog/erro-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

import { StundentsService } from './../services/stundents.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  form: FormGroup;
  classroomId: string = '';
  studentId: string = '';
  isEdit: boolean = false;
  title: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private stundentsService: StundentsService,
              public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: [null]
    });

    this.route.params.subscribe((params: Params) => this.classroomId = params['classroomId']);
    this.route.params.subscribe((params: Params) => this.studentId = params['studentId']);

    if (this.studentId) {
      this.isEdit = true;
      this.title = 'Edição de aluno';
      this.getStudent(Number(this.studentId));
    } else {
      this.title = 'Cadastro de aluno';
    }
   }


  ngOnInit(): void {
  }

  getStudent(id: Number) {
    this.stundentsService.get(id)
      .subscribe(stundent => this.form.controls.name.setValue(stundent.name));

  }

  onSubmit() {
    if (this.isEdit) {
      this.stundentsService.update(this.form.value, this.studentId)
      .subscribe(stundent => {
        this.onSuccess('Aluno editado com sucesso!');
        setTimeout(() => this.router.navigate(['classes']), 2000);
      });
    } else {
      this.stundentsService.salve(this.form.value, this.classroomId)
      .subscribe(stundent => {
        this.onSuccess('Aluno cadatrado com sucesso!');
        this.form.controls.name.setValue('');
        setTimeout(() => this.router.navigate(['classes']), 2000);
      });
    }
  }

  onBack() {
    this.router.navigate(['classes']);
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
