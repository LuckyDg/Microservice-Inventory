import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [InventoryModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
