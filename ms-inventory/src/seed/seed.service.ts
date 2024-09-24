import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {
    constructor(private readonly prisma: PrismaService) { }

    async seed() {
        // Eliminacion en cascada de todos los registros
        await this.prisma.purchaseOrderItem.deleteMany();
        await this.prisma.purchaseOrder.deleteMany();
        await this.prisma.inventoryItem.deleteMany();
        await this.prisma.supplier.deleteMany();

        // Crear 10 suppliers
        const suppliers = await Promise.all(
            Array.from({ length: 10 }).map((_, i) =>
                this.prisma.supplier.create({
                    data: {
                        name: `Supplier ${i + 1}`,
                        contactInfo: `supplier${i + 1}@email.com`,
                    },
                })
            )
        );

        // Crear 10 inventory items para cada supplier
        const inventoryItems = await Promise.all(
            suppliers.map((supplier, i) =>
                this.prisma.inventoryItem.create({
                    data: {
                        name: `Item ${i + 1}`,
                        description: `Description for item ${i + 1}`,
                        quantity: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria
                        unitPrice: parseFloat((Math.random() * 100).toFixed(2)), // Precio aleatorio
                        category: `Category ${i + 1}`,
                        status: 'Available',
                        supplierId: supplier.id,
                    },
                })
            )
        );

        // Crear 10 purchase orders con items para cada supplier
        const purchaseOrders = await Promise.all(
            suppliers.map((supplier, i) =>
                this.prisma.purchaseOrder.create({
                    data: {
                        supplierId: supplier.id,
                        orderDate: new Date(),
                        status: 'Pending',
                        items: {
                            create: [
                                {
                                    inventoryItemId: inventoryItems[i].id,
                                    quantityOrdered: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria
                                },
                            ],
                        },
                    },
                })
            )
        );

        return { suppliers, inventoryItems, purchaseOrders };
    }
}
