export interface IData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export interface IExchange {
  rates: Array<IData>;
  base: string;
  to: string;
  fromBase: Object;
  exRate: number;
}
