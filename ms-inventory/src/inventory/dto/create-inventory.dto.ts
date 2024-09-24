import { IsString, IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateInventoryItemDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsPositive()
    unitPrice: number;

    @IsString()
    category: string;

    @IsString()
    status: string;

    @IsUUID()
    supplierId: string;
}