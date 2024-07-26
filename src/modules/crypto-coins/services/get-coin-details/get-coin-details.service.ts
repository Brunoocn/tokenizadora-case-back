import { Inject, Injectable } from '@nestjs/common';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';
import { ICryptoCompareProvider } from '../../providers/crypto-compare/ICryptoCompareProvider';

@Injectable()
export class GetCoinDetailsService {
  constructor(
    @Inject(ProvidersEnum.CryptoCompareProvider)
    private readonly cryptoCompareProvider: ICryptoCompareProvider,
  ) {}

  async execute(coinsNames: string) {
    try {
      const coinsDetails = await this.cryptoCompareProvider.getDetailsCoin(
        coinsNames,
      );

      return coinsDetails;
    } catch (error) {
      throw new Error(error);
    }
  }
}
