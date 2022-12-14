const {Product, Category, User} = require("../models");
const shortid = require("shortid");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
    const {name, price, description, category, discountPercent, variant} = req.body;
    let variants = [];
    for (let i = 0; i < variant.length; i += 2) {
        variants.push({name: variant[i], quantity: parseInt(variant[i + 1])});
    }
    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return file.path;
        });
    }
    const product = new Product({
        name: name,
        slug: `${slugify(name)}-${shortid.generate()}`,
        price,
        description,
        productPictures,
        variants,
        discountPercent,
        category,
    });
    product.save((error, product) => {
        if (error) return res.status(400).json({error});
        if (product) {
            getProduct(res, 201);
        } else {
            res.status(400).json({error: "something went wrong"});
        }
    });
};

exports.updateVariants = (req, res) => {
    const {productId, variants} = req.body;
    Product.updateOne({_id: productId}, {variants}).exec((error, result) => {
        if (error) return res.status(400).json({error});
        res.status(202).json({result});
    });
};

exports.getProductsByCategorySlug = (req, res) => {
    const {slug} = req.params;
    if (slug === "all") {
        Product.find({isDisabled: {$ne: true}})
            .limit(100)
            .exec((error, products) => {
                if (error) return res.status(400).json({error});
                if (products) {
                    res
                        .status(200)
                        .json({products: products, title: "Tất cả sản phẩm"});
                } else {
                    res.status(400).json({error: "something went wrong"});
                }
            });
    } else if (slug) {
        Category.findOne({slug, isDisabled: {$ne: true}}).exec(
            (error, category) => {
                if (error) return res.status(400).json({error});
                if (category) {
                    const categoriesArr = [category];
                    Category.find({parentId: category._id}).exec(
                        (error, categories) => {
                            if (error) {
                                return res.status(400).json({error: "something went wrong"});
                            }
                            if (categories) {
                                categoriesArr.push(...categories);
                            }
                            Product.find({category: {$in: categoriesArr}})
                                .limit(100)
                                .exec((error, products) => {
                                    if (error) return res.status(400).json({error});
                                    if (products) {
                                        res
                                            .status(200)
                                            .json({products: products, title: category.name});
                                    } else {
                                        res.status(400).json({error: "something went wrong"});
                                    }
                                });
                        }
                    );
                } else {
                    res.status(400).json({error: "something went wrong"});
                }
            }
        );
    } else {
        return res.status(400).json({error: "Params required"});
    }
};

exports.updateProduct = async (req, res) => {
    const {_id, name, price, description, category, discountPercent, variants} = req.body;
    console.log(req.body);

    const product = {
        name: name,
        price,
        description,
        category,
        discountPercent,
    };
    if (req.file) {
        let productPictures = [];
        productPictures = req.files.map((file) => {
            return file.path;
        });
    }
    if (req.variant) {
        let variants = [];
        for (let i = 0; i < variant.length; i += 2) {
            variants.push({name: variant[i], quantity: parseInt(variant[i + 1])});
        }
        product.variant = variants
    }
    Product.findOneAndUpdate({_id}, product, {
            new: true, upsert: true
        }
    ).exec((error, product) => {
        if (error) return res.status(400).json({error});
        if (product) {
            getProduct(res, 202)
        } else {
            res.status(400).json({error: "something went wrong"});
        }
    });
};

exports.getProductDetailsBySlug = (req, res) => {
    const {slug} = req.params;
    if (slug) {
        Product.findOne({slug, isDisabled: {$ne: true}})
            .populate({path: "category", select: "_id name categoryImage"})
            .populate("reviews")
            .populate({
                path: "reviews",
                populate: {
                    path: "user",
                    select: "_id name profilePicture",
                },
            })
            .exec((error, product) => {
                if (error) return res.status(400).json({error});
                if (product) {
                    res.status(200).json({product});
                } else {
                    res.status(400).json({error: "something went wrong"});
                }
            });
    } else {
        res.status(400).json({error: "Params required"});
    }
};

exports.setDisableProduct = async (req, res) => {
    const {_id} = req.body;
    try {

        const product = await Product.findOneAndUpdate({_id}, {isDisabled: true});
        if (product) {
            res.status(200).json({message: "Disabled successfully"});
        } else {
            res.status(400).json({error: "no found product"});
        }
    } catch (error) {
        res.status(400).json({error});
    }
};

async function getProduct(res, status = 200) {
    try {
        const products = await Product.find({isDisabled: {$ne: true}})
            .sort({createdAt: -1})
            .populate({path: "category", select: "_id name categoryImage"})
            .populate({
                path: "reviews",
                populate: {
                    path: "user",
                    select: "_id name profilePicture",
                },
            })
            .limit(100)
            .exec();

        if (products) {
            res.status(200).json({products});
        } else {
            res.status(400).json({error: "something went wrong"});
        }
    } catch (error) {
        res.status(400).json({error});
    }
}
async function getProductDisable(res,status = 200) {
    Product.find({isDisabled: {$ne: false}}).exec((error, product) => {
        if (error) {
            return res.status(400).json({error});
        } else {
            return res.status(200).json({product});
        }
    });
}
exports.getProductsDisable= async(req, res) => {
    getProductDisable(res);
}

exports.getProducts = async (req, res) => {
    getProduct(res)
};

exports.searchByProductName = async (req, res) => {
    const {text} = req.body
    try {
        const products = await Product.find({$text: {$search: text}, isDisabled: {$ne: true}})
            .populate({path: "category", select: "_id name categoryImage"})
        res.status(200).json({products, title: `Kết quả tìm kiếm: ${text}`})
    } catch (error) {
        res.status(400).json({error})
    }
}

exports.addProductReview = (req, res) => {
    const {rating, comment, productId} = req.body;
    Product.findOneAndUpdate(
        {_id: productId, "reviews.user": {$ne: req.user._id}},
        {
            $push: {
                reviews: [{rating, comment, user: req.user._id}],
            },
        },
        {new: true, upsert: true}
    ).exec((error, product) => {
        if (error) return res.status(400).json({error});
        if (product) {
            res.status(202).json({product});
        } else {
            res.status(400).json({error: "something went wrong"});
        }
    });
};

exports.getListProductByIds = (req, res) => {
    const {ids} = req.body;
    Product.find({
        _id: {$in: ids},
    }).exec((error, products) => {
        if (error) return res.status(400).json({error});
        if (products) {
            res.status(200).json({products});
        } else {
            res.status(400).json({error: "Not found !"});
        }
    });
};
