import { HttpException, Injectable } from '@nestjs/common';
import { ICryptoCompareProvider } from '../ICryptoCompareProvider';
import axios, { Axios } from 'axios';

@Injectable()
export class CryptoCompareProvider implements ICryptoCompareProvider {
  private cryptoCompareApi: Axios;

  constructor() {
    this.cryptoCompareApi = axios.create({
      baseURL: process.env.API_CRYPTO_COMPARE,
      headers: {
        authorization: `Apikey ${process.env.APIKEY_CRYPTO_COMPARE}`,
      },
    });
  }
  async getCoinList(): Promise<any> {
    try {
      const params = {
        summary: true,
      };

      const { data } = await this.cryptoCompareApi.get(`/all/coinlist`, {
        params,
      });

      return data;
    } catch (err) {
      console.log('Error:', err); //debugger
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  async getDetailsCoin(coinsNames: string): Promise<any> {
    const TYPE_CURRENCY = 'USD';
    try {
      const params = {
        fsyms: coinsNames,
        tsym: TYPE_CURRENCY,
      };

      const { data } = await this.cryptoCompareApi.get(`/coin/generalinfo`, {
        params,
      });

      return data;
    } catch (err) {
      console.log('Error:', err); //debugger
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }
}
