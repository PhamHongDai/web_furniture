const {Category, Product} = require("../models");
const slugify = require("slugify");
const shortid = require("shortid");

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            categoryImage: cat.categoryImage,
            children: createCategories(categories, cat._id),
        });
    }
    return categoryList;
};

exports.addCategory = (req, res) => {
    const {name, parentId} = req.body;
    const categoryObj = {
        name,
        slug: `${slugify(name)}-${shortid.generate()}`,
    };

    if (req.file) {
        categoryObj.categoryImage = req.file.path;
    }
    const cate = new Category(categoryObj);
    cate.save((error, category) => {
        if (error) {
            return res.status(400).json({error});
        }
        if (category) {
            return res.status(201).json({category});
        }
    });
};

async function getCategory(res, status = 200) {
    Category.find({isDisabled: {$ne: true}}).exec((error, categories) => {
        if (error) {
            return res.status(400).json({error});
        } else {
            const categoriesList = createCategories(categories);
            return res.status(200).json({categories: categoriesList});
        }
    });
}

exports.getCategories = (req, res) => {
    getCategory(res);
};

exports.getFlatCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.status(400).json({error});
        } else {
            return res.status(200).json({categories});
        }
    });
};

exports.setDisableCategory = async (req, res) => {
    const {_id} = req.body;
    console.log("hello")
    try {
        const category = await Category.findOneAndUpdate({_id}, {isDisabled: true});
        if (category) {
            const product = await Product.updateMany({ "category" : _id },{"$set":{"isDisabled": true}})
            res.status(200).json({message: "Disabled category successfully"});
        } else {
            res.status(400).json({error: "no found product"});
        }
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.updateCategories = async (req, res) => {
    const { _id, name} = req.body;
    const category = {
        name,
    };
    if (req.file) {
        category.categoryImage = req.file.path;
    }
    const newCategory = await Category.findOneAndUpdate({ _id }, category, {
        new: true,
    });
    res.status(202).json({ category: newCategory });
};
