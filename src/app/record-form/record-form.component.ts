import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Record } from '../model/record';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
})
export class RecordFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<RecordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public record: Record,
    private formBuilder: FormBuilder,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.record.id ? this.record.id : ''],
      category: [
        this.record.category ? this.record.category : '',
        Validators.required,
      ],
      recordTime: [
        this.record.recordTime ? this.record.recordTime : '',
        Validators.required,
      ],
      item: [this.record.item ? this.record.item : '', Validators.required],
      price: [this.record.price ? this.record.price : '', Validators.required],
      unit: [this.record.unit ? this.record.unit : ''],
      count: [this.record.count ? this.record.count : '', Validators.required],
      ps: [this.record.ps ? this.record.ps : ''],
    });
  }

  saveRecord(formGroup: FormGroup): void {
    this.recordService.saveRecord(formGroup.value).subscribe((res) => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 800,
        });
        this.dialogRef.close();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }

  isUnValid(control: string) {
    return (
      this.formGroup.controls[control].invalid &&
      (this.formGroup.controls[control].dirty ||
        this.formGroup.controls[control].touched)
    );
  }
}
