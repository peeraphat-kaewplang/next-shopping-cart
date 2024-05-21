import { useCartStore } from "@/store/cart";
import {  Popover, PopoverButton, PopoverPanel , Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

type Props = {id: string}

export default function DeleteButton({ id }:Props) {
  const { remove } = useCartStore();
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <PopoverButton
            className="relative p-2 rounded-md hover:bg-slate-900 text-slate-700 hover:text-slate-300 transition duration-200 ease-in-out">
              <TrashIcon className="w-5 h-5" />
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="">
              <div className=" absolute right-0 -top-12 z-20 w-40  overflow-hidden rounded-lg shadow-lg">
                <div className="bg-slate-900 p-2">
                  <button type="button" 
                    className="font-semibold text-red-400 hover:bg-red-400 hover:bg-opacity-10 px-4 text-sm py-2 rounded-md"
                    onClick={() => {
                      remove(id)
                      close();
                    }}>
                      Confirm Delete
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}