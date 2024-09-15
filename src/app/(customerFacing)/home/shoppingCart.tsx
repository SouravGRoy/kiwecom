import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiBoxUnpacking } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";
import { formatCurrency } from "@/lib/formatter";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  cartItems,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceInCents * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose} // Close cart when overlay is clicked
          />

          {/* Shopping Cart */}
          <motion.div
            id="drawer-right-example"
            className="fixed top-0 right-0 z-40 mt-4 rounded-md mx-5 h-[95%] p-4 overflow-y-auto bg-white w-[45%] dark:bg-gray-800"
            aria-labelledby="drawer-right-label"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex space-x-1">
                <h1 className="text-3xl tracking-wide font-founders font-semibold text-black">
                  Cart
                </h1>
                <GiBoxUnpacking size={24} color="black" />
              </div>
              <button
                type="button"
                className="flex-col flex items-end justify-end"
                onClick={onClose}
                aria-label="Close cart"
              >
                <RxCross2 size={24} color="black" />
                <span>Close menu</span>
              </button>
            </div>
            <div className="flex flex-col h-[87%] px-4 justify-between">
              {/* Top Section */}
              <div className="flex flex-col space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex md:flex-row justify-between items-center"
                  >
                    <Image
                      src={item.imagePath}
                      height={60}
                      width={100}
                      alt={item.name}
                    />
                    <div className="flex justify-between w-full items-center space-x-3">
                      <div className="flex-col items-start flex px-3">
                        <h1 className="font-bold hover:underline uppercase text-black">
                          {item.name}
                        </h1>
                        <p className="text-gray-400">
                          {item.priceInCents} x {item.quantity}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col mt-2 space-y-2 items-end">
                        <div className="flex flex-row space-x-2">
                          <Button
                            variant={"outline"}
                            className="text-black"
                            onClick={() =>
                              handleChangeQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                          <Button
                            variant={"outline"}
                            className="text-black"
                            onClick={() =>
                              handleChangeQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                        </div>

                        <Button
                          className="underline uppercase text-gray-400 bg-white text-xs p-0"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom Section */}
              <div>
                <div className="h-1 border-t w-full pb-6"></div>
                <div className="flex-col space-y-3 py-5">
                  <div className="flex justify-between px-4 text-black font-semibold">
                    <h1 className="font-founders text-2xl font-normal">
                      Total Price:
                    </h1>
                    <h1 className="font-founders text-2xl font-normal">
                      {formatCurrency(totalPrice)}
                    </h1>
                  </div>

                  <div className="flex flex-col  px-4 text-black font-semibold">
                    <div className="flex justify-between">
                      <h1 className="font-founders text-2xl font-semibold">
                        Total Quantity:
                      </h1>
                      <h1>{totalQuantity}</h1>
                    </div>

                    <p className="text-sm text-gray-600">
                      Tax included and shipping calculated at checkout
                    </p>
                  </div>
                </div>
                <div className="pt-3  flex  space-x-3">
                  <Link
                    className="w-full "
                    href={`/products/${cartItems[0]?.id}/purchase`}
                  >
                    {" "}
                    <Button className="w-full text-lg font-bold py-7 text-white bg-black">
                      Checkout
                    </Button>
                  </Link>

                  <Link className="w-full " href={"/cart"}>
                    <Button className="w-full text-lg font-bold py-7 text-white bg-black">
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
