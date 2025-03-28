import { productEntity } from "../entity/productEntity";
import { redisClient } from "../../redisClient";

// Get all products
exports.getAllProducts = async (req: any, res: any, next: any) => {
    try {
        const cachedData = await redisClient.get("productData");
        if (cachedData) {
            return res.status(200).json({
                message: "All Products Data (Cached)",
                success: true,
                all_products: JSON.parse(cachedData)
            });
        }
        const products = await productEntity.find();
        await redisClient.set("productData", JSON.stringify(products), { EX: 3600 })//1hr
        res.status(200).json({ message: "All Products Data", success: true, products })

    } catch (error) { next(error) }
};

// Add a new product
exports.addProduct = async (req: any, res: any, next: any) => {
    const { title, price, description, stock, sku } = req.body;

    const productData = await productEntity.findOne({ where: { sku: sku } })
    if (productData)
        return res.status(409).json({ message: "Product already exist", success: false });

    try {
        await productEntity.create({ title, price, description, stock, sku }).save();
        const products = await productEntity.find()
        await redisClient.set("productData", JSON.stringify(products), { EX: 3600 })
        return res.status(200).json({ message: "Product added successfully", success: true });

    } catch (error) { next(error) }
}

// Update a product details
exports.updateProduct = async (req: any, res: any, next: any) => {
    const { productId } = req.body
    try {
        const product = await productEntity.findOne({ where: { id: productId } })
        productEntity.merge(product, { ...req.body }).save()
        if (!product) return res.status(404).json({ message: "Product not found", success: false })

        res.json({ message: "Product Updated Successfully", success: true, product })

    } catch (error) { next(error) }
}

// Delete a product
exports.deleteProduct = async (req: any, res: any, next: any) => {
    const { productId } = req.body
    try {
        let product = await productEntity.delete(productId)
        if (!product) return res.status(404).json({ message: "Product not found", success: false })

        res.status(200).json({ message: "Product Deleted Successfully", success: true, product })

    } catch (error) { next(error) }
}
