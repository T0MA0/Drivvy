import Image from "next/image";
import { X, Star } from "lucide-react";

interface ModalProps {
    car: any;
    onClose: () => void;
}

export default function CarModal({ car, onClose }: ModalProps) {
    if (!car) return null;

    return (
        <div style={{ 
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', 
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="card" style={{ 
                width: '100%', maxWidth: '950px', padding: '0', overflow: 'hidden', position: 'relative',
                display: 'grid', gridTemplateColumns: '1fr 1.3fr', minHeight: '550px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Bal oldal: Kép */}
                <div style={{ position: 'relative', background: '#000', minHeight: '300px' }}>
                     <Image 
                        src={car.image || '/placeholder.jpg'} 
                        alt={car.brand}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Jobb oldal: Adatok */}
                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', background: '#1b1e24' }}>
                    <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X size={32} />
                    </button>

                    <h2 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginBottom: '0.5rem', lineHeight: 1 }}>
                        {car.brand} {car.model}
                    </h2>
                    <p style={{ color: 'var(--muted)', marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                        Tulajdonos: {car.owner?.first_name || 'Drivvy'} | 
                        <span style={{display:'flex', alignItems:'center', marginLeft:'5px', color: '#f1c40f'}}>
                            <Star size={14} fill="#f1c40f" style={{marginRight:'3px'}}/> 5.0
                        </span>
                    </p>

                    {/* Scrollos tartalom */}
                    <div style={{ overflowY: 'auto', maxHeight: '320px', paddingRight: '15px', flexGrow: 1 }}>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Részletes leírás</h4>
                        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '2rem', fontSize: '0.95rem' }}>
                            {car.description || "Prémium élmény! Teljesen új modell, automata váltóval. Kényelem és elegancia egyben. Hosszabb utakra is kiválóan alkalmas."}
                        </p>

                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Bérlés feltételei</h4>
                        <ul style={{ color: '#ccc', listStyle: 'none', padding: 0, lineHeight: '2', fontSize: '0.95rem' }}>
                            <li>📍 <strong>Átvétel:</strong> Győr, Széchenyi tér</li>
                            <li>⏱️ <strong>Minimum bérlés:</strong> 1 nap</li>
                            <li>💰 <strong>Kaució:</strong> {parseInt(car.deposit || 50000).toLocaleString()} Ft</li>
                            <li>📅 <strong>Foglalt napok:</strong> Nincs</li>
                        </ul>
                    </div>

                    {/* Alsó sáv */}
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div>
                            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>
                                {parseInt(car.price_per_day).toLocaleString()}
                            </span>
                            <span style={{ fontSize: '1rem', color: 'white' }}> / nap (Ft)</span>
                        </div>
                        
                        <button className="btn btn--primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}>
                            Jelentkezz be a foglaláshoz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}