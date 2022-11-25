import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormComponent } from '../record-form/record-form.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Record, RecordForm } from '../model/record';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css'],
})
export class FrontIndexComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  records: Record[] = [];
  total:number=0;
  hideMenu:boolean=true;
  categoryArray: string[] =[];
  options: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.findRecords();
    this.formGroup.valueChanges.subscribe(
      value => {
        this.hideMenu=true;
        this.findRecords();
        }
    )
  }

  openRecordForm() {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      width: '80rem',
      height: '30rem',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.findRecords();
    });
  }

  editRecord(record: Record) {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      width: '80rem',
      height: '30rem',
      data: record,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.findRecords();
    });
  }

  copyRecord(record: Record) {
    let recordWrapper: Record = {
      id: -1,
      category: record.category,
      recordTime: record.recordTime,
      item: record.item,
      price: record.price,
      unit: record.unit,
      count: record.count,
      ps: record.ps,
    };

    const dialogRef = this.dialog.open(RecordFormComponent, {
      width: '80rem',
      height: '30rem',
      data: recordWrapper,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.findRecords();
    });
  }

  deleteRecord(id: number) {
    Swal.fire({
      title: '<strong>刪除此筆紀錄?</strong>',
      icon: 'info',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.recordService.deleteRecord(id).subscribe((res) => {
          if (res) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 800,
            });
            this.findRecords();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      }
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      filterKey: [],
      category: ['all'],
      startTime: [],
      endTime: [],
      item: ['all'],
    });
  }

  findRecords() {
    this.recordService.findRecords(this.formGroup.value).subscribe((res) => {
      if (res && res.length) {
        this.records = res;
        this.calcReords(res);
        this.setOption();
      }
    });
  }

  wrapperDate(recordTime: number) {
    let str = recordTime.toString();
    return (
      str.substring(0, 3) + '/' + str.substring(3, 5) + '/' + str.substring(5)
    );
  }

  calcReords(records: Record[]){
    let total = 0;
    let categoryArray:string[] = [];

    let groupObj = {
      groupCategory : '',
      groupTotal:0
    }
    groupObj.groupCategory = records[0].category;

    records.forEach(function(record) {
      total = total + (record.price*record.count)
      if (!categoryArray.includes(record.category)) {
        categoryArray.push(record.category)
      }
    })

    this.categoryArray = categoryArray;
    this.total = total;
  }

  groupByKey(items: any[]) {
    let rtnArray: any[] = [];
    items.forEach(function (value) {
      let total = 0;
      value.dataArray.forEach(function (data: any) {
        total = total + data.price* data.count;
      })
      let obj = {
        total: total,
        category: value.key
      }
      rtnArray.push(obj)
    })


    return rtnArray;
  }

  splitItmGroupByKey(items: any[], key: string, type?: string) {
    let rtnObj: any = {};
    items.forEach(item => {
      if (!rtnObj[item[key]]) {
        rtnObj[item[key]] = [];
      }
      rtnObj[item[key]].push(item);
    });

    if (type == 'obj') {
      return rtnObj;
    }

    let rtnArray: any[] = [];

    Object.keys(rtnObj).forEach(key => {
      let data: any = {
        key: key,
        dataArray: rtnObj[key]
      }
      rtnArray.push(data);
    });

    return rtnArray;
  }

  changeShowMenu() {
    this.hideMenu = !this.hideMenu;
  }

  setOption() {
    let data: { value: number; name: string; }[] = [];
    this.groupByKey(this.splitItmGroupByKey(this.records, 'category')).forEach((record) => {
      data.push({
        value: record.total,
        name: record.category
      });
    });

    if (data.length == 1) {
      data = [];
      this.groupByKey(this.splitItmGroupByKey(this.records, 'item')).forEach((record) => {
        data.push({
          value: record.total,
          name: record.category
        });
      })
    }

    this.options = {
      legend: {
        x: 'left',
        y: 'top'
      },
      tooltip: {},
      series: [
        {
          name: 'composition',
          type: 'pie',
          radius: '75%',
          center: ['35%', '50%'],
          data: data,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              label: {
                show: true,
                formatter: '{b} : {d}%',
                distance: 0.7
              }
            }
          }
        }
      ]
    }
  }
  
}
