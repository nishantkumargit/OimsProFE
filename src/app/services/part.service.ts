import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Part } from '../part/part';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  apiUrlPart: string;

  constructor(private http: HttpClient) {
    this.apiUrlPart = 'http://localhost:8080/part';
  }

    postData(data: Part): Observable<any> {
      return this.http.post<any>(this.apiUrlPart, data);
    }

    getPartsData(): Observable<Part[]> {
      return this.http.get<Part[]>(`${this.apiUrlPart}`);
    }

    deletePart(data: any): Observable<void> {
      return this.http.delete<void>(`${this.apiUrlPart}/${data}`);
    }

    getPartsWithOrdersData() {
        return [];
    }

    getParts() {
        return Promise.resolve(this.getPartsData());
    }

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getPartsWithOrdersData().slice(0, 10));
    }

    getProductsWithOrders() {
        return Promise.resolve(this.getPartsWithOrdersData());
    }

};
