import React, { useEffect, useMemo, useReducer, useState, useTransition } from "react";
import "./App.css";

import QuantityButton from "./components/QuantityButton.jsx";
import { CartAction, cartReducer } from "../src/Reducers/cartReducer.js";
import { apiCheckout, apiUpdateQty } from "./api/cartapi.js";
import Currency from "./components/Currency";
import { useFetchAdvanced } from "./hooks/useFetchAdvanced";
import { usePrevious } from "./hooks/usePrevious";
export default function MiniECommerceApp() {
  const PRODUCTS_API = "https://fakestoreapi.com/products?limit=8";
  const { data: products, loading, error, refetch } = useFetchAdvanced(PRODUCTS_API, {
    immediate: true,
    retry: 1,
  });

  const [cart, dispatch] = useReducer(cartReducer, []);

  const [optimisticCart, addOptimistic] = React.useOptimistic(cart, (state, action) => {
    if (action.type === CartAction.SET_QTY) {
      return state.map((it) => (it.id === action.id ? { ...it, qty: action.qty } : it));
    }
    return state;
  });

  useEffect(() => {
    addOptimistic({ type: "SYNC", payload: cart });
  }, [cart,addOptimistic]);

  const total = useMemo(
    () => optimisticCart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [optimisticCart]
  );

  const [isPending, startTransition] = useTransition();
  const [lastTransaction, setLastTransaction] = useState(null);
  const prevTransaction = usePrevious(lastTransaction);

  const handleAddToCart = (p) => dispatch({ type: CartAction.ADD, item: p });

  const handleQtyChange = (id, qty) => {
    const newQty = Math.max(1, Math.min(99, Number(qty) || 1));
    addOptimistic({ type: CartAction.SET_QTY, id, qty: newQty });

    startTransition(async () => {
      try {
        await apiUpdateQty(id, newQty);
        dispatch({ type: CartAction.SET_QTY, id, qty: newQty });
      } catch (e) {
        alert(e.message);
        addOptimistic({ type: "SYNC", payload: cart });
      }
    });
  };

  const handleCheckout = async () => {
    if (!cart.length) return alert("Keranjang kosong");
    try {
      const payload = {
        items: cart.map(({ id, title, price, qty }) => ({ id, title, price, qty })),
        total,
        date: new Date().toISOString(),
      };
      const res = await apiCheckout(payload);
      setLastTransaction(res);
      dispatch({ type: CartAction.RESET });
    } catch {
      alert("Checkout gagal. Coba lagi.");
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Mini E-Commerce</h1>
        <div className="header-info">
          <button onClick={refetch}>Reload Products</button>
          <div>Items: <strong>{optimisticCart.reduce((a, b) => a + b.qty, 0)}</strong></div>
          <div>Total: <strong><Currency value={total} /></strong></div>
        </div>
      </header>

      {/* Products */}
      <section className="products">
        {loading && <div className="loading">Loading products…</div>}
        {error && (
          <div className="error">
            Failed to load products. <button onClick={refetch}>Try again</button>
          </div>
        )}
        {Array.isArray(products) && products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="price">${p.price}</div>
            <button onClick={() => handleAddToCart(p)}>Add</button>
          </div>
        ))}
      </section>

      {/* Cart */}
      <aside className="cart">
        <h2>Keranjang</h2>
        {!optimisticCart.length && <div className="empty">Belum ada item.</div>}
        <ul>
          {optimisticCart.map((it) => (
            <li key={it.id} className="cart-item">
              <img src={it.image} alt="thumb" />
              <div className="cart-item-info">
                <div className="cart-item-title">{it.title}</div>
                <div className="price"><Currency value={it.price} /></div>
                <div className="qty-control">
                  <button disabled={isPending} onClick={() => handleQtyChange(it.id, it.qty - 1)}>-</button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => handleQtyChange(it.id, e.target.value)}
                  />
                  <button disabled={isPending} onClick={() => handleQtyChange(it.id, it.qty + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => dispatch({ type: CartAction.REMOVE, id: it.id })}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <span>Total</span>
          <span><Currency value={total} /></span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={!optimisticCart.length || isPending}
          className="checkout-btn"
        >
          {isPending ? "Processing…" : "Checkout"}
        </button>

           {/* Transactions */}
      <section className="transactions">
        <h3>Transaksi Terakhir</h3>
        {!prevTransaction ? (
          <div className="empty">Belum ada transaksi sebelumnya.</div>
        ) : (
          <div>
            <div>ID Order: <strong>{prevTransaction.orderId}</strong></div>
            <div>Tanggal: {new Date(prevTransaction.date).toLocaleString()}</div>
            <div>Total: <Currency value={prevTransaction.total} /></div>
          </div>
        )}

        {lastTransaction && (
          <div className="success">
            <div>Checkout berhasil!</div>
            <div>Order ID: {lastTransaction.orderId}</div>
            <div>Total: <Currency value={lastTransaction.total} /></div>
          </div>
        )}
      </section>
      </aside>

  
    </div>
  );
}
