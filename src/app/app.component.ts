import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, async, map } from 'rxjs';
import {
  ChangeBaseValue,
  ChangeToValue,
  BaseValueSelector,
  ToValueSelector,
  ChangeExRate,
} from './reducers/exchange.reducer';
import { DataService } from './services/data.service';
import { IData } from './reducers/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: IData[] = []; //тут данные после запроса
  entires: any; // тут массив для парсинга в FromBase
  FromBase: any; // для вывода курсов в шапке
  exchangeCurencies: any = []; //валюты для обмена все кроме BTC
  exRate: any;
  findBase: any;
  findToBase: any;
  giveCur = 'Отдаю';
  getCur = 'Получаю';

  BaseValue$ = this.store.select(BaseValueSelector);
  BaseValue: string = '';
  BaseValueFromObs: any = this.BaseValue$.subscribe((val) => {
    this.BaseValue = val;
  });
  ToValue$ = this.store.select(ToValueSelector);
  ToValue: string = '';
  ToValueFromObs: any = this.ToValue$.subscribe((val) => {
    this.ToValue = val;
  });

  ChangeBaseValue(newValue: any) {
    console.log(newValue);
    this.store.dispatch(ChangeBaseValue({ value: newValue }));
  }

  ChangeToValue(newValue: any) {
    console.log(newValue);
    this.store.dispatch(ChangeToValue({ value: newValue }));
  }

  calcExRate(data: any, baseCur: any, toCur: any) {
    this.findBase = data.find((e: any) => {
      if (e.ccy === baseCur) {
        return e;
      }
    });

    this.findToBase = data.find((e: any) => {
      if (e.ccy === toCur) {
        return e;
      }
    });
    if (this.findToBase == undefined) {
      this.findToBase = 1;
    } else {
      this.findToBase = this.findToBase.sale;
    }

    if (this.findBase == undefined) {
      this.findBase = 1;
    } else {
      this.findBase = this.findBase.sale;
    }
    this.exRate = this.findBase / this.findToBase;
    this.store.dispatch(ChangeExRate({ count: this.exRate }));
    console.log(
      this.exRate,
      this.findBase,
      this.findToBase,
      this.BaseValue,
      this.ToValue
    );
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe((data) => {
      this.data = data;
      this.entires = this.data.map((e) => {
        return [e.ccy, e.sale];
      });
      this.entires.push(['UAH', '1']);
      this.FromBase = Object.fromEntries(this.entires);
      this.exchangeCurencies = Object.keys(this.FromBase).filter((e: any) => {
        if (e !== 'BTC') {
          return e;
        }
      });
      this.calcExRate(this.data, this.BaseValue, this.ToValue);
    });
  }

  constructor(private dataService: DataService, private store: Store) {}
}
