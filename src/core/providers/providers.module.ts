import { Module } from '@nestjs/common';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';
import { CryptoCompareProvider } from './crypto-compare/implementations/CryptoCompareProvider';


@Module({
  providers: [
    {
      provide: ProvidersEnum.CryptoCompareProvider,
      useClass: CryptoCompareProvider,
    },
  ],
  exports: [
    {
      provide: ProvidersEnum.CryptoCompareProvider,
      useClass: CryptoCompareProvider,
    },
  ],
})
export class ProvidersModule {}
