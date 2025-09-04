export default function Currency({ value }) {
  return (
    <span>
      {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value)}
    </span>
  );
}
