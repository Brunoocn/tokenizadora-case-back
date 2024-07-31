import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { GetCoinDetailsService } from './get-coin-details.service';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';
import {
  DetailedCoin,
  ICryptoCompareProvider,
  IGetCoinDailyPriceVariety,
} from '../../providers/crypto-compare/ICryptoCompareProvider';

describe('GetCoinDetailsService', () => {
  let getCoinDetailsService: GetCoinDetailsService;
  let cryptoCompareProvider: ICryptoCompareProvider;

  beforeEach(async () => {
    const cryptoCompareProviderMock = {
      getDetailsCoins: vi.fn(),
      getCoinDailyPriceVariety: vi.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetCoinDetailsService,
        {
          provide: ProvidersEnum.CryptoCompareProvider,
          useValue: cryptoCompareProviderMock,
        },
      ],
    }).compile();

    getCoinDetailsService = moduleRef.get<GetCoinDetailsService>(
      GetCoinDetailsService,
    );
    cryptoCompareProvider = moduleRef.get<ICryptoCompareProvider>(
      ProvidersEnum.CryptoCompareProvider,
    );
  });

  describe('execute', () => {
    it('should return coin details with historical prices', async () => {
      const cryptoCoinsNames = 'BTC,ETH';

      const coinDetailsMock: DetailedCoin[] = [
        {
          name: 'BTC',
          fullName: 'Bitcoin',
          imageUrl: 'http://example.com/btc.png',
        },
        {
          name: 'ETH',
          fullName: 'Ethereum',
          imageUrl: 'http://example.com/eth.png',
        },
      ];

      const coinDailyPriceVarietyMock: IGetCoinDailyPriceVariety[] = [
        { actualPrice: 10000, variety: '5.00' },
        { actualPrice: 2000, variety: '3.00' },
      ];

      vi.spyOn(cryptoCompareProvider, 'getDetailsCoins').mockResolvedValue(
        coinDetailsMock,
      );
      vi.spyOn(
        cryptoCompareProvider,
        'getCoinDailyPriceVariety',
      ).mockImplementation((coin) => {
        return coin === 'BTC'
          ? Promise.resolve(coinDailyPriceVarietyMock[0])
          : Promise.resolve(coinDailyPriceVarietyMock[1]);
      });

      const result = await getCoinDetailsService.execute(cryptoCoinsNames);

      expect(result).toEqual([
        {
          name: 'BTC',
          fullName: 'Bitcoin',
          imageUrl: 'http://example.com/btc.png',
          price: { actualPrice: 10000, variety: '5.00' },
        },
        {
          name: 'ETH',
          fullName: 'Ethereum',
          imageUrl: 'http://example.com/eth.png',
          price: { actualPrice: 2000, variety: '3.00' },
        },
      ]);
    });

    it('should throw an error if the provider throws an error', async () => {
      const cryptoCoinsNames = 'BTC,ETH';
      const errorMessage = 'Provider error';

      vi.spyOn(cryptoCompareProvider, 'getDetailsCoins').mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(
        getCoinDetailsService.execute(cryptoCoinsNames),
      ).rejects.toThrow(Error);
      
    });
  });
});
