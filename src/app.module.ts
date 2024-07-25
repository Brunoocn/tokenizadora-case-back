import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CoreModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
