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
    const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' vagy 'transfer'
    
    // Számolt értékek
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // 1. Autó adatainak betöltése
    useEffect(() => {
        if (params.id) {
            getCarById(params.id as string).then((data) => {
                setCar(data);
                setLoading(false);
            });
        }
    }, [params.id]);

    // 2. Árkalkuláció, amikor változik a dátum
    useEffect(() => {
        if (dates.start && dates.end && car) {
            const start = new Date(dates.start);
            const end = new Date(dates.end);
            
            // Különbség napokban (milliszekundumból számolva)
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            // Ha a végdátum előbb van, mint a kezdő, vagy ugyanaz a nap, legyen 1 nap minimum
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
        <section className="min-h-screen bg-[#111] text-gray-200 pb-20">
            
            <div className="relative w-full h-[250px] flex flex-col items-center justify-center bg-zinc-900 overflow-hidden">
                 
                 <div className="absolute inset-0 bg-[url('/behind_berlo.png')] bg-cover bg-center opacity-30 blur-sm"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 via-[#111]/40 to-[#111]"></div>
                 <div className="relative z-10 text-center mt-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                        Foglalás Véglegesítése
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Már csak egy lépés választ el az élménytől
                    </p>
                 </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                
                <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- BAL OLDAL: ŰRLAPOK --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Bérlés Időtartama */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800 shadow-xl">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                <Calendar size={20} /> 1. Bérlés Időtartama
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Mikortól?</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors cursor-pointer"
                                        onChange={(e) => setDates({...dates, start: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Meddig?</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors cursor-pointer"
                                        onChange={(e) => setDates({...dates, end: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Számlázási Adatok */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800 shadow-xl">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                <User size={20} /> 2. Számlázási Adatok
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

                        {/* 3. Fizetési Mód */}
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800">
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800 shadow-xl">
                            <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                                <CreditCard size={20} /> 3. Fizetési Mód
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
                                    <span className="ml-3 font-medium text-white flex items-center gap-2">Bankkártyás fizetés</span>
                                </label>

                                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-[#2a2e35]'}`}>
                                    <input 
                                        type="radio" name="payment" value="transfer" 
                                        checked={paymentMethod === 'transfer'}
                                        onChange={() => setPaymentMethod('transfer')}
                                        className="w-4 h-4 text-green-500 accent-green-500"
                                    />
                                    <span className="ml-3 font-medium text-white flex items-center gap-2">Banki átutalás (előre)</span>
                                </label>
                            </div>

                            {/* Kártya adatok */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-fadeIn border-t border-gray-700 pt-4 mt-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Kártyaszám</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#2a2e35] border border-gray-700 rounded-lg p-3 pl-10 text-white focus:border-green-500 focus:outline-none" />
                                        </div>
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
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                            <CheckCircle size={24} /> Fizetés és Foglalás
                        </button>
                    </div>

                    {/* --- JOBB OLDAL: ÖSSZEFOGLALÓ (STICKY) --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1b1e24] p-6 rounded-xl border border-gray-800 sticky top-24 shadow-2xl">
                            <h3 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2 border-b border-gray-700 pb-4">
                                🚗 Foglalás Összefoglaló
                            </h3>

                            {car && (
                                <div className="mb-6">
                                     {/* Kép az autóról */}
                                     <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden border border-gray-700">
                                        <img 
                                            src={car.image ? (car.image.startsWith('/') ? car.image : `/${car.image}`) : '/placeholder.jpg'} 
                                            alt={car.brand} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-white font-bold">
                                            {car.brand} {car.model}
                                        </div>
                                     </div>
                                </div>
                            )}

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Napi díj:</span>
                                    <span className="font-bold text-white">{car?.price_per_day.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Bérelt napok:</span>
                                    <span className="font-bold text-white">{totalDays} nap</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Kaució:</span>
                                    <span className="font-bold text-white">{(car?.deposit || 50000).toLocaleString()} Ft</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                                <span className="text-green-500 font-bold uppercase tracking-wide">Végösszeg:</span>
                                <span className="text-2xl font-extrabold text-green-500">
                                    {(totalPrice + (car?.deposit || 50000)).toLocaleString()} Ft
                                </span>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4 text-center">
                                A foglalás gombra kattintva elfogadod az ÁSZF-et.
                            </p>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
}