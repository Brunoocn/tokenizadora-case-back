import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { CryptoCoinsModule } from './modules/crypto-coins/crypto-coins.module';
import { JwtAuthGuard } from './common/jwtGuard/jwt-auth.guard';
import { JwtStrategy } from './common/jwtGuard/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CryptoCoinsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    PrismaService,
  ],
})
export class AppModule {}
