import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @MessagePattern({ cmd: 'create_inventory_item' })
  async create(@Payload() createInventoryItemDto: CreateInventoryItemDto) {
    return await this.inventoryService.create(createInventoryItemDto);
  }

  @MessagePattern({ cmd: 'find_all_inventory_items' })
  async findAll(@Payload() paginationDto: PaginationDto) {
    return await this.inventoryService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_inventory_item' })
  async findOne(@Payload('uuid', new ParseUUIDPipe()) id: string) {
    return await this.inventoryService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_inventory_item' })
  async update(@Payload() data: { uuid: string, updateInventoryDto: UpdateInventoryDto }) {
    const { uuid, updateInventoryDto } = data;
    return await this.inventoryService.update(uuid, updateInventoryDto);
  }

  @MessagePattern({ cmd: 'delete_inventory_item' })
  async delete(@Payload('uuid', new ParseUUIDPipe()) id: string) {
    return await this.inventoryService.delete(id);
  }

}
