import { Injectable } from '@nestjs/common';
import { ICryptoCompareProvider } from '../ICryptoCompareProvider';

@Injectable()
export class CryptoCompareProvider implements ICryptoCompareProvider {
  async getCoinList(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
