import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from './../reducers/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<IData[]> {
    return this.http.get<IData[]>(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    );
  }
}
