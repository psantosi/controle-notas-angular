import { ClassesService } from './../services/classes.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { Observable, of } from 'rxjs';
import { Class } from '../model/class';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErroDialogComponent } from 'src/app/shared/components/erro-dialog/erro-dialog.component';
import { StundentsService } from '../services/stundents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { GradeDialogComponent } from '../grade-dialog/grade-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classes: Observable<Class[]>;
  students: Observable<Student[]>;
  form: FormGroup;
  displayedColumns = ['name', 'average', 'actions'];

  constructor(
    private classesService: ClassesService,
    private stundentsService: StundentsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {

    this.classes = this.classesService.list()
    .pipe(
      catchError(error => {
        this.onError(error.message);
        return of([])
      })
    );

    this.students = of([]);

    this.form = this.formBuilder.group({
      class: [null]
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

  ngOnInit(): void {
  }

  onAddClass() {
    this.router.navigate(['new-class'], {relativeTo: this.route});
  }

  onAddTask() {
    if (!this.form.value.class) {
      this.onError("Por favor selecione uma turma!");
      return;
    }

    this.router.navigate(['task', this.form.value.class], {relativeTo: this.route});
  }

  listStudents() {
    this.students = this.stundentsService.list(this.form.value.class)
    .pipe(
      catchError(error => {
        this.onError(error.message);
        return of([])
      })
    );
  }

  onAddStudent() {
    if (!this.form.value.class) {
      this.onError("Por favor selecione uma turma!");
      return;
    }

    this.router.navigate(['new-student', this.form.value.class], {relativeTo: this.route});
  }

  onEditStudent(id: Number) {
    this.router.navigate(['edit-student', id], {relativeTo: this.route});
  }


  onDeleteStudent(id: Number) {
    this.stundentsService.delete(id).subscribe(res => {
      this.onSuccess('Aluno excluido com sucesso!');
      this.listStudents();
    });
  }

  showGrades(studentId: Number) {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: '60%',
      data: studentId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listStudents();
    });
  }

}
