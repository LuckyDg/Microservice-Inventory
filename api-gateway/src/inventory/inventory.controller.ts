import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { INVENTORY_SERVICE } from 'src/config';
import { CreateInventoryItemDto } from './dtos/create-inventory.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(@Inject(INVENTORY_SERVICE) private readonly inventoryClient: ClientProxy) { }

  @Post('create')
  create(@Body() createInventoryItemDto: CreateInventoryItemDto) {
    return this.inventoryClient.send({ cmd: 'create_inventory_item' }, createInventoryItemDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }
      ));
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.inventoryClient.send({ cmd: 'find_all_inventory_items' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }));

  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.inventoryClient.send({ cmd: 'find_inventory_item' }, { uuid: id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryClient.send({ cmd: 'update_inventory_item' }, { uuid: id, updateInventoryDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Delete(':uuid')
  delete(@Param('uuid') id: string) {
    return this.inventoryClient.send({ cmd: 'delete_inventory_item' }, { uuid: id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }));

  }
}
