import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import useToggle from "../hooks/useToggle";
import useWindowSize from "../hooks/useWindowSize";

export default function AplikasiCuaca() {
  const [city, setCity] = useLocalStorage("lastCity", "Jakarta");
  const [coords, setCoords] = useState({ lat: -6.2, lon: 106.8 }); // default Jakarta
  const [isCelsius, toggleUnit] = useToggle(true);
  const [width] = useWindowSize();

  const { data, loading } = useFetch(
    coords
      ? `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
      : null
  );

  // 🔎 Cari koordinat berdasarkan nama kota
  useEffect(() => {
    if (!city) return;
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.results && json.results.length > 0) {
          setCoords({
            lat: json.results[0].latitude,
            lon: json.results[0].longitude,
          });
        }
      })
      .catch(() => console.log("Kota tidak ditemukan"));
  }, [city]);

  // 🌀 Mapping kode cuaca ke teks
  const weatherCodeMap = (code) => {
    if (code === 0) return "Cerah";
    if ([1, 2, 3].includes(code)) return "Berawan";
    if ([45, 48].includes(code)) return "Berkabut";
    if ([51, 53, 55, 56, 57].includes(code)) return "Gerimis";
    if ([61, 63, 65, 66, 67].includes(code)) return "Hujan ringan";
    if ([71, 73, 75, 77].includes(code)) return "Salju";
    if ([80, 81, 82].includes(code)) return "Hujan deras";
    if ([95, 96, 99].includes(code)) return "Badai petir";
    return "Tidak diketahui";
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-blue-50 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Aplikasi Cuaca</h2>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 w-full rounded mb-3"
        placeholder="Masukkan kota..."
      />

      <button
        onClick={toggleUnit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ubah ke {isCelsius ? "°F" : "°C"}
      </button>

      {loading ? (
        <p className="mt-3">Loading cuaca...</p>
      ) : data?.current_weather ? (
        <div className="mt-4">
          <p>Kota: {city}</p>
          <p>
            Suhu:{" "}
            {isCelsius
              ? data.current_weather.temperature
              : (data.current_weather.temperature * 9) / 5 + 32}
            °{isCelsius ? "C" : "F"}
          </p>
          <p>Angin: {data.current_weather.windspeed} km/jam</p>
          <p>
            Kondisi: {weatherCodeMap(data.current_weather.weathercode)}
          </p>
        </div>
      ) : (
        <p className="text-red-500 mt-3">Data cuaca tidak tersedia.</p>
      )}

      <p className="text-gray-500 text-sm mt-4">
        Lebar layar: {width}px (Responsif!)
      </p>
    </div>
  );
}
