import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Portfolio, PortfolioSchema } from './models/portfolio.model';
import { PortfolioRepository } from './repos/portfolio.repository';
import { PortfolioCommands } from './portfolio.commands';
import { PortfolioQueries } from './portfolio.queries';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])],
  providers: [PortfolioRepository, PortfolioService],
  controllers: [PortfolioCommands, PortfolioQueries],
})
export class PortfolioModule {}