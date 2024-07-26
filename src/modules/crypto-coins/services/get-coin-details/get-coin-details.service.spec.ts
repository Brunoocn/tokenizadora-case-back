import { Test, TestingModule } from '@nestjs/testing';
import { GetCoinDetailsService } from './get-coin-details.service';

describe('GetCoinDetailsService', () => {
  let service: GetCoinDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCoinDetailsService],
    }).compile();

    service = module.get<GetCoinDetailsService>(GetCoinDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
