import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import CategoryService from "../../application/use-cases/category.service.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

import CategoryMySQLRepository from "../../infrastructure/database/mysql/category.mysql.repository.js";

const categoryRepository = new CategoryMySQLRepository();

const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);
const router = Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategoryByUserId);
router.get("/:id", categoryController.getById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;