function Main(props) {
  return (
    <main id="cart">
      <h2>Your Cart</h2>
      <div className="cart--item-list-container">
        <ul className="item-list cart--item-list">
          {props.cartItems.map((cartItem) => {
            const storeItem = props.shopItems.find(
              (storeItem) => storeItem.id === cartItem.id
            );
            return (
              <li>
                <img
                  className="cart--item-icon"
                  src={`assets/icons/${cartItem.id}.svg`}
                  alt={storeItem.name}
                />
                <p>{storeItem.name}</p>
                <button
                  className="quantity-btn remove-btn center"
                  onClick={() => {
                    props.removeItem(cartItem.id);
                  }}
                >
                  -
                </button>
                <span className="quantity-text center">
                  {cartItem.quantity}
                </span>
                <button
                  className="quantity-btn add-btn center"
                  onClick={() => {
                    props.addItems(cartItem.id);
                  }}
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="total-section">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span className="total-number">
            `£{props.totalNumber.toFixed(2)}`
          </span>
        </div>
      </div>
    </main>
  );
}

export default Main;
