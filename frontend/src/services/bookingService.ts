import API_URL from "@/lib/api";

interface BookingData {
    car: number;
    start_date: string;
    end_date: string;
}

export const createBooking = async (bookingData: BookingData) => {
    const token = localStorage.getItem("access");

    if (!token) {
        throw new Error("Nincs bejelentkezve! A foglaláshoz bejelentkezés szükséges!");
    }

    try {
        const response = await fetch(`${API_URL}/bookings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Itt csatoljuk a tokent
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data) || "Sikertelen foglalás");
        }

        return data;
    } catch (error) {
        console.error("BookingService Error:", error);
        throw error;
    }
};