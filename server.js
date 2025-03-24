import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Users API",
            version: "1.0.0",
            description: "A simple Express API to manage users",
            contact: {
                name: "João Campos",
                email: "joaocanabarrocampos@gmail.com",
            },
        },
    },
    apis: ["./server.js"],
};

// Swagger UI setup
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.send("Welcome to our Users API!");
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

let users = [
    {
        id: 1,
        name: "João",
        password: "JJ1804C",
    },
    {
        id: 2,
        name: "Clair",
        password: "CC0710L",
    },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Returns a list of users from the server.
 *     responses:
 *       200:
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   password:
 *                     type: string
 */

app.get("/users", (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 */
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password,
    };
    users.push(newUser);
    res.json({ message: `User added successfully!`, users: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the user to update
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: integer
 *                     name:
 *                       type: string
 *                     password:
 *                       type: string
 *       404:
 *         description: User not found!
 */

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((b) => b.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    res.json({ message: "User updated successfully!", user });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found!
 */
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((b) => b.id !== userId);
    res.status(200).json({ message: "User deleted successfully!" });
});
