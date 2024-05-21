"use client";
import { ProductProps } from "@/types/Product";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useCartStore } from "@/store/cart";
import axios from "axios";

const ProductList = () => {
  const { products, setProducts ,cart } = useCartStore();

  useEffect(() => {
    async function updateData() {
      const response = await axios.get("http://localhost:5032/api/Product");
      setProducts(response.data);
    }

    if(cart.length === 0)  updateData();
  }, []);

  return (
    <div className="text-sm pt-4 flex gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          skuCode={product.skuCode}
          skuName={product.skuName}
          amount={product.amount}
          unitPrice={product.unitPrice}
          qty={product.qty}
        />
      ))}
    </div>
  );
};

export default ProductList;
