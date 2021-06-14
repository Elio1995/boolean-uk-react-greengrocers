import { useState } from "react";
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

  const [shopItems, setShopItems] = useState(GreenGrocers)

  const [cartItems, setCartItems] = useState([
    {
      id: "001-beetroot",
      quantity: 3,
    },
    {
      id: "002-carrot",
      quantity: 2,
    }
  ])


  function addItems (itemId) {
    const itemFound = cartItems.find(cartItem => cartItem.id === itemId )

  if(itemFound !== undefined) {
    const cartUpdated = cartItems.map(cartItem => cartItem.id===itemId ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
      )
      setCartItems(cartUpdated)
  } else {
    const newCart = {
      
        id: itemId,
        quantity: 1
      
    }

    setCartItems([...cartItems, newCart])
  }
  }
  function removeItem(itemId) {
    const itemFound = cartItems.find(cartItem => cartItem.id === itemId )

    if(itemFound.quantity === 1){
      const cartUpdated = cartItems.filter (cartItem => cartItem.id !== itemId)
      setCartItems(cartUpdated)
    } else {
      const cartUpdated = cartItems.map(cartItem => cartItem.id===itemId ? { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
        setCartItems(cartUpdated)
    }
  
}

let totalNumber = 0

for (const cartItem of cartItems){
const storeItem = shopItems.find(storeItem =>
  storeItem.id === cartItem.id)
  totalNumber += cartItem.quantity * storeItem.price
}

  

  return <div classNameName="App">
<header id="store">
  <h1>Greengrocers</h1>
  <ul className="item-list store--item-list">
  { shopItems.map(item => 
  <li>
  <div className="store--item-icon">
    <img src={`assets/icons/${item.id}.svg`}alt="item.name" />
  </div>
  <button onClick={()=>{addItems(item.id)}} >Add to cart</button>
</li>
)}
  </ul>
</header>
<main id="cart">
  <h2>Your Cart</h2>
  <div className="cart--item-list-container">
    <ul className="item-list cart--item-list">
      {cartItems.map(cartItem => {
        const storeItem = shopItems.find(storeItem => storeItem.id===cartItem.id
        )
        return(
    <li>
  <img
    className="cart--item-icon"
    src={`assets/icons/${cartItem.id}.svg`}
    alt={storeItem.name}
  />
  <p>{storeItem.name}</p>
  <button className="quantity-btn remove-btn center" onClick={()=>{removeItem(cartItem.id)}}>-</button>
  <span className="quantity-text center">{cartItem.quantity}</span>
  <button className="quantity-btn add-btn center"
  onClick={()=>{addItems(cartItem.id)}}>+</button>
</li>
      )})}
    </ul>
  </div>
  <div className="total-section">
    <div>
      <h3>Total</h3>
    </div>
    <div>
      <span className="total-number">`£{totalNumber.toFixed(2)}`</span>
    </div>
  </div>
</main>
<div>
  Icons made by
  <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26"
    >Icongeek26</a
  >
  from
  <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
</div>


  </div>;
}