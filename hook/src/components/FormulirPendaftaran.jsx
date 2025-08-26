import { useState, useTransition, useOptimistic } from "react";

export default function FormulirPendaftaran() {
  const [peserta, setPeserta] = useState([]);
  const [isPending, startTransition] = useTransition();


  const [optimisticPeserta, addOptimisticPeserta] = useOptimistic(peserta);


  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nama: "", email: "" });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!form.nama || !form.email.includes("@")) {
      setError("Nama dan email valid harus diisi!");
      return;
    }

    startTransition(() => {

      addOptimisticPeserta([...peserta, form]);


      setTimeout(() => {
        setPeserta((prev) => [...prev, form]);
        setForm({ nama: "", email: "" }); // reset form
      }, 1000);
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Formulir Pendaftaran</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama"
          className="border p-2 w-full rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isPending ? "Mengirim..." : "Daftar"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h3 className="text-lg font-semibold mt-6">Daftar Peserta</h3>
      <ul className="list-disc pl-5">
        {optimisticPeserta.map((p, i) => (
          <li key={i}>
            {p.nama} ({p.email})
          </li>
        ))}
      </ul>

      {isPending && <p className="text-gray-500 mt-2">Loading daftar...</p>}
    </div>
  );
}
