export interface ICryptoCompareProvider {
  getCoinList(): Promise<any>;
  getDetailsCoins(cryptoCoins: string): Promise<any>;
  getCoinDailyPriceVariety(cryptoCoinsNames: string): Promise<any>;
}
