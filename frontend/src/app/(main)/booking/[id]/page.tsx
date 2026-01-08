"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Calendar, CreditCard, MapPin, User, CheckCircle } from "lucide-react";


const getCarById = async (id: string) => {
    // Itt hívnád meg a backendet: await fetch(`/api/cars/${id}`)
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
    const [paymentMethod, setPaymentMethod] = useState("card");
    
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (params.id) {
            getCarById(params.id as string).then((data) => {
                setCar(data);
                setLoading(false);
            });
        }
    }, [params.id]);

    //Árkalkuláció, amikor változik a dátum
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
        alert("Foglalás elküldve! (Itt hívnánk a backendet)");
        // router.push('/profile'); // Átirányítás profilra
    };

    if (loading) return <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">Betöltés...</div>;

    return (
        <section className="min-h-screen bg-[#111] text-gray-200 pb-20 pt-10">
            <div className="container mx-auto px-4">
                
                {/* CÍMSOR */}
                <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
                    Foglalás véglegesítése
                </h1>

                <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- BAL OLDAL: ŰRLAPOK --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Bérlés Időtartama */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                1. Bérlés Időtartama
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Mikortól?</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                        onChange={(e) => setDates({...dates, start: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Meddig?</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                        onChange={(e) => setDates({...dates, end: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Számlázási Adatok */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                2. Számlázási Adatok
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Vezetéknév *</label>
                                    <input type="text" placeholder="Kovács" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Keresztnév *</label>
                                    <input type="text" placeholder="János" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Cím *</label>
                                <input type="text" placeholder="1051 Budapest, Fő utca 1." className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" required />
                            </div>
                        </div>

                        {/* Fizetési Mód */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                3. Fizetési Mód
                            </h2>
                            
                            {/* Opciók */}
                            <div className="space-y-3 mb-6">
                                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-[#2a2e35]'}`}>
                                    <input 
                                        type="radio" name="payment" value="card" 
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="w-4 h-4 text-green-500 accent-green-500"
                                    />
                                    <span className="ml-3 font-medium text-white flex items-center gap-2"><CreditCard size={18}/> Bankkártyás fizetés</span>
                                </label>

                                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-[#2a2e35]'}`}>
                                    <input 
                                        type="radio" name="payment" value="transfer" 
                                        checked={paymentMethod === 'transfer'}
                                        onChange={() => setPaymentMethod('transfer')}
                                        className="w-4 h-4 text-green-500 accent-green-500"
                                    />
                                    <span className="ml-3 font-medium text-white flex items-center gap-2"><MapPin size={18}/> Banki átutalás (előre)</span>
                                </label>
                            </div>

                            {/* Kártya adatok (Csak ha kártya van kiválasztva) */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Kártyaszám</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Lejárati dátum</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">CVC kód</label>
                                            <input type="text" placeholder="123" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Fizetés gomb */}
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-green-500/20 transition-all">
                            Fizetés és Foglalás
                        </button>
                    </div>

                    {/* --- JOBB OLDAL: ÖSSZEFOGLALÓ (STICKY) --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800 sticky top-24 shadow-2xl">
                            <h3 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
                                🚗 Foglalás Összefoglaló
                            </h3>

                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                A költségek a választott dátumok alapján frissülnek. A végleges, hivatalos árat a szerver számolja ki a foglalás elküldésekor.
                            </p>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-300">Autó:</span>
                                    <span className="font-bold text-white text-right">{car.brand} {car.model} ({car.year})</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-300">Napi díj:</span>
                                    <span className="font-bold text-white">{car.price_per_day.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-300">Bérelt napok:</span>
                                    <span className="font-bold text-white">{totalDays} nap</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-300">Bérlési díj (becsült):</span>
                                    <span className="font-bold text-white">{totalPrice.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-300">Kaució:</span>
                                    <span className="font-bold text-white">{(car.deposit || 50000).toLocaleString()} Ft</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                                <span className="text-green-500 font-bold">Végösszeg (becsült):</span>
                                <span className="text-2xl font-bold text-green-500">
                                    {(totalPrice + (car.deposit || 50000)).toLocaleString()} Ft
                                </span>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
}