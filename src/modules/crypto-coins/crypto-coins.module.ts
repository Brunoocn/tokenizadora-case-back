import { Module } from '@nestjs/common';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';
import { CryptoCompareProvider } from './providers/crypto-compare/implementations/CryptoCompareProvider';
import { CryptoCoinsController } from './controllers/crypto-coins/crypto-coins.controller';
import { GetAllCoinsService } from './services/get-all-coins/get-all-coins.service';
import { GetCoinDetailsService } from './services/get-coin-details/get-coin-details.service';

@Module({
  imports: [],
  providers: [
    {
      provide: ProvidersEnum.CryptoCompareProvider,
      useClass: CryptoCompareProvider,
    },
    GetAllCoinsService,
    GetCoinDetailsService,
    
  ],
  exports: [
    {
      provide: ProvidersEnum.CryptoCompareProvider,
      useClass: CryptoCompareProvider,
    },
  ],
  controllers: [CryptoCoinsController],
})
export class CryptoCoinsModule {}
