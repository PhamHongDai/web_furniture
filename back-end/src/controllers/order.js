const {Order, DeliveryInfo, Cart, Category, Product} = require("../models");

exports.addOrder = async (req, res) => {
    const {items, address, totalAmount, paymentStatus, paymentType} = req.body;
    const orderStatus = [
        {
            type: "ordered",
            date: new Date(),
            isCompleted: true,
        },
        {
            type: "packed",
            isCompleted: false,
        },
        {
            type: "shipped",
            isCompleted: false,
        },
        {
            type: "delivered",
            isCompleted: false,
        },
    ];

    let productId;
    let variantId;
    let quantity;
    for (const item of items) {
        productId = item.product
        variantId = item.variant
        quantity = item.quantity
        Product.findOne({_id: productId})
            .exec((error, product) => {
                if (error) return res.status(400).json({error})
                const foundVariant = product.variants.find(variant => variant._id == variantId)
                if (foundVariant) {
                    foundVariant.quantity = foundVariant.quantity - quantity
                    product.save()
                }
            })
        await Cart.updateOne(
            {user: req.user._id},
            {
                $pull: {
                    cartItems: {
                        product: item.product,
                        variant: item.variant,
                    },
                },
            }
        ).exec((error, result) => {
            if (error) return res.status(400).json({error});
        });
    }

    const order = new Order({
        user: req.user._id,
        address,
        totalAmount,
        items,
        paymentStatus,
        paymentType,
        orderStatus,
    });

    order.save((error, order) => {
        if (error) return res.status(400).json({error});
        if (order) {
            res.status(201).json({message: "Add order successfully"});
        }
    });
};

exports.getOrder = (req, res) => {
    const {orderId} = req.body;
    Order.findOne({_id: orderId})
        .populate("items.product")
        .lean()
        .exec((error, order) => {
            if (error) return res.status(400).json({error});
            if (order) {
                DeliveryInfo.findOne({user: req.user._id}).exec((error, dI) => {
                    if (error) return res.status(400).json({error});
                    order.address = dI.address.find(
                        (address) => address._id == order.address
                    );
                    res.status(200).json({order});
                });
            }
        });
};

exports.updateStatus = (req, res) => {
    const {_id, type, oldType, paymentStatus, items} = req.body;
    console.log(_id, type, oldType, paymentStatus)
    
    if (paymentStatus === "cancelled"){
        let productId;
        let variantId;
        let quantity;
        for (const item of items) {
            productId = item.product._id
            variantId = item.variant
            quantity = item.quantity
            Product.findOne({_id: productId})
                .exec((error, product) => {
                    if (error) return res.status(400).json({error})
                    const foundVariant = product.variants.find(variant => variant._id == variantId)
                    if (foundVariant) {
                        foundVariant.quantity = foundVariant.quantity + quantity
                        product.save()
                    }
                })
            }
    }
    Order.findOneAndUpdate({_id: _id, "orderStatus.type": oldType},
        {
            $set: {
                "orderStatus.$": [
                    {type: oldType, date: new Date(), isCompleted: false},
                ],

            },
        },
        {new: true, upsert: true}
    ).exec((error) => {
        if (error) return res.status(400).json({error});
    });
    Order.findOneAndUpdate({_id: _id, "orderStatus.type": type},
        {
            $set: {
                "orderStatus.$": [
                    {type: type, date: new Date(), isCompleted: true},
                ],

            },
        },
        {new: true, upsert: true}
    ).exec((error,order) => {
        if (error) return res.status(400).json({error});
        if (order && !paymentStatus) {
            getallOrder(res, 202);
    }});
    if(paymentStatus){
    Order.findOneAndUpdate(
        {_id: _id},
        {paymentStatus: paymentStatus},
        {new: true, upsert: true}
    ).exec((error, order) => {
        if (error) return res.status(400).json({error});
        if (order) {
            getallOrder(res, 202);
        } else {
            res.status(400).json({error: "something went wrong"});
        }
    });}
}

async function getallOrder(res, status = 200) {
    try {
        const orders = await Order.find({paymentStatus: {$ne: "cancelled"}})
            .populate("items.product")
            .populate("user")
            .populate("address")
            .sort({createdAt: -1});
        res.status(200).json({orders});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getAllOrders = async (req, res) => {
    getallOrder(res, 200)
}

exports.getOrdersByUser = (req, res) => {
    Order.find({user: req.user._id})
        .populate("items.product")
        .sort({createdAt: -1})
        .exec((error, orders) => {
            if (error) return res.status(400).json({error});
            if (orders) {
                return res.status(200).json({orders});
            }
            res.status(400).json({error: "something went wrong"});
        });
};