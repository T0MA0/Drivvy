"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CreditCard, Calendar, CheckCircle } from "lucide-react";

// Teszt adatok
const getCarById = async (id: string) => {
    return {
        id: parseInt(id),
        brand: "Audi",
        model: "A4 B8",
        year: 2021,
        price_per_day: 12500,
        image: "cars/audi.jpg",
        deposit: 50000
    };
};

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Űrlap állapotok
    const [dates, setDates] = useState({ start: "", end: "" });
    const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' vagy 'transfer'
    
    // Számolt értékek
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Adatok betöltése
    useEffect(() => {
        if (params.id) {
            getCarById(params.id as string).then((data) => {
                setCar(data);
                setLoading(false);
            });
        }
    }, [params.id]);

    // Árkalkuláció
    useEffect(() => {
        if (dates.start && dates.end && car) {
            const start = new Date(dates.start);
            const end = new Date(dates.end);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const days = diffDays > 0 ? diffDays : 1;
            
            setTotalDays(days);
            setTotalPrice(days * car.price_per_day);
        }
    }, [dates, car]);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Foglalás elküldve! (Demo)");
    };

    if (loading) return <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">Betöltés...</div>;

    return (
        <section className="min-h-screen relative py-12 flex justify-center bg-[#2b2b2b]">
            <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-10 pointer-events-none bg-[url('/Háttérkép.png')]"></div>
            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* --- BAL OLDAL: A NAGY ŰRLAP KÁRTYA --- */}
                    <div className="lg:col-span-2 bg-[#1b1e24] rounded-xl p-8 shadow-2xl border border-gray-800">
                        
                        {/* Bérlés Időtartama */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Bérlés Időtartama
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Mikortól?</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            required
                                            className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            onChange={(e) => setDates({...dates, start: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Meddig?</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            required
                                            className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            onChange={(e) => setDates({...dates, end: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Számlázási Adatok */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Számlázási Adatok
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Vezetéknév *</label>
                                    <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Keresztnév *</label>
                                    <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Cím *</label>
                                <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                            </div>
                        </div>

                        {/* Fizetési Mód */}
                        <div>
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Fizetési Mód
                            </h2>
                            
                            <div className="space-y-4 mb-6">
                                {/* Bankkártya Opció */}
                                <div className={`border rounded-lg transition-all overflow-hidden ${paymentMethod === 'card' ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-[#111]'}`}>
                                    <label className="flex items-center p-4 cursor-pointer">
                                        <input 
                                            type="radio" name="payment" value="card" 
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-4 h-4 text-green-500 accent-green-500"
                                        />
                                        <span className="ml-3 font-medium text-white flex items-center gap-2">Bankkártyás fizetés</span>
                                    </label>
                                    
                                    {/* Lenyíló kártyaadatok */}
                                    {paymentMethod === 'card' && (
                                        <div className="p-4 pt-0 space-y-4 animate-fadeIn">
                                            <input type="text" placeholder="Kártyaszám * 0000 0000 0000 0000" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="Lejárati dátum * MM/YY" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                                <input type="text" placeholder="CVC kód * 123" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Átutalás Opció */}
                                <div className={`border rounded-lg transition-all ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-[#111]'}`}>
                                    <label className="flex items-center p-4 cursor-pointer">
                                        <input 
                                            type="radio" name="payment" value="transfer" 
                                            checked={paymentMethod === 'transfer'}
                                            onChange={() => setPaymentMethod('transfer')}
                                            className="w-4 h-4 text-green-500 accent-green-500"
                                        />
                                        <span className="ml-3 font-medium text-white">Banki átutalás (előre)</span>
                                    </label>
                                </div>
                            </div>

                            {/* ZÖLD GOMB */}
                            <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg shadow-lg transition-all mt-4">
                                Fizetés és Foglalás
                            </button>
                        </div>
                    </div>

                    {/* --- ÖSSZEFOGLALÓ KÁRTYA --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1b1e24] rounded-xl p-6 shadow-2xl border border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2 pb-4 border-b border-gray-700">
                                🚗 Foglalás Összefoglaló
                            </h3>

                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                A költségek a választott dátumok alapján frissülnek.
                            </p>

                            <div className="space-y-4 text-sm mb-6">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Autó:</span>
                                    <span className="text-white font-medium">{car.brand} {car.model} ({car.year})</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Napi díj:</span>
                                    <span className="text-white font-medium">{car.price_per_day.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Bérelt napok:</span>
                                    <span className="text-white font-medium">{totalDays} nap</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Bérlési díj (becsült):</span>
                                    <span className="text-white font-medium">{totalPrice.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300 border-b border-gray-700 border-dashed pb-4">
                                    <span>Kaució:</span>
                                    <span className="text-white font-medium">{(car.deposit || 50000).toLocaleString()} Ft</span>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-green-500 font-bold text-base">Végösszeg (becsült):</span>
                                    <span className="text-xl font-bold text-green-500">
                                        {(totalPrice + (car.deposit || 50000)).toLocaleString()} Ft
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}