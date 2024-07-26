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

  it('should return a list of all coins', async () => {
    const result = await service.execute();

    expect(result).toBeDefined();
  });

  it('should throw an error if something goes wrong', async () => {
    jest.spyOn(service, 'execute').mockRejectedValue(new Error());

    await expect(service.execute()).rejects.toThrowError();
  });
});
