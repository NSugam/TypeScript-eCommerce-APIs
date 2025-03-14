import { cartEntity } from "../entity/cartEntity"

exports.addToCart = async (req: any, res: any, next: any) => {
    const { productId, qty } = req.body
    try {
        const myCart: any = await cartEntity.findOne({ where: { username: req.user.username, productId: productId } })
        if (!myCart) {
            await cartEntity.create({ username: req.user.username, productId: productId, qty: qty }).save()
            return res.status(200).json({ message: "Product added to cart", success: true });
        }
        myCart.qty = myCart.qty + qty
        await myCart.save()
        res.status(200).json({ message: "Product quantity updated", success: true });

    } catch (error) { next(error) }
}

exports.decreaseQty = async (req: any, res: any, next: any) => {
    const { productId, qty } = req.body
    try {
        const myCart: any = await cartEntity.findOne({ where: { username: req.user.username, productId: productId } })

        if (!myCart)
            res.status(400).json({ message: "Product not found", success: false });

        if (myCart.qty > qty) myCart.qty -= qty
        else cartEntity.delete(myCart)

        await myCart.save()
        res.status(200).json({ message: "Product quantity updated", success: true });

    } catch (error) { next(error) }
}

exports.getCartItems = async (req: any, res: any, next: any) => {
    try {
        const myCart: any = await cartEntity.find({ where: { username: req.user.username } })
        return res.status(200).json({ message: "Cart Items", username: req.user.username, success: true, myCart });

    } catch (error) { next(error) }

}