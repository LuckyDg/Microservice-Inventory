import { Controller } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @MessagePattern({ cmd: 'seed' })
  async seed() {
    return await this.seedService.seed();
  }
}
