import { ArrowLeftRight, Car, Grid2X2, Users } from "lucide-react";

export const cars = (length = 3) => Array.from({ length }, (_, index) => ({
    images: [
        "/images/cars/car3.jpg",
        "/images/cars/car1.webp",
        "/images/cars/car2.jpg",
    ],
    name: "Toyota Camry, 2022",
    price: { daily: "$35", month: "$960" },
    seats: "5",
    gear: "Auto",
    bags: "4",
    engine: "Disel",
    id: index
}));

export const sidebarMenu = [
    { title: 'Dashboard', path: '/dashboard', icon: Grid2X2, },
    { title: 'Bookings', path: '/dashboard/booking', icon: ArrowLeftRight, },
    { title: 'Cars', path: '/dashboard/cars', icon: Car, },
    {
        title: 'Users',
        path: '/dashboard/users',
        icon: Users,
    },
]