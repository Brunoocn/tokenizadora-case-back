import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { CryptoCoinsModule } from './modules/crypto-coins/crypto-coins.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CryptoCoinsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
