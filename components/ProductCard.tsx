"use client";

import Image from "next/image";
import ImageProduct from "@/public/product-image/img-product.jpg";
import { formatNumber } from "@/utils/format";
import { ProductCartProps } from "@/types/ProductCartProps";
import { useCartStore } from "@/store/cart";

export default function ProductCard({
  productId,
  skuCode,
  skuName,
  unitPrice,
  amount,
  qty,
}: ProductCartProps) {
  const { increment, decrement, add: handleAddToCart } = useCartStore();

  const product = {
    productId,
    skuCode,
    skuName,
    unitPrice,
    amount,
    qty,
  } as ProductCartProps;

  
  return (
    <div className="flex flex-col justify-between border p-3 rounded-xl border-slate-700">
      <div className="bg-gray-300 rounded-md mb-2">
        <Image
          src={ImageProduct}
          alt="coffee"
          className="w-[180px] h-[180px] rounded object-cover"
        />
      </div>
      <h2 className="text-slate-400">{skuName}</h2>
      <div>
        <h2 className="text-slate-400">คงเหลือ: {amount}</h2>
        <h2 className="font-semibold text-green-400">
          ราคา: {formatNumber(unitPrice)}
        </h2>
      </div>
      <div>
        <div className="flex justify-center gap-2">
          <button
            disabled={amount == qty || amount == 0}
            onClick={() => increment(productId)}
            className=" font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-7"
          >
            +
          </button>
          <h2 className="pt-2 font-semibold text-gray-400">{qty}</h2>
          <button
            onClick={() => decrement(productId)}
            className="font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-7"
          >
            -
          </button>
        </div>
        <button
          disabled={amount < qty || qty === 0}
          onClick={() => handleAddToCart(product)}
          className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-full"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
