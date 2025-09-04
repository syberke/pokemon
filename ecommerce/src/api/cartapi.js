export async function apiUpdateQty(id, qty) {
  await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
  if (Math.random() < 0.12) {
    throw new Error("Server failed to update quantity");
  }
  return { id, qty };
}

export async function apiCheckout(payload) {
  await new Promise((r) => setTimeout(r, 800));
  return { orderId: Math.floor(Math.random() * 1_000_000), ...payload };
}
