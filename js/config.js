// Corazón Natural - Configuration and Data

// Global Variables
let products = [];
let cart = [];
let currentFilter = 'all';
let productsLoaded = 12;
const productsPerPage = 12;

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
    phoneNumber: '573019638924', // +57 301 9638924
    businessName: 'Corazón Natural'
};

// Product Data - Using your available images
const productData = [
    {
        id: 1,
        name: "Té Verde Orgánico",
        category: "infusiones",
        price: 25000,
        originalPrice: 30000,
        image: "imagenes/madrid1.png",
        description: "Té verde 100% orgánico, rico en antioxidantes y propiedades depurativas.",
        benefits: ["Antioxidante", "Energizante", "Digestivo"],
        stock: 15
    },
    {
        id: 2,
        name: "Aceite de Coco Virgen",
        category: "aceites",
        price: 35000,
        originalPrice: 40000,
        image: "imagenes/madrid2.png",
        description: "Aceite de coco virgen extraído en frío, ideal para cocina y cuidado personal.",
        benefits: ["Hidratante", "Nutritivo", "Antimicrobiano"],
        stock: 22
    },
    {
        id: 3,
        name: "Calcio con Cloruro de Magnesio 400gr",
        category: "suplementos",
        price: 46000,
        originalPrice: 52000,
        image: "imagenes/madrid3.png",
        description: "Suplemento de calcio con cloruro de magnesio para el fortalecimiento de huesos y sistema óseo.",
        benefits: ["Fortalece huesos", "Mejora absorción", "Salud ósea"],
        stock: 25
    },
    {
        id: 4,
        name: "Citrato de Potasio 450gr",
        category: "suplementos",
        price: 45000,
        originalPrice: 50000,
        image: "imagenes/madrid4.png",
        description: "Tratamiento para cálculos renales, nivela el potasio en sangre y disminuye el ácido úrico.",
        benefits: ["Previene cálculos", "Equilibra potasio", "Reduce ácido úrico"],
        stock: 20
    },
    {
        id: 5,
        name: "Chromium Picolinato 100 Cápsulas",
        category: "suplementos",
        price: 40000,
        originalPrice: 45000,
        image: "imagenes/madrid5.png",
        description: "Control de diabetes y mejora del colesterol. Suplemento de cromo para metabolismo de glucosa.",
        benefits: ["Control diabetes", "Mejora colesterol", "Metabolismo glucosa"],
        stock: 30
    },
    {
        id: 6,
        name: "Promax Licopeno",
        category: "suplementos",
        price: 25000,
        originalPrice: 28000,
        image: "imagenes/madrid6.png",
        description: "Suplemento especializado para el tratamiento y cuidado de la próstata masculina.",
        benefits: ["Salud prostática", "Antioxidante", "Bienestar masculino"],
        stock: 22
    },
    {
        id: 7,
        name: "Ajo 180 Tabletas",
        category: "suplementos",
        price: 18000,
        originalPrice: 22000,
        image: "imagenes/madrid7.png",
        description: "Control de presión arterial y tratamiento natural para hongos. Ajo concentrado en tabletas.",
        benefits: ["Control presión", "Antifúngico", "Cardiovascular"],
        stock: 35
    },
    {
        id: 8,
        name: "KDS Super 700gr",
        category: "suplementos",
        price: 48000,
        originalPrice: 55000,
        image: "imagenes/madrid8.png",
        description: "Suplemento multivitamínico especializado para estimular el apetito en niños y adolescentes.",
        benefits: ["Estimula apetito", "Multivitamínico", "Crecimiento infantil"],
        stock: 18
    },
    {
        id: 9,
        name: "Gomitas de Vitamina C + Zinc 48 unidades",
        category: "suplementos",
        price: 32000,
        originalPrice: 36000,
        image: "imagenes/madrid9.png",
        description: "Gomitas masticables para el fortalecimiento del sistema inmune con vitamina C y zinc.",
        benefits: ["Fortalece inmunidad", "Fácil consumo", "Vitamina C y Zinc"],
        stock: 28
    },
    {
        id: 10,
        name: "Gomitas de Probióticos 45 unidades",
        category: "suplementos",
        price: 39000,
        originalPrice: 44000,
        image: "imagenes/madrid10.png",
        description: "Gomitas probióticas para beneficio de la salud digestiva y fortalecimiento del sistema inmune.",
        benefits: ["Salud digestiva", "Probióticos", "Sistema inmune"],
        stock: 24
    },
    {
        id: 11,
        name: "Producto 11",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid11.png",
        description: "Descripción del producto 11 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 12,
        name: "Producto 12",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid12.png",
        description: "Descripción del producto 12 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 13,
        name: "Producto 13",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid3.png",
        description: "Descripción del producto 13 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 14,
        name: "Producto 14",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid13.png",
        description: "Descripción del producto 14 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 15,
        name: "Producto 15",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid14.png",
        description: "Descripción del producto 15 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 16,
        name: "Producto 16",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid15.png",
        description: "Descripción del producto 16 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 17,
        name: "Producto 17",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid16.png",
        description: "Descripción del producto 17 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 18,
        name: "Producto 18",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid17.png",
        description: "Descripción del producto 18 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 19,
        name: "Producto 19",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid18.png",
        description: "Descripción del producto 19 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 20,
        name: "Producto 20",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid20.png",
        description: "Descripción del producto 20 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 21,
        name: "Producto 21",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid21.png",
        description: "Descripción del producto 21 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 22,
        name: "Producto 22",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (22).png",
        description: "Descripción del producto 22 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 23,
        name: "Producto 23",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (23).png",
        description: "Descripción del producto 23 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 24,
        name: "Producto 24",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (24).png",
        description: "Descripción del producto 24 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 25,
        name: "Producto 25",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (25).png",
        description: "Descripción del producto 25 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 26,
        name: "Producto 26",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (26).png",
        description: "Descripción del producto 26 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 27,
        name: "Producto 27",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (27).png",
        description: "Descripción del producto 27 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 28,
        name: "Producto 28",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (28).png",
        description: "Descripción del producto 28 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 29,
        name: "Producto 29",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/madrid19.png",
        description: "Descripción del producto 29 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 30,
        name: "Producto 30",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (30).png",
        description: "Descripción del producto 30 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 31,
        name: "Producto 31",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (31).png",
        description: "Descripción del producto 31 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 32,
        name: "Producto 32",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (32).png",
        description: "Descripción del producto 32 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 33,
        name: "Producto 33",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (33).png",
        description: "Descripción del producto 33 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 34,
        name: "Producto 34",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (34).png",
        description: "Descripción del producto 34 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 35,
        name: "Producto 35",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (35).png",
        description: "Descripción del producto 35 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 36,
        name: "Producto 36",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (36).png",
        description: "Descripción del producto 36 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 37,
        name: "Producto 37",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (37).png",
        description: "Descripción del producto 37 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 38,
        name: "Producto 38",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (38).png",
        description: "Descripción del producto 38 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    },
    {
        id: 39,
        name: "Producto 39",
        category: "suplementos",
        price: 30000,
        originalPrice: 35000,
        image: "imagenes/MADRID (39).png",
        description: "Descripción del producto 39 - pendiente de actualizar",
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        stock: 15
    }
];