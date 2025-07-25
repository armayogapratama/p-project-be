const { Product } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class ProductController {
  static async lists(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: ["id", "name", "cover", "title", "description", "file"],
        include: {
          model: "Categories",
          attributes: ["id", "name"],
        },
        include: {
          model: {
            model: "Users",
            attributes: ["id", "name", "email", "username", "phoneNumber"],
          },
        },
      });

      if (!products) throw { name: "NotFound" };

      res.status(200).json({
        status: "Success",
        message: "Products successfully listed",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) throw { name: "NotFound" };

      const product = await Product.findByPk(id, {
        include: {
          model: "Categories",
          attributes: ["id", "name"],
        },
        include: {
          model: {
            model: "Users",
            attributes: ["id", "name", "email", "username", "phoneNumber"],
          },
        },
      });

      if (!product) throw { name: "NotFound" };

      res.status(200).json({
        status: "Success",
        message: "Product successfully listed",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, title, description, categoryId, userId } = req.body;

      if (!name || !title || !description || !categoryId || !userId)
        throw { name: "EmailPasswordEmpty" };

      if (!req.files.cover || !req.files.file) {
        throw {
          name: "FileUploadError",
        };
      }

      const coverFile = req.files.cover[0];
      const file = req.files.file[0];

      const coverBase64 = Buffer.from(coverFile.buffer).toString("base64");
      const coverDataURI = `data:${coverFile.mimetype};base64,${coverBase64}`;
      const coverResult = await cloudinary.uploader.upload(coverDataURI, {
        folder: "products/covers",
        public_id: `${Date.now()}-${coverFile.originalname}-${userId}`,
      });

      const coverUrl = coverResult.secure_url;

      const fileBase64 = Buffer.from(file.buffer).toString("base64");
      const fileDataURI = `data:${file.mimetype};base64,${fileBase64}`;
      const fileResult = await cloudinary.uploader.upload(fileDataURI, {
        folder: "products/files",
        public_id: `${Date.now()}-${file.originalname}-${userId}`,
      });

      const fileUrl = fileResult.secure_url;

      const product = await Product.create({
        name,
        cover: coverUrl,
        title,
        description,
        file: fileUrl,
        categoryId,
        userId,
      });

      res.status(201).json({
        status: "Success",
        message: "Product successfully created",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
