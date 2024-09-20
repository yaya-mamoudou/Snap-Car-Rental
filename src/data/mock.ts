import { ArrowLeftRight, Car, Grid2X2, NotebookPen, UserRound, Users } from "lucide-react";
import { z } from "zod";
import { BookingStatus } from "~/types";

export const car = (index: number) => (
    {
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
    }
)
export const cars = (length = 3) => Array.from({ length }, (_, index) => (car(index)));

export const allCars = [
    { "label": "Toyota Camry, 2022", "value": "toyota_camry_2022" },
    { "label": "Honda Accord, 2021", "value": "honda_accord_2021" },
    { "label": "Tesla Model 3, 2023", "value": "tesla_model_3_2023" },
    { "label": "Ford Mustang, 2020", "value": "ford_mustang_2020" },
    { "label": "BMW 3 Series, 2022", "value": "bmw_3_series_2022" }
]

export const sidebarMenu = [
    { title: 'Dashboard', path: '/dashboard', icon: Grid2X2, },
    { title: 'Bookings', path: '/dashboard/booking', icon: ArrowLeftRight, },
    { title: 'Cars', path: '/dashboard/cars', icon: Car, },
    {
        title: 'Users',
        path: '/dashboard/users',
        icon: Users,
    }
]

export const locations = [
    { label: '13802 Castle Blvd, Silver Spring, MD 20904', value: '39.08429011596282,-76.94432984573987' }
]

export const stats = [
    {
        type: "cars",
        name: "Cars",
        amount: 10,
        icon: Car,
    },
    {
        type: "users",
        name: "Users",
        amount: 30,
        icon: UserRound,
    },
    {
        type: "booking",
        name: "Bookings",
        amount: 7,
        icon: NotebookPen,
    },
];

export const dashboardCars = [
    {
        "car": "Honda Accord, 2021",
        status: BookingStatus.PAID_AND_ONGOING
    },
    {
        "car": "Tesla Model 3, 2023",
        status: BookingStatus.PAID
    },
    {
        "car": "Ford Mustang, 2020",
        status: BookingStatus.PENDIND_PAYMENT
    },
    {
        "car": "BMW 3 Series, 2022",
        status: BookingStatus.PENDIND_PAYMENT
    },
    {
        "car": "Toyota Camry, 2022",
        status: BookingStatus.EXPIRED
    }
]

export const users = [
    {
        name: "Yaya Mamoudou",
        createdAt: "2023-08-24T06:22:56.7890Z",
        profile: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
        name: "Akwo Ashang",
        createdAt: "2023-08-13T23:14:28.7890Z",
        profile: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        name: "Mobile Bissenge",
        createdAt: "2023-09-30T11:09:46.7890Z",
        profile: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
        name: "Ngala Alain",
        createdAt: "2023-09-22T01:26:39.7890Z",
        profile: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
        name: "Muma Brian",
        createdAt: "2023-08-12T15:38:50.7890Z",
        profile: "https://randomuser.me/api/portraits/men/14.jpg",
    },
];

export const bookings = [
    {
        "car": "Honda Accord, 2021",
        "user": "Yaya Mamoudou",
        "startDate": "2024-08-24T06:22:56.789Z",
        "endDate": "2024-08-28T06:22:56.789Z",
        status: BookingStatus.PAID_AND_ONGOING
    },
    {
        "car": "Tesla Model 3, 2023",
        "user": "Akwo Ashang",
        "startDate": "2024-08-13T23:14:28.789Z",
        "endDate": "2024-08-19T23:14:28.789Z",
        status: BookingStatus.PAID

    },
    {
        "car": "Ford Mustang, 2020",
        "user": "Mobile Bissenge",
        "startDate": "2023-09-30T11:09:46.789Z",
        "endDate": "2023-10-03T11:09:46.789Z",
        status: BookingStatus.PENDIND_PAYMENT
    },
    {
        "car": "BMW 3 Series, 2022",
        "user": "Ngala Alain",
        "startDate": "2023-09-22T01:26:39.789Z",
        "endDate": "2023-09-25T01:26:39.789Z",
        status: BookingStatus.PENDIND_PAYMENT
    },
    {
        "car": "Toyota Camry, 2022",
        "user": "Muma Brian",
        "startDate": "2023-08-12T15:38:50.789Z",
        "endDate": "2023-08-16T15:38:50.789Z",
        status: BookingStatus.EXPIRED
    }
]

export const status = [
    { label: "Booked", value: "BOOKED" },
    { label: "Available", value: "AVAILABLE" },
    { label: "Unavailable", value: "UNAVAILABLE" },
];

export const engines = [
    { label: "Diesel", value: "diesel" },
    { label: "Available", value: "available" },
];

export const wheel = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
];

export const paginationSchema = z.object({
    per_page: z.number(),
    page: z.number(),
    sort: z.enum(['desc', 'asc'])
})