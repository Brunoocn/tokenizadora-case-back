export interface ICryptoCompareProvider {
  getCoinsList(): Promise<Array<Coin>>;
  getDetailsCoins(cryptoCoins: string): Promise<Array<DetailedCoin>>;
  getCoinDailyPriceVariety(
    cryptoCoinsNames: string,
  ): Promise<IGetCoinDailyPriceVariety>;
}

export interface IGetCoinDailyPriceVariety {
  actualPrice: number;
  variety: string;
}

export type DetailedCoin = {
  name: string;
  fullName: string;
  imageUrl: string;
};

export type Coin = {
  id: string;
  name: string;
};

export type CryptoCurrency = {
  id: string;
  symbol: string;
};

export interface IObjectCoins {
  [key: string]: CryptoCurrency;
}
