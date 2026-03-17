const asyncHandler = require("express-async-handler");
const  ProductModel = require("../models/productModel.js");
const cloudinary = require("cloudinary")

// create product
export const createProductController = asyncHandler (
    async (req, res) => {
        let images = [];

        if (req.body.images) {
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            const chunksize = 3;
            const imageChunks = [];
            while (images.length > 0) {
                imageChunks.push(images.splice(0, chunksize));
            }

            for (let chunk of imageChunks) {
                const uploads = chunk.map((img) => 
                    cloudinary.v2.uploader.upload(img, {
                        folder: "Products",
                    })
                );

                const results = await Promise.all(uploads);

                for(let result of results) {
                    imagesLinks.push({
                        product_id: result.public_id,
                        url: result.secure_url,
                    });
                }
            }

            req.body.user = req.user.id;
            req.body.images = imagesLinks;
        }

        const data = await ProductModel.create(req.body);

        res.status(200).json({
            success: true,
            data: data
        });
    }
)
