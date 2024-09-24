import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INVENTORY_SERVICE } from 'src/config';

@Controller('seed')
export class SeedController {
  constructor(@Inject(INVENTORY_SERVICE) private readonly seedClient: ClientProxy) { }

  @Get()
  seed() {
    return this.seedClient.send({ cmd: 'seed' }, {});
  }
}
