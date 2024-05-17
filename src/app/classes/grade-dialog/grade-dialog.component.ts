import { Observable } from 'rxjs';
import { Grade } from './../model/grade';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GradeService } from '../services/grade.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.scss']
})
export class GradeDialogComponent implements OnInit {

  grades: Grade[] = [];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public studentId: Number,
    private gradeService: GradeService,
    private formBuilder: FormBuilder,
  ) {
      this.form = this.formBuilder.group({});

      this.gradeService.list(this.studentId).subscribe(res => {
        this.grades = res;
        this.createForm();
      });
    }

  ngOnInit(): void {
  }

  createForm() {
    let columns: any = {};

    this.grades.forEach(grade => {
      columns['field-' + grade.id.toString()] = grade.grade;
    });

    this.form = this.formBuilder.group(columns);
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onUpdate(id: Number) {
    let data: any = {
      grade: this.form.value['field-' + id]
    };

    this.gradeService.update(data, id);
  }

}
