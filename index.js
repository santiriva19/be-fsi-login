const express = require("express");
const app = express();
const port = 3034;

app.get("/ruta/get/api/", (req, res) => {
  res.send("Bienvenido");
});

const users = [
  {
    id: 1,
    name: "Santiago",
    lastname: "Londono",
    username: "holanda",
    password: "1234",
  },
  {
    id: 2,
    name: "Santiago",
    lastname: "Riva",
    username: "santiriva",
    password: "12345678",
  },
];

app.use(express.json());

app.get("/usuarios", async (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500);
  }

  //res.json(users)
  //res.status(200)
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let userFound = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      userFound = true;
      res.status(200).json({
        ok: true,
        message: "Bienvenido",
      });
    }
  }

  if (!userFound) {
    res.status(401).json({
      ok: false,
      message: "Credenciales incorrectas",
    });
  }
});

app.post("/singup", (req, res) => {
  const user = req.body;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].id !== user.id &&
      users[i].password !== user.password &&
      users[i].username !== user.username
    ) {
      users.push(user);
      res.status(200).send(`Bienvenido`);
    }
  }
});

app.listen(port, () => {
  console.log("La aplicacion corrio bien");
});
