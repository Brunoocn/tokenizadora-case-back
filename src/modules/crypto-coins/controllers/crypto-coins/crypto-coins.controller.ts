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
  async listCoins() {
    return this.getAllCoinsService.execute();
  }

  @Get('/get-coins-details')
  async getCoinsDetails(@Query() query: { cryptoCoinsNames: string }) {
    return this.getDetailedCoinsService.execute(query.cryptoCoinsNames);
  }
}
