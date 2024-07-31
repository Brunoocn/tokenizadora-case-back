import { Inject, Injectable } from '@nestjs/common';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';
import { ICryptoCompareProvider } from '../../providers/crypto-compare/ICryptoCompareProvider';

@Injectable()
export class GetCoinDetailsService {
  constructor(
    @Inject(ProvidersEnum.CryptoCompareProvider)
    private readonly cryptoCompareProvider: ICryptoCompareProvider,
  ) {}

  async execute(cryptoCoinsNames: string) {
    try {
      const coinsDetails = await this.cryptoCompareProvider.getDetailsCoins(
        cryptoCoinsNames,
      );

      const coinsHistoryPricesPromises = cryptoCoinsNames
        .split(',')
        .map(async (coin) =>
          this.cryptoCompareProvider.getCoinDailyPriceVariety(coin),
        );
      const coinsHistoryPrices = await Promise.all(coinsHistoryPricesPromises);

      return coinsDetails.map((coin, index) => {
        return {
          name: coin.name,
          fullName: coin.fullName,
          imageUrl: coin.imageUrl,
          price: coinsHistoryPrices[index],
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
