import { IsString, IsInt, IsUUID, IsPositive, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class InventoryItem {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsPositive()
    unitPrice: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    status: string;

    //   suplier: string;

    @IsUUID()
    supplierId: string;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsDate()
    @Type(() => Date)
    updatedAt: Date;
}
