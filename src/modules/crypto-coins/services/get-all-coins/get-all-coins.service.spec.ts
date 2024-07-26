import { Test, TestingModule } from '@nestjs/testing';
import { GetAllCoinsService } from './get-all-coins.service';

describe('GetAllCoinsService', () => {
  let service: GetAllCoinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllCoinsService],
    }).compile();

    service = module.get<GetAllCoinsService>(GetAllCoinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
