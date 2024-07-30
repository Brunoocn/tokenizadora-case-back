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
  cryptoCoinName: string;
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
  Id: string;
  ImageUrl: string;
  Symbol: string;
  FullName: string;
};

export interface IObjectCoins {
  [key: string]: CryptoCurrency;
}
