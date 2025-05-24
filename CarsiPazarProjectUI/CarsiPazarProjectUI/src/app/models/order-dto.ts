export interface OrderItemDto {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItemDto[];
}
