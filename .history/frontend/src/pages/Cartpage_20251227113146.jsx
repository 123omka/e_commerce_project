import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQty, removeItem, clearCart } from "../features/cart/cartSlice";

export default function CartPage() {
  const d = useDispatch();
  const { items } = useSelector(s => s.cart);

  useEffect(() => { d(fetchCart()); }, []);

  const total = items.reduce((s,i)=>s+i.price*i.quantity,0);

  return (
    <div>
      <h2>Cart</h2>
      {items.map(i=>(
        <div key={i.id}>
          {i.name}
          <button onClick={()=>d(updateQty({id:i.id,quantity:i.quantity-1})).then(()=>d(fetchCart()))}>-</button>
          {i.quantity}
          <button onClick={()=>d(updateQty({id:i.id,quantity:i.quantity+1})).then(()=>d(fetchCart()))}>+</button>
          <button onClick={()=>d(removeItem(i.id)).then(()=>d(fetchCart()))}>Remove</button>
        </div>
      ))}
      <h3>Total ₹{total}</h3>
      <button onClick={()=>d(clearCart()).then(()=>d(fetchCart()))}>Clear Cart</button>
    </div>
  );
}
