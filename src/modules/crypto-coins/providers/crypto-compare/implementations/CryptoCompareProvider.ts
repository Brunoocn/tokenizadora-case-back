import { HttpException, Injectable } from '@nestjs/common';
import {
  Coin,
  DetailedCoin,
  ICryptoCompareProvider,
  IGetCoinDailyPriceVariety,
  IObjectCoins,
} from '../ICryptoCompareProvider';
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
  async getCoinsList(): Promise<Array<Coin>> {
    try {
      const params = {
        summary: true,
      };

      const { data } = await this.cryptoCompareApi.get(`/all/coinlist`, {
        params,
      });

      return this.formatObjectCoinstToListCoins(data.Data);
    } catch (err) {
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  async getDetailsCoins(cryptoCoins: string): Promise<Array<DetailedCoin>> {
    try {
      const params = {
        fsyms: cryptoCoins,
        tsym: this.TYPE_CURRENCY,
      };

      const {
        data: { Data },
      } = await this.cryptoCompareApi.get(`/coin/generalinfo`, {
        params,
      });

      return this.formatPayloadDetailsCoins(Data);
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
  ): Promise<IGetCoinDailyPriceVariety> {
    try {
      const params = {
        fsym: cryptoCoinName,
        tsym: this.TYPE_CURRENCY,
        limit,
      };

      const {
        data: { Data },
      } = await this.cryptoCompareApi.get(`/histoday`, {
        params,
      });
      const actualPrice = Data[0].close;
      const price24hAgo = Data[1].close;
      const variety = this.calculateVariety(actualPrice, price24hAgo);
      return {
        actualPrice,
        variety: variety.toFixed(2),
      };
    } catch (err) {
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new HttpException(err.message, err.code);
      }
      throw err;
    }
  }

  private formatPayloadDetailsCoins(
    data: Array<{
      CoinInfo: {
        Name: string;
        FullName: string;
        ImageUrl: string;
      };
    }>,
  ) {
    return data.map(({ CoinInfo }) => {
      return {
        name: CoinInfo.Name,
        fullName: CoinInfo.FullName,
        imageUrl: CoinInfo.ImageUrl,
      };
    });
  }

  private formatObjectCoinstToListCoins(objectCoins: IObjectCoins) {
    const result = Object.keys(objectCoins).map((key) => {
      return {
        id: objectCoins[key].Id,
        name: objectCoins[key].FullName,
      };
    });

    return result;
  }

  private calculateVariety(actualPrice: number, price24hAgo: number): number {
    return ((actualPrice - price24hAgo) / price24hAgo) * 100 * 100;
  }
}
