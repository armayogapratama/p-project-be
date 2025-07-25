const { Category } = require("../models/index");

class CategoryController {
  static async lists(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name"],
      });

      if (!categories) throw { name: "NotFound" };

      res.status(200).json({
        status: "Success",
        message: "Categories successfully listed",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) throw { name: "NotFound" };

      const category = await Category.findByPk(id);

      if (!category) throw { name: "NotFound" };

      res.status(200).json({
        status: "Success",
        message: "Category successfully listed",
        data: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;
      console.log(name, "ini nama");

      if (!name) throw { name: "EmailPasswordEmpty" };

      const category = await Category.create({
        name,
      });

      res.status(201).json({
        status: "Success",
        message: "Category successfully created",
        data: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) throw { name: "EmailPasswordEmpty" };

      const category = await Category.findByPk(id);

      if (!category) throw { name: "NotFound" };

      await category.update({
        name,
      });

      res.status(200).json({
        status: "Success",
        message: "Category successfully updated",
        data: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) throw { name: "NotFound" };

      const category = await Category.findByPk(id);

      if (!category) throw { name: "NotFound" };

      await category.destroy();

      res.status(200).json({
        status: "Success",
        message: "Category successfully deleted",
        data: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async listWithProduct(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id, {
        attributes: ["id", "name"],
        include: {
          model: "Products",
          attributes: ["id", "name", "cover", "title", "description", "file"],
        },
      });

      if (!category) throw { name: "NotFound" };

      res.status(200).json({
        status: "Success",
        message: "Category successfully listed",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
