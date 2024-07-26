import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCoinsController } from './crypto-coins.controller';

describe('CryptoCoinsController', () => {
  let controller: CryptoCoinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoCoinsController],
    }).compile();

    controller = module.get<CryptoCoinsController>(CryptoCoinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
