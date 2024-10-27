import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Machines } from '../machines/machines';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  apiUrlMachine: string;

  constructor(private http: HttpClient) {
    this.apiUrlMachine = '/api/machine';
  }

  postData(data: Machines): Observable<any> {
    return this.http.post<any>(this.apiUrlMachine, data);
  }

  getMachinesData(): Observable<Machines[]> {
    return this.http.get<Machines[]>(`${this.apiUrlMachine}`);
  }

  deleteMachine(data: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlMachine}/${data}`);
  }

}
