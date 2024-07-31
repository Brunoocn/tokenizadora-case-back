import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { GetAllCoinsService } from '../../services/get-all-coins/get-all-coins.service';
import { GetCoinDetailsService } from '../../services/get-coin-details/get-coin-details.service';
import { vi } from 'vitest';
import { PrismaService } from 'src/config/database/prisma.service';
import { hash } from 'bcrypt';

describe('CryptoCoinsController (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      });

    jwtToken = response.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /crypto-coins/list-coins', async () => {
    const getAllCoinsService = app.get(GetAllCoinsService);
    const coinsMock = [
      { id: '1', name: 'Bitcoin' },
      { id: '2', name: 'Ethereum' },
    ];

    vi.spyOn(getAllCoinsService, 'execute').mockResolvedValue(coinsMock);

    const response = await request(app.getHttpServer())
      .get('/crypto-coins/list-coins')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body).toEqual(coinsMock);
  });

  it('[GET] /crypto-coins/get-coins-details', async () => {
    const getCoinDetailsService = app.get(GetCoinDetailsService);
    const coinsDetailsMock = [
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
    ];

    vi.spyOn(getCoinDetailsService, 'execute').mockResolvedValue(
      coinsDetailsMock,
    );

    const response = await request(app.getHttpServer())
      .get('/crypto-coins/get-coins-details')
      .query({ cryptoCoinsNames: 'BTC,ETH' })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body).toEqual(coinsDetailsMock);
  });
});
