import { Input, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  BaseValueSelector,
  ToValueSelector,
} from '../reducers/exchange.reducer';
@Component({
  selector: 'app-currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.css'],
  interpolation: ['{{', '}}'],
})
export class CurrencyRowComponent implements OnInit {
  @Input() title: string = '';
  @Input() cur: any;
  @Input() exchangeCurencies: any = [];
  @Input() calcExRate: any;
  @Input() data: any;
  @Input() baseCur: any;
  @Input() toCur: any;
  @Input() change: any;
  @Input() exRate: any;
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
  ngOnInit(): void {
    console.log(this.exchangeCurencies, this.cur);
  }
  constructor(private store: Store) {}
}
