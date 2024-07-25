import { Injectable } from '@nestjs/common';
import { ICryptoCompareProvider } from '../ICryptoCompareProvider';
import axios from 'axios';

@Injectable()
export class CryptoCompareProvider implements ICryptoCompareProvider {
  async getCoinList(): Promise<any> {
    try {
      const response = await axios.get(
        `${process.env.API_CRYPTO_COMPARE}/all/coinlist`,
        {
          headers: {
            authorization: `Apikey ${process.env.APIKEY_CRYPTO_COMPARE}`,
          },
        },
      );

      return response.data;
    } catch (err) {
      console.log('Error:', err);
      if (err.isAxiosError) {
        throw new Error(err.response.data);
      }
      throw new Error(err.message);
    }
  }
}
