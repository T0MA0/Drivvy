import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterData } from '@/services/authentication';

export const useRegister = () => {
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Input változás kezelése
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Checkbox logika
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptedTerms(e.target.checked);
    };

    // Beküldés logika
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirm_password) {
            setError("A két jelszó nem egyezik meg!");
            setLoading(false);
            return;
        }

        if (!acceptedTerms) {
            setError("A regisztrációhoz el kell fogadnod az ÁSZF-et!");
            setLoading(false);
            return;
        }

        try {
            // Csak azokat az adatokat küldjük, amik kellenek az API-nak
            const apiData: RegisterData = {
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name
            };
            await registerUser(apiData);
            router.push('/bejelentkezes');
        } catch (err: any) {
            setError(err.message || "Nem sikerült elérni a szervert.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        error,
        loading,
        acceptedTerms,
        handleChange,
        handleCheckbox,
        onSubmit
    };
};