import { Chectout, ProductProps } from "@/types/Product";
import { create } from "zustand";

interface CartItem extends ProductProps {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  products: ProductProps[];
  count: () => number;
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  removeAll: (products: ProductProps[]) => void;
  setProducts: (products: ProductProps[]) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  chectout: ()=> Chectout[]
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  products: [],
  chectout:()=> {
    const { cart } = get();
    const data = cart.map(c => ({ productId : c.productId , qty : c.qty  }) as Chectout  )
    return data
  },
  setProducts: (products: ProductProps[]) =>
    set({
      products: products.map((i) => {
        i.qty = 0;
        return i;
      }),
    }),
  increment: (id: string) => {
    const { products } = get();
    var qty = products.map((item) => {
      if (item.productId === id)
        return {
          ...item,
          qty: item.qty + 1,
        } as CartItem;
      return item;
    });

    set({ products: qty });
  },
  decrement: (id: string) => {
    const { products } = get();
    var qty = products.map((item) => {
      if (item.productId === id && item.qty !== 0)
        return {
          ...item,
          qty: item.qty - 1,
        } as CartItem;
      return item;
    });

    set({ products: qty });
  },
  count: () => {
    const { cart } = get();
    if (cart.length)
      return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
    return 0;
  },
  add: (product: ProductProps) => {
    const { cart, products } = get();

    const prd = products.map((item) => {
      if (item.productId === product.productId)
        return {
          ...item,
          amount: item.amount - product.qty,
          qty: 0,
        } as CartItem;
      return item;
    });

    const updatedCart = updateCart(product, cart);
    set({ cart: updatedCart, products: prd });
  },
  remove: (productId: string) => {
    const { cart, products } = get();
    const qty = cart.find((c) => c.productId == productId)?.qty;
    const updatedCart = cart.filter((c) => c.productId !== productId);

    const prd = products.map((item) => {
      if (item.productId === productId)
        return { ...item, amount: item.amount + qty!, qty: 0 } as CartItem;
      return item;
    });
    set({ cart: updatedCart, products: prd });
  },
  removeAll: (products: ProductProps[]) => {
    set({
      cart: [],
      products: products.map((i) => {
        i.qty = 0;
        return i;
      }),
    });
  },
}));

function updateCart(product: ProductProps, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;

  const productOnCart = cart
    .map((item) => item.productId)
    .includes(product.productId);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.productId === product.productId)
        return { ...item, qty: item.qty + product.qty } as CartItem;
      return item;
    });
  }

  return cart;
}
