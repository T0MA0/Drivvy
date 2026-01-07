import Image from 'next/image';
import Link from 'next/link'; 
import { Star } from 'lucide-react'; 

interface CarProps {
    car: any;
    onOpenModal?: (car: any) => void; 
}

export default function CarCard({ car }: CarProps) {
    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Kép */}
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <Image 
                    src={car.image || '/audi_a4.jpg'} 
                    alt={`${car.brand} ${car.model}`}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Tartalom */}
            <div style={{ padding: '1.2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', color: 'white' }}>{car.brand} {car.model}</h3>
                
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    Tulajdonos: {car.owner?.first_name || 'Drivvy'} | 
                    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', color: '#f1c40f' }}>
                         Értékelés: <Star size={12} fill="#f1c40f" style={{marginLeft: '4px'}}/> 5.0
                    </span>
                </div>

                {/* Címkék (Tags) */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {[car.year, car.fuel_type, car.transmission].map((tag, i) => (
                        <span key={i} style={{ 
                            background: '#2c303a', color: '#aeb6c2', 
                            padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', 
                            border: '1px solid rgba(255,255,255,0.05)' 
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Alsó sáv (Ár + Gomb) */}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <div>
                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                            {parseInt(car.price_per_day).toLocaleString()} Ft
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}> / nap</span>
                    </div>
                    <Link 
                        href={`/autok/${car.id}`} 
                        className="btn btn--primary" 
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                        Részletek
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}