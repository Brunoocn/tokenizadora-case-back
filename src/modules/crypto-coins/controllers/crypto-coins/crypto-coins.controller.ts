import { Controller, Get, Query } from '@nestjs/common';
import { GetAllCoinsService } from '../../services/get-all-coins/get-all-coins.service';
import { GetCoinDetailsService } from '../../services/get-coin-details/get-coin-details.service';

@Controller('crypto-coins')
export class CryptoCoinsController {
  constructor(
    private getAllCoinsService: GetAllCoinsService,
    private getDetailedCoinsService: GetCoinDetailsService,
  ) {}

  @Get('/list-coins')
  async loginUser(): Promise<any> {
    return this.getAllCoinsService.execute();
  }

  @Get('/get-coins-details')
  async getCoinsDetails(@Query() query: { coins: string }): Promise<any> {
    return this.getDetailedCoinsService.execute(query.coins);
  }
}
