import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAllCoinsService } from '../../services/get-all-coins/get-all-coins.service';

import {
  ICryptoCompareProvider,
  Coin,
} from '../../providers/crypto-compare/ICryptoCompareProvider';
import { ProvidersEnum } from 'src/shared/generic-enums/providers_enum';

describe('GetAllCoinsService', () => {
  let getAllCoinsService: GetAllCoinsService;
  let cryptoCompareProvider: ICryptoCompareProvider;

  beforeEach(async () => {
    const cryptoCompareProviderMock = {
      getCoinsList: vi.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllCoinsService,
        {
          provide: ProvidersEnum.CryptoCompareProvider,
          useValue: cryptoCompareProviderMock,
        },
      ],
    }).compile();

    getAllCoinsService = moduleRef.get<GetAllCoinsService>(GetAllCoinsService);
    cryptoCompareProvider = moduleRef.get<ICryptoCompareProvider>(
      ProvidersEnum.CryptoCompareProvider,
    );
  });

  describe('execute', () => {
    it('should return a list of coins', async () => {
      const coinsList: Coin[] = [
        { id: '1', name: 'Bitcoin' },
        { id: '2', name: 'Ethereum' },
      ];

      vi.spyOn(cryptoCompareProvider, 'getCoinsList').mockResolvedValue(
        coinsList,
      );

      const result = await getAllCoinsService.execute();

      expect(result).toEqual(coinsList);
    });

    it('should throw an error if the provider throws an error', async () => {
      const errorMessage = 'Provider error';
      vi.spyOn(cryptoCompareProvider, 'getCoinsList').mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(getAllCoinsService.execute()).rejects.toThrow(Error);
      await expect(getAllCoinsService.execute()).rejects.toThrow(errorMessage);
    });
  });
});
