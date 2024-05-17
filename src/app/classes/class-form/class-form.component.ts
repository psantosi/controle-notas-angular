import { ClassesService } from './../services/classes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErroDialogComponent } from 'src/app/shared/components/erro-dialog/erro-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private classesService: ClassesService,
              public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.classesService.save(this.form.value)
    .subscribe(res => {
      this.onSuccess('Turma cadatrado com sucesso!');
      this.form.controls.name.setValue('');
      setTimeout(() => this.router.navigate(['classes']), 2000);
    });
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
