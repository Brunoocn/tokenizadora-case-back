import { Inject, Injectable } from '@nestjs/common';
import { ICryptoCompareProvider } from '../../providers/crypto-compare/ICryptoCompareProvider';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';

@Injectable()
export class GetAllCoinsService {
  constructor(
    @Inject(ProvidersEnum.CryptoCompareProvider)
    private readonly cryptoCompareProvider: ICryptoCompareProvider,
  ) {}

  async execute() {
    try {
      const allCoinsList = await this.cryptoCompareProvider.getCoinList();

      return allCoinsList.Data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
