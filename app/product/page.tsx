import ProductList from "@/components/ProductList";

export default function Product() {
  return (
    <>
      <h1 className="font-semibold text-slate-200 text-2xl border-b pb-4 border-b-slate-700">
        Products
      </h1>

      <ProductList/>
    </>
  );
}
