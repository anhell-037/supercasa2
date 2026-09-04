export type Status = "have" | "need_to_buy" | "missing";

export type FamilyMember = { id: string; name: string };
export type Store = { id: string; name: string; order_index: number };
export type Product = {
  id: string;
  store_id: string;
  category: string | null;
  name: string;
  order_index: number;
  status: Status;
  updated_by: string;
  updated_at: string;
};

export const familyMembers: FamilyMember[] = [
  { id: "angel", name: "Angel" },
  { id: "ceci", name: "Ceci" },
  { id: "jose", name: "Jose" },
  { id: "erick", name: "Erick" },
  { id: "mama", name: "Mama" },
];

export const initialStores: Store[] = [
  { id: "walmart", name: "Walmart", order_index: 0 },
  { id: "pricemart", name: "PriceSmart", order_index: 1 },
  { id: "deposito", name: "Depósito El Único", order_index: 2 },
];

const now = "2026-08-26T00:00:00.000Z";

const makeProduct = (
  id: string,
  store_id: string,
  category: string | null,
  name: string,
  order_index: number,
): Product => ({
  id,
  store_id,
  category,
  name,
  order_index,
  status: "need_to_buy",
  updated_by: "Ana",
  updated_at: now,
});

export const initialProducts: Product[] = [
  makeProduct("walmart-1", "walmart", "Carnes y embutidos", "Pierna Tyson con cuadril importada 10 lb", 0),
  makeProduct("walmart-2", "walmart", "Carnes y embutidos", "Pierna con cuadril Pio Lindo blanca (por lb)", 1),
  makeProduct("walmart-3", "walmart", "Carnes y embutidos", "Posta Don Cristobal de cerdo familiar (por lb)", 2),
  makeProduct("walmart-4", "walmart", "Carnes y embutidos", "Lomo de cinta cerdo importado (por lb)", 3),
  makeProduct("walmart-5", "walmart", "Carnes y embutidos", "Carne Don Cristobal molida de cerdo (por lb)", 4),
  makeProduct("walmart-6", "walmart", "Pollo / arroz", "Arroz Macarena blanco 400 g", 0),
  makeProduct("walmart-7", "walmart", "Verduras y vegetales", "Zanahoria granel (por lb)", 0),
  makeProduct("walmart-8", "walmart", "Verduras y vegetales", "Tomate de cocina en red 3 lb", 1),
  makeProduct("walmart-9", "walmart", "Verduras y vegetales", "Cebolla blanca (por lb)", 2),
  makeProduct("walmart-10", "walmart", "Verduras y vegetales", "Cebolla amarilla (por lb)", 3),
  makeProduct("walmart-11", "walmart", "Verduras y vegetales", "Chile pimiento (por lb)", 4),
  makeProduct("walmart-12", "walmart", "Verduras y vegetales", "Chile dulce morrón rojo Hortifruti", 5),
  makeProduct("walmart-13", "walmart", "Verduras y vegetales", "Chile jalapeño paquete 8 oz", 6),
  makeProduct("walmart-14", "walmart", "Verduras y vegetales", "Camote (por lb)", 7),
  makeProduct("walmart-15", "walmart", "Verduras y vegetales", "Apio verde (por lb)", 8),
  makeProduct("walmart-16", "walmart", "Verduras y vegetales", "Lechuga (por lb)", 9),
  makeProduct("walmart-17", "walmart", "Verduras y vegetales", "Pepino (por unidad)", 10),
  makeProduct("walmart-18", "walmart", "Verduras y vegetales", "Remolacha media docena", 11),
  makeProduct("walmart-19", "walmart", "Verduras y vegetales", "Zucchini fresco granel (por lb)", 12),
  makeProduct("walmart-20", "walmart", "Verduras y vegetales", "Zucchinis baby 454 g", 13),
  makeProduct("walmart-21", "walmart", "Verduras y vegetales", "Elote bandeja Shalom 4 unidades", 14),
  makeProduct("walmart-22", "walmart", "Verduras y vegetales", "Papa Hortifruti super red (por lb)", 15),
  makeProduct("walmart-23", "walmart", "Verduras y vegetales", "Acelga manojo", 16),
  makeProduct("walmart-24", "walmart", "Verduras y vegetales", "Surtimontes manojo", 17),
  makeProduct("walmart-25", "walmart", "Verduras y vegetales", "Cebollín en manojo", 18),
  makeProduct("walmart-26", "walmart", "Hierbas y condimentos", "Perejil manojo", 0),
  makeProduct("walmart-27", "walmart", "Hierbas y condimentos", "Ajos Hortifruti pelados 100 g", 1),
  makeProduct("walmart-28", "walmart", "Hierbas y condimentos", "Preparado Sazón para adobado 50 g", 2),
  makeProduct("walmart-29", "walmart", "Hierbas y condimentos", "Especias Malher chile cobanero 45 g", 3),
  makeProduct("walmart-30", "walmart", "Hierbas y condimentos", "Especias Sazón pepitoria 50 g", 4),
  makeProduct("walmart-31", "walmart", "Hierbas y condimentos", "Especias Sazón ajonjolí 75 g", 5),
  makeProduct("walmart-32", "walmart", "Despensa y abarrotes", "Aceite de oliva Great Value extra virgen 1500 ml", 0),
  makeProduct("walmart-33", "walmart", "Despensa y abarrotes", "Aceite Mazola natural blend 1350 ml", 1),
  makeProduct("walmart-34", "walmart", "Despensa y abarrotes", "Sal Sabemas de cocina 920 g", 2),
  makeProduct("walmart-35", "walmart", "Despensa y abarrotes", "Azúcar morena Los Tulipanes 800 g", 3),
  makeProduct("walmart-36", "walmart", "Despensa y abarrotes", "Frijoles Great Value negros 400 g", 4),
  makeProduct("walmart-37", "walmart", "Despensa y abarrotes", "Margarina Mazola con ajo y hierbas 400 g", 5),
  makeProduct("walmart-38", "walmart", "Pastas y salsas", "Pasta larga Roma lengua 200 g", 0),
  makeProduct("walmart-39", "walmart", "Pastas y salsas", "Pasta corta Roma plumas 200 g", 1),
  makeProduct("walmart-40", "walmart", "Pastas y salsas", "Pasta Roma coditos 200 g", 2),
  makeProduct("walmart-41", "walmart", "Pastas y salsas", "Pasta Ina chao mein con soya 180 g", 3),
  makeProduct("walmart-42", "walmart", "Pastas y salsas", "Pasta Kantón chao mein con soya 180 g", 4),
  makeProduct("walmart-43", "walmart", "Pastas y salsas", "Salsa Natura's italiana clásica 90 g", 5),
  makeProduct("walmart-44", "walmart", "Pastas y salsas", "Salsa de tomate Natura's con queso 90 g", 6),
  makeProduct("walmart-45", "walmart", "Pastas y salsas", "Salsa de tomate Natura ranchera 90 g", 7),
  makeProduct("walmart-46", "walmart", "Pastas y salsas", "Pasta Kern's de tomate doy pack 113 g", 8),
  makeProduct("walmart-47", "walmart", "Pastas y salsas", "Salsa Ina soya 355 ml", 9),
  makeProduct("walmart-48", "walmart", "Pastas y salsas", "Salsa Ina inglesa 355 ml", 10),
  makeProduct("walmart-49", "walmart", "Lácteos", "Leche deslactosada Coronado caja 12 uds / 12 L", 0),
  makeProduct("walmart-50", "walmart", "Pan y cereales", "Avena en hojuelas Quaker Mosh 1200 g", 0),
  makeProduct("walmart-51", "walmart", "Pan y cereales", "Cereal Gran Día Corn Flakes 500 g", 1),
  makeProduct("walmart-52", "walmart", "Bebidas", "Café Incasa instantáneo fuerte 250 g", 0),
  makeProduct("walmart-53", "walmart", "Bebidas", "Bebida en polvo Clight sin calorías limón 14 g", 1),
  makeProduct("walmart-54", "walmart", "Bebidas", "Bebida en polvo Bontea té frío durazno 30 g", 2),
  makeProduct("walmart-55", "walmart", "Mascotas", "Snack Dogui perro adulto pepperoni 200 g", 0),
  makeProduct("walmart-56", "walmart", "Mascotas", "Snack Dogui cachorro avena y manzana 150 g", 1),
  makeProduct("walmart-57", "walmart", "Limpieza y hogar", "Papel higiénico Great Value 2 ply 40 rollos", 0),
  makeProduct("walmart-58", "walmart", "Limpieza y hogar", "Toalla papel Scott Calorie Absorb 3 rollos", 1),
  makeProduct("walmart-59", "walmart", "Limpieza y hogar", "Toalla papel Scott Multi Absorb 3 rollos", 2),
  makeProduct("walmart-60", "walmart", "Limpieza y hogar", "Toallas húmedas extra large 80 uds", 3),
  makeProduct("walmart-61", "walmart", "Limpieza y hogar", "Detergente en polvo 123 Aloe Vera 1000 g", 4),
  makeProduct("walmart-62", "walmart", "Limpieza y hogar", "Esponja Scotch Brite doble uso anatómica 2 uds", 5),
  makeProduct("pricemart-1", "pricemart", "Alimentación", "Alimento gato Member's Selection pollo y guisantes 6.8 kg", 0),
  makeProduct("pricemart-2", "pricemart", "Aceites", "Aceite de oliva extra suave Member's Selection 2 L", 0),
  makeProduct("pricemart-3", "pricemart", "Café", "Café El Cafetalito Mountain Blend 2.3 kg / 5 lb", 0),
  makeProduct("deposito-1", "deposito", null, "Galletas cremitas", 0),
  makeProduct("deposito-2", "deposito", null, "Bolsas medianas de basura", 1),
  makeProduct("deposito-3", "deposito", null, "Bolsas de basura extra grande", 2),
  makeProduct("deposito-4", "deposito", null, "Lym azul", 3),
  makeProduct("deposito-5", "deposito", null, "Cigarros Pall Mall Alaska/Pepino", 4),
  makeProduct("deposito-6", "deposito", null, "Cartones de huevo", 5),
];

export const storageKeys = {
  family: "supercasa-family-member",
  stores: "supercasa-stores",
  products: "supercasa-products",
  memberProductStates: "supercasa-member-product-states",
};
