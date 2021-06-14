import { useState } from "react";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import GreenGrocers from "./data/items.js";
import "./styles/index.css";

/* 
Your store item should have the following structure

{
  id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 <- You can come up with your own prices
}

*/

export default function App() {
  const [shopItems, setShopItems] = useState(GreenGrocers);

  const [cartItems, setCartItems] = useState([
    {
      id: "001-beetroot",
      quantity: 3,
    },
    {
      id: "002-carrot",
      quantity: 2,
    },
  ]);

  function addItems(itemId) {
    const itemFound = cartItems.find((cartItem) => cartItem.id === itemId);

    if (itemFound !== undefined) {
      const cartUpdated = cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(cartUpdated);
    } else {
      const newCart = {
        id: itemId,
        quantity: 1,
      };

      setCartItems([...cartItems, newCart]);
    }
  }
  function removeItem(itemId) {
    const itemFound = cartItems.find((cartItem) => cartItem.id === itemId);

    if (itemFound.quantity === 1) {
      const cartUpdated = cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
      setCartItems(cartUpdated);
    } else {
      const cartUpdated = cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(cartUpdated);
    }
  }

  let totalNumber = 0;

  for (const cartItem of cartItems) {
    const storeItem = shopItems.find(
      (storeItem) => storeItem.id === cartItem.id
    );
    totalNumber += cartItem.quantity * storeItem.price;
  }

  return (
    <div classNameName="App">
      <Header shopItems={shopItems} addItems={addItems} />
      <Main
        cartItems={cartItems}
        totalNumber={totalNumber}
        removeItem={removeItem}
        addItems={addItems}
        shopItems={shopItems}
      />
      <Footer />
    </div>
  );
}
