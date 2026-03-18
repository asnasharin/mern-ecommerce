const asyncHandler = require("asyncHandler");
const orderModel = require("../models/orderModel")


export const createOrder = asyncHandler(
    async(req, res) => {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus
        } = req.body

        const order = await orderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus,
            user : req.user._id,
            paidAt: Date.now(),
        })

        res.status(200).send({
            success: true,
            order
        })
    }
)