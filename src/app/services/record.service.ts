import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Record, RecordForm } from '../model/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  saveRecord(record:Record):Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'record/save', record);
  }

  deleteRecord(id:number): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'record/delete', id);
  }

  findRecords(recordFrom: RecordForm): Observable<Record[]> {
    return this.http.post<Record[]>(environment.apiUrl + 'record/findRecords', recordFrom);
  }

}
