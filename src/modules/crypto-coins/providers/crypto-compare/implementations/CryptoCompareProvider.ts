import { HttpException, Injectable } from '@nestjs/common';
import { ICryptoCompareProvider } from '../ICryptoCompareProvider';
import axios, { Axios } from 'axios';

@Injectable()
export class CryptoCompareProvider implements ICryptoCompareProvider {
  private cryptoCompareApi: Axios;
  private TYPE_CURRENCY = 'USD';

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
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  async getDetailsCoins(cryptoCoins: string): Promise<any> {
    try {
      const params = {
        fsyms: cryptoCoins,
        tsym: this.TYPE_CURRENCY,
      };

      const data = await this.cryptoCompareApi.get(`/coin/generalinfo`, {
        params,
      });

      return data.data.Data.map(({ CoinInfo }) => {
        return {
          name: CoinInfo.Name,
          fullName: CoinInfo.FullName,
          imageUrl: CoinInfo.ImageUrl,
        };
      });
    } catch (err) {
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  async getCoinDailyPriceVariety(
    cryptoCoinName: string,
    limit: number = 1,
  ): Promise<any> {
    try {
      const params = {
        fsym: cryptoCoinName,
        tsym: this.TYPE_CURRENCY,
        limit,
      };

      const data = await this.cryptoCompareApi.get(`/histoday`, {
        params,
      });
      const actualPrice = data.data.Data[0].close;
      const price24hAgo = data.data.Data[1].close;
      const variety = this.calculateVariety(actualPrice, price24hAgo);
      return {
        actualPrice,
        variety,
        cryptoCoinName,
      };
    } catch (err) {
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  private calculateVariety(actualPrice: number, price24hAgo: number): number {
    return ((actualPrice - price24hAgo) / price24hAgo) * 100;
  }
}
