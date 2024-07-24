export const cars = (length = 3) => Array.from({ length }, () => ({
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
}));