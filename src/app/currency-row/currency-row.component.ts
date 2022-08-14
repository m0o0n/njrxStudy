import { Input, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  BaseInputValueSelector,
  BaseValueSelector,
  ExRateSelector,
  FromInTogleSelector,
  ToInputValueSelector,
  ToValueSelector,
  AmountSelector,
  ChangeBaseValue,
  ChangeToValue,
  ChangeBaseInputValue,
  ChangeToInputValue,
} from '../reducers/exchange.reducer';
@Component({
  selector: 'app-currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.css'],
  interpolation: ['{{', '}}'],
})
export class CurrencyRowComponent implements OnInit {
  @Input() exchangeCurencies: any = [];
  @Input() calcExRate: any;
  @Input() data: any;
  @Input() exRate: any;

  baseInpVal: any = 0;
  toInpVal: any = 0;

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

  BaseInputValue$ = this.store.select(BaseInputValueSelector);
  BaseInputValue: number = 1;
  BaseInputValueFromObs: any = this.BaseInputValue$.subscribe((val) => {
    this.BaseInputValue = val;
  });
  ToInputValue$ = this.store.select(ToInputValueSelector);
  ToInputValue: number = 1;
  ToInputValueFromObs: any = this.ToInputValue$.subscribe((val) => {
    this.ToInputValue = val;
  });
  FromInTogle$ = this.store.select(FromInTogleSelector);
  FromInTogle: boolean = true;
  FromInTogleFromObs: any = this.FromInTogle$.subscribe((val) => {
    this.FromInTogle = val;
  });
  ExRate$ = this.store.select(ExRateSelector);
  ExRate: number = 1;
  ExRateFromObs: any = this.ExRate$.subscribe((val) => {
    this.ExRate = val;
  });

  Amount$ = this.store.select(AmountSelector);
  Amount: number = 1;
  AmountFromObs: any = this.Amount$.subscribe((val) => {
    this.Amount = val;
  });

  ChangeBaseValue(newValue: any) {
    this.calcExRate(this.data, this.BaseValue, this.ToValue);
    this.store.dispatch(ChangeBaseValue({ value: newValue }));
    this.toInpVal = (this.Amount * this.exRate).toFixed(2);
    this.baseInpVal = this.Amount;
  }

  ChangeToValue(newValue: any) {
    this.calcExRate(this.data, this.BaseValue, this.ToValue);
    this.store.dispatch(ChangeToValue({ value: newValue }));
    this.toInpVal = this.Amount;
    this.baseInpVal = (this.Amount / this.exRate).toFixed(2);
  }

  ChangeBaseInputValue(newValue: any) {
    this.store.dispatch(ChangeBaseInputValue({ count: newValue.target.value }));
    this.toInpVal = (newValue.target.value * this.ExRate).toFixed(2);
    this.baseInpVal = newValue.target.value;
  }
  ChangeToInputValue(newValue: any) {
    this.store.dispatch(ChangeToInputValue({ count: newValue.target.value }));
    this.toInpVal = newValue.target.value;
    this.baseInpVal = (newValue.target.value / this.ExRate).toFixed(2);
  }

  ngOnInit(): void {}
  constructor(private store: Store) {}
}
