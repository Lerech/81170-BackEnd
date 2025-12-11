import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        if (!fs.existsSync(this.path)) return [];
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id == id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: newId,
            status: true,
            thumbnails: [],
            ...product
        };

        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);

        if (index === -1) return null;

        // No permitir cambiar el ID
        delete updatedFields.id;

        products[index] = { ...products[index], ...updatedFields };
        await this.saveProducts(products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id != id);
        await this.saveProducts(filtered);
        return products.length !== filtered.length;
    }
}
