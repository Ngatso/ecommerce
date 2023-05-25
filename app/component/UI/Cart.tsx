import React, { useState } from "react";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 9.99 },
    { id: 2, name: "Item 2", price: 14.99 },
    { id: 3, name: "Item 3", price: 19.99 },
  ]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="relative z-20">
      <button
        className="relative z-10 p-2 bg-transparent text-gray-600"
        onClick={toggleCart}
      >
        <svg
          className="icon icon--cart"
          width="25"
          height="25"
          viewBox="0 0 138 144"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.499 9.50078V31H27.9739C27.6776 31 27.3915 31.0429 27.1214 31.1228L23.9407 15.3872C23.6592 13.9979 22.4287 13 21.001 13H3.00032C1.34338 13 0 14.3305 0 15.969C0 17.6075 1.34338 18.938 3.00032 18.938H18.5398L33.1613 91.2978C35.1177 100.976 43.7755 108 53.7538 108H123C124.655 108 126 106.669 126 105.031C126 103.392 124.655 102.062 123 102.062H53.7538C46.6261 102.062 40.4461 97.0441 39.0481 90.1271L37.8096 84H118.577C126.058 84 132.403 78.4591 133.332 71.1041L137.976 34.3096C138.084 33.4738 137.822 32.6262 137.257 31.9956C136.692 31.3649 135.883 31 135.027 31H119.876L119.86 19.7807C119.855 15.6655 118.245 11.7892 115.331 8.88317C112.417 5.97709 108.542 4.38253 104.415 4.38486C100.295 4.39015 96.5489 6.01951 93.784 8.66541V3.00417C93.784 1.34845 92.4395 0.00390625 90.7838 0.00390625H66.784C65.1283 0.00390625 63.7838 1.34845 63.7838 3.00417V6.50052H41.4993C39.8436 6.50052 38.499 7.84506 38.499 9.50078ZM87.7834 6.00467V31H69.7831V6.00467H87.7834ZM62.4986 12.5013V31H44.4984V12.5013H62.4986ZM95.0325 31H113.881L113.866 19.7933C113.867 17.2779 112.883 14.9151 111.1 13.1362C109.315 11.3565 106.955 10.3838 104.435 10.3882C99.2326 10.3954 95.0131 14.6266 95.0171 19.8153L95.0325 31ZM36.6219 78.124C36.7119 78.1158 36.8031 78.1117 36.8953 78.1117H118.577C123.067 78.1117 126.874 74.7847 127.433 70.3731L131.661 36.8883H28.2868L36.6219 78.124Z"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.7842 129C35.7842 137.268 42.5165 144 50.7843 144C59.0521 144 65.7843 137.268 65.7843 129C65.7843 120.732 59.0521 114 50.7843 114C42.5165 114 35.7842 120.732 35.7842 129ZM41.7846 129C41.7846 124.039 45.8219 120 50.7843 120C55.7457 120 59.7839 124.038 59.7839 129C59.7839 133.962 55.7466 138 50.7843 138C45.8216 138 41.7834 133.962 41.7846 129Z"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M95.7861 129C95.7861 137.268 102.518 144 110.786 144C119.054 144 125.786 137.268 125.786 129C125.786 120.732 119.054 114 110.786 114C102.518 114 95.7861 120.732 95.7861 129ZM101.787 129C101.787 124.039 105.824 120 110.786 120C115.749 120 119.786 124.038 119.786 129C119.786 133.962 115.749 138 110.786 138C105.824 138 101.787 133.962 101.787 129Z"
          ></path>
        </svg>
        {/* {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {items.length}
          </span>
        )} */}
      </button>
      {/* {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white p-4 shadow rounded">
          {items.length > 0 ? (
            <React.Fragment>
              <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-4" />
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Checkout
              </button>
            </React.Fragment>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Cart;
