import { PaginationDto } from './../common/dtos/pagination.dto';
import { Injectable } from '@nestjs/common';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createInventoryItemDto: CreateInventoryItemDto) {
    return await this.prisma.inventoryItem.create({
      data: createInventoryItemDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.prisma.inventoryItem.count();
    const lastPages = Math.ceil(totalPages / limit);

    return {
      items: await this.prisma.inventoryItem.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      total: totalPages,
      page: page,
      lastPages: lastPages,
    }
  }

  async findOne(id: string) {
    return await this.prisma.inventoryItem.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return await this.prisma.inventoryItem.update({
      where: {
        id,
      },
      data: updateInventoryDto,
    });
  }

  async delete(id: string) {
    const item = await this.prisma.inventoryItem.findUnique({
      where: {
        id,
      },
    });
    if (item.status === 'Available') {
      return await this.prisma.inventoryItem.update({
        where: {
          id,
        },
        data: {
          status: 'Removed',
        },
      });
    }
    return {
      message: `The item with id ${id} is already removed`,
    }
  }
}
