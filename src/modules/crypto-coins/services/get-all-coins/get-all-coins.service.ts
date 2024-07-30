import { Inject, Injectable } from '@nestjs/common';
import {
  Coin,
  ICryptoCompareProvider,
} from '../../providers/crypto-compare/ICryptoCompareProvider';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';

@Injectable()
export class GetAllCoinsService {
  constructor(
    @Inject(ProvidersEnum.CryptoCompareProvider)
    private readonly cryptoCompareProvider: ICryptoCompareProvider,
  ) {}

  async execute(): Promise<Array<Coin>> {
    try {
      const allCoinsList = await this.cryptoCompareProvider.getCoinsList();

      return allCoinsList;
    } catch (error) {
      throw new Error(error);
    }
  }
}
