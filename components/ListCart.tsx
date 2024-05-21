"use client";

import { useCartStore } from "@/store/cart";
import DeleteButton from "./DeleteButton";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ListCart() {
  const router = useRouter()
  const { cart , chectout ,removeAll } = useCartStore();


  let qtySum = 0;
  let unitPriceSum = 0;

  if (cart.length !== 0) {
    qtySum = cart.reduce((unitPrice, currentValue) => {
      return unitPrice + currentValue.qty;
    }, 0);

    unitPriceSum = cart.reduce((unitPrice, currentValue) => {
      return unitPrice + currentValue.qty * currentValue.unitPrice;
    }, 0);
  }

  async function removeAllData() {
    const response = await axios.get("http://localhost:5032/api/Product");
    removeAll(response.data);
  }

  async function chectoutCart() {
    const response = await axios.post("http://localhost:5032/api/Stock", chectout())
    if(response.status === 200) removeAllData()

      router.push('/product')
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <table className="text-slate-400">
        <thead>
          <tr>
            <th>#</th>
            <th>สินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.length ? (
            cart.map((item, index) => (
              <tr key={item.productId}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.skuName}</td>
                <td className="text-center">{item.unitPrice}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">{item.qty * item.unitPrice}</td>
                <td className="text-center">
                  <DeleteButton id={item.productId} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-slate-600 py-2">
                No Data
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center">รวม</td>
            <td className="text-center">{qtySum}</td>
            <td className="text-center">{unitPriceSum}</td>
            <td className="text-center"></td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end gap-2">
        <button onClick={() => chectoutCart()} className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-3/12">
          ชำระเงิน (Check out)
        </button>
        <button onClick={() => removeAllData()} className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md py-2 text-center w-3/12">
          ยกเลิก
        </button>
      </div>
    </div>
  );
}
