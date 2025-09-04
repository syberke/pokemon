export default function QuantityButton({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-2 py-1 rounded-xl border shadow-sm disabled:opacity-50"
    >
      {children}
    </button>
  );
}
    