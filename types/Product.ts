export type ProductProps = {
  productId: string;
  skuCode: string;
  skuName: string;
  amount: number;
  unitPrice: number;
  qty: number;
};


export type Chectout = {
  productId: string;
  qty: number;
};