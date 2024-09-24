import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, INVENTORY_SERVICE } from 'src/config';

@Module({
  controllers: [SeedController],
  imports: [
    ClientsModule.register([
      {
        name: INVENTORY_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.inventoryMicroserviceHost,
          port: envs.inventoryMicroservicePort,
        },
      },
    ]),
  ],
  providers: [],
})
export class SeedModule { }
