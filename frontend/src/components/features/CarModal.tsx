"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { X, Star, Check, Calendar, Settings, Fuel, Thermometer } from "lucide-react";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  fuel_type: string;
  transmission: string;
  price_per_day: number;
  is_available: boolean;
  image?: string;
  description?: string;
  deposit?: number;
}

interface ModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CarModal({ car, isOpen, onClose }: ModalProps) {
  const router = useRouter();

  if (!isOpen || !car) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const imageSrc = car.image 
    ? (car.image.startsWith('/') ? car.image : `/${car.image}`)
    : '/placeholder.jpg';

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="bg-[#1b1e24] w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* --- Autó Kép --- */}
        <div className="relative w- h-64 md:h-auto md:w-5/12 bg-black">
            <div>
                <img 
                src={imageSrc} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover opacity-90"
            />
            </div>
          {/* Árnyék beállítása*/}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1e24] via-transparent to-transparent md:bg-gradient-to-b md:from-transparent md:to-[#1b1e24]" />
        </div>

        {/* --- Hírdetés Adatok --- */}
        <div>
            <div className="flex-1 flex flex-col p-6 md:p-8 overflow-hidden">
            <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-green-500 mb-2 leading-tight">
                {car.brand} <span className="text-white">{car.model}</span>
                </h2>
                <div className="flex items-center text-gray-400 text-sm">
                <span>Tulajdonos: Drivvy</span>
                <span className="mx-2">|</span>
                <span className="flex items-center text-yellow-400 font-medium">
                    <Star size={16} className="mr-1 fill-yellow-400" /> 5.0
                </span>
                </div>
            </div>

            {/* Görgethető tartalom */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                
                {/* Leírás */}
                <section>
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    Részletes leírás
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {car.description || `Prémium élmény! Ez a ${car.year}-es évjáratú ${car.brand} ${car.model} tökéletes választás. ${car.fuel_type} üzemű és ${car.transmission.toLowerCase()} váltóval rendelkezik.`}
                </p>
                </section>

                {/* Jellemzők */}
                <section>
                <h3 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-1">
                    Főbb Jellemzők
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3">
                    <Calendar className="text-gray-500" size={20} />
                    <div><span className="block text-xs text-gray-500">Évjárat</span><span className="text-white font-medium">{car.year}</span></div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3">
                    <Settings className="text-gray-500" size={20} />
                    <div><span className="block text-xs text-gray-500">Váltó</span><span className="text-white font-medium">{car.transmission}</span></div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3">
                    <Fuel className="text-gray-500" size={20} />
                    <div><span className="block text-xs text-gray-500">Üzemanyag</span><span className="text-white font-medium">{car.fuel_type}</span></div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3">
                    <Thermometer className="text-gray-500" size={20} />
                    <div><span className="block text-xs text-gray-500">Klíma</span><span className="text-white font-medium">Van</span></div>
                    </div>
                </div>
                </section>

                {/* Feltételek */}
                <section>
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    Bérlés feltételei
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-1" /><span><strong>Átvétel:</strong> Győr, Széchenyi tér</span></li>
                    <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-1" /><span><strong>Kaució:</strong> {(car.deposit || 50000).toLocaleString()} Ft</span></li>
                </ul>
                </section>
            </div>

            {/* ALSÓ SÁV */}
            <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                <span className="text-3xl font-extrabold text-green-500">
                    {car.price_per_day.toLocaleString()}
                </span>
                <span className="text-white text-lg"> Ft / nap</span>
                </div>
                
                <button 
                    onClick={() => {
                    onClose(); 
                    router.push(`/booking/${car.id}`); 
                }} className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-green-500/20"
                >
                Jelentkezz be a foglaláshoz
                </button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}