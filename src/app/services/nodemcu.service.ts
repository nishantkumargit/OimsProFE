import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NodeMCU } from '../node-mcu/nodemcu';

@Injectable({
  providedIn: 'root'
})
export class NodeMCUService {

  apiUrlNodeMcu: string;

  constructor(private http: HttpClient) {
    this.apiUrlNodeMcu = 'http://localhost:8080/part';
  }

    postData(data: NodeMCU): Observable<any> {
      return this.http.post<any>(this.apiUrlNodeMcu, data);
    }

    getNodeMcusData(): Observable<NodeMCU[]> {
      return this.http.get<NodeMCU[]>(`${this.apiUrlNodeMcu}`);
    }

    deleteNodeMcu(data: any): Observable<void> {
      return this.http.delete<void>(`${this.apiUrlNodeMcu}/${data}`);
    }

    getPartsWithOrdersData() {
        return [];
    }

};
