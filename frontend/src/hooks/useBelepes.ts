import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser } from '@/services/authentication';
import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Ez olvassa ki az URL-t
    const { login } = useAuth(); // A contextből vesszük a login funkciót
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // API hívás
            const data = await loginUser(formData);
            
            // Mentés a Contextbe (Global State)
            await login(data.access, data.refresh);

            // ÁTIRÁNYÍTÁS (Vissza az előző oldalra)
            const callbackUrl = searchParams.get('callbackUrl') || '/'; // Ha nincs, akkor főoldal
            router.push(callbackUrl);
            
        } catch (err: any) {
            setError(err.message || "Sikertelen bejelentkezés.");
        } finally {
            setLoading(false);
        }
    };

    return { formData, error, loading, handleChange, onSubmit };
};