export interface ICryptoCompareProvider {
  getCoinList(): Promise<any>;
  getDetailsCoin(coinsName: string): Promise<any>;
}
