import { orderEntity } from "../entity/orderEntity";
import { productEntity } from "../entity/productEntity";

exports.getAllOrders = async (req: any, res: any, next: any) => {
    try {
        const myOrders: any = await orderEntity.find({ where: { username: req.user.username } })
        return res.status(200).json({ message: "User Order History", username: req.user.username, success: true, myOrders });

    } catch (error) { next(error) }
}

exports.placeOrder = async (req: any, res: any, next: any) => {
    const { productId, qty, status } = req.body
    try {
        let productDetails: any = await productEntity.findOne({
            where: { id: productId },
            select: ['title', 'description', 'price']
        });
        if (!productDetails) return res.status(404).json({ message: "Product not found", success: false })

        let TotalAmount = productDetails.price * qty

        await orderEntity.create({
            username: req.user.username,
            productId: productId,
            qty: qty,
            TotalAmount: TotalAmount,
            productInfo: productDetails,
            status: status
        }).save()

        return res.status(200).json({ message: "Order has been placed", success: true, "Product Detail": productDetails });

    } catch (error) { next(error) }
}

exports.updateOrder = async (req: any, res: any, next: any) => {
    const { orderId } = req.body
    try {
        const orderDetails = await orderEntity.findOne({ where: { id: orderId } })
        if (!orderDetails) return res.status(404).json({ message: "Order details not found", success: false })

        orderEntity.merge(orderDetails, { ...req.body }).save()
        res.json({ message: "Order details Updated Successfully", success: true, orderDetails })

    } catch (error) { next(error) }
}

exports.deleteOrder = async (req: any, res: any, next: any) => {
    const { orderId } = req.body
    try {
        let orderDetail = await orderEntity.delete(orderId)
        if (!orderDetail) return res.status(404).json({ message: "Order not found", success: false })

        res.status(200).json({ message: "Order has been Deleted", success: true, orderDetail })

    } catch (error) { next(error) }
}
