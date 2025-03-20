import express from 'express';
const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to our Users API!');
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

let users = [
    {
        id: 1,
        name: "João",
        password: "JJ1804C"
    },
    {
        id: 2,
        name: "Clair",
        password: "CC0710L"
    }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password
    };
    users.push(newUser);
    res.json({ message: `User added successfully!`, users: newUser })
});


app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find((b) => b.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    res.json({ message: 'User updated successfully!', user });
});



app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    users = users.filter((b) => b.id !== userId);
    res.status(200).json({ message: 'User deleted successfully!' });
});