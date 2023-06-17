const express = require('express');
const {v4: uuid} = require("uuid");
const app = express();
const fs = require("fs");
const path = require("path");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const jwtSecret = "Secret@jwtAuth";
app.use(cors());
app.use(express.json());
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
let users = [];

function saveUserToFile(user) {
    users.push(user);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(users))
}

function readUsersFromFile() {
    const buffer = fs.readFileSync(path.join(__dirname, "../data/users.json"));
    const stringData = buffer.toString();
    if (stringData) {
        users = JSON.parse(stringData);
    }
}
readUsersFromFile();

function authMiddleware(request, response, next) {
    const { authorization } = request.headers;
  
    try {
      const token = authorization.split(" ")[1]; // ["Bearer" , 'token']
      jwt.verify(token, jwtSecret);
    } catch (error) {
      return response.status(403).json({ error: "Unauthorized Access" });
    }
  
    next();
  }

app.get('/', (req, res) => {
    res.json({message: "Api is working!"})
})

app.get('/api/users', (req, res) => {
    res.json({users});
})

app.post("/api/users/register", (req, res) => {
    console.log("User Registration in progress");
    // console.log({ body: req.body });
    const user = req.body;
    user.id = uuid();
    user.password = passwordHash.generate(user.password);
    saveUserToFile(user);
    // users.push(user);
    return res.json(user,)
})

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    console.log(email, " ", password);
    const user = users.find((user) => {
        return user.email == email
    });
    if (user && passwordHash.verify(password, user.password)) {
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = jwt.sign(payload, jwtSecret);
        return res.status(200).json({message: "Login Success", token, type: "Bearer"})
    }
    return res.status(400).json({message: "Invalid Email or Password"});
})

app.get("/api/orders", authMiddleware, (req, res) => {
    res.json({
        orders: ["order1", "order2", "order3"]
    });
});

app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        profile: {
            name: "virendra"
        }
    });
})
