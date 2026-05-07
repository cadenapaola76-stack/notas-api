import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

//aqui definiremos que base de datos (en el caso de notas se usara mysql y en usuarios MongoDB)

//import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
import NoteMySQLRepository from "../../infrastructure/database/mysql/note.mysql.repository.js";
//import { route } from "express/lib/router/index.js";



// inyeccion de dependencias
//const noteRepository = new NoteMongoRepository();
const noteRepository = new NoteMySQLRepository();

const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);
const router = Router();


//definir las rutas para las notas  

//comentado sin seguuridad

/*router.post("/", upload.single('image'), noteController.createNote);
router.get("/", noteController.getNotesByUserId);
router.get("/:id", noteController.getById);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);*/

router.get("/:id/public", noteController.getNotePublic);
router.get("/:id", noteController.getById);
//con seguridad
/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mi Tarea Pendiente"
 *               content:
 *                 type: string
 *                 example: "Finalizar el módulo de backend hoy."
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Título o contenido faltante
 */

router.post("/", authMiddleware, upload.single('image'), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener todas las notas del usuario autenticado
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       401:
 *         description: No autorizado (Token faltante o inválido)
 */

router.get("/", authMiddleware, noteController.getNotesByUserId);
/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Actualizar una nota existente
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la nota
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Nota actualizada exitosamente
 *       404:
 *         description: Nota no encontrada
 */


router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Eliminar una nota (Solo Admins)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note deleted successfully"
 *       403:
 *         description: Acceso denegado (Requiere rol admin)
 *       404:
 *         description: Nota no encontrada
 */

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);


// por el momento    router.post("/",authMiddleware, upload.single('image'), noteController.createNote); 

/*
 * @swagger
 * /notes:
 * get:
 * summary: Obtener todas las notas del usuario autenticado
 * tags: [Notes]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de notas obtenida exitosamente
 * 401:
 * description: No autorizado, token faltante o inválido
 */

//router.get("/", authMiddleware, noteController.getNotesByUserId);

export default router;