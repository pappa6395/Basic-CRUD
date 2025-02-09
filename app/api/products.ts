
export type Product = {
    id: string;
    price: number;
    quantity: number;
    category?: string;
};

const STORAGE_KEY = "products";

const getProducts = (): Product[] => {
    if (typeof window === "undefined") return [];
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
};

const saveProducts = (products: Product[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    
    const products = getProducts();
    const newProduct: Product = { id: crypto.randomUUID(), ...product };
    products.push(newProduct);
    saveProducts(products);
    console.log("Product added:", newProduct);
    return newProduct;
};

export const getAllProducts = async (): Promise<Product[]> => getProducts();

export const updateProduct = async (id: string, updatedFields: Partial<Omit<Product, "id">>): Promise<Product | null> => {
    let products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        saveProducts(products);
        return products[index];
    }
    return null;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    let products = getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length !== products.length) {
        saveProducts(filteredProducts);
        return true;
    }

    return false;
};