const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'youngblood123',
 database: 'portfolio'
})

class User {
  constructor () {
    this.id = null
    this.connected = false
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

client.connect()

/* INITIALIZE */
router.use((req, res, next) => {
  // If user do not exist
  if (typeof req.session.user === 'undefined') {
    req.session.user = new User()
  }
  next()
})
/* FUNCTION THAT USED BY QUERY */
async function verifyUser(email){ // Verify if the user is registered or not
  const sql = 'SELECT * FROM Users WHERE email = $1'
  const result = await client.query({
    text: sql,
    values: [email]
  })
  return parseInt(result.rowCount) > 0 // false if the email is not in the DB
}

async function addUser(firstname, lastname, email, password) { // add the user in the DB
    const hash = await bcrypt.hash(password, 10)
    const sql = "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    await client.query({
      text: sql,
      values: [firstname, lastname, email, hash]
    })
}

/* QUERY */
router.post('/login', async function(req, res){
  console.log(hash)
  const email = req.body.email
  const password = req.body.password
  if (req.session.user.id !== null) { /// Vérifie si l'utilisateur ne s'est pas encore connecté
    res.status(401).json({ message: 'Already connected'})
    return
  }
  if (typeof email !== 'string' || email === '' || typeof email === 'undefined' ||
    typeof password !== 'string' || password === '' || typeof password === 'undefined'
    ) { // Vérification des variables
    res.status(400).json({ message: 'Bad request'})
    return
  }
  const resp = await verifyUser(email).then((value)=> { return value}).then((value)=>{return value})// renvoie true si l'email existe dans la BDD
  if(resp === false){
    res.status(501).json({ message: 'User does not exist'})
    return
  }
  const sql = "SELECT id, password FROM users WHERE email=$1"
  const result = await client.query({
    text: sql,
    values: [email] // ici name n'est pas concaténée à notre requête
  })//Prise de l'id et du mot de passe hashé
  const bool = await bcrypt.compare(password, result.rows[0].password)// renvoie false si les deux mots de passe sont différents
  if(!(bool)){
    res.status(400).json({ message: 'Password incorrect', respond: false})
    return
  }
  req.session.user.id = parseInt(result.rows[0].id)//Prendre la valeur de l'id
  res.json({id: result.rows[0].id, connect: true})
})

router.post('/register', async function(req, res){
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  if (
    typeof  firstname !== 'string' || firstname === '' || typeof firstname === 'undefined' ||
    typeof  lastname !== 'string' || lastname === '' || typeof lastname === 'undefined' ||
    typeof  email !== 'string' || email === '' || typeof email === 'undefined' ||
    typeof password !== 'string' || password === '' || typeof password === 'undefined'
    ) { // Inputs verification
    res.status(400).json({ message: 'Bad variable', respond: false })
    return
  }
  const resp = await verifyUser(email).then((value) => console.log(value)).then((value) => {return value})
  if(resp == true){
    res.status(500).json({message: "User already exist"})
    return
  }
  addUser(firstname, lastname, email, password)
  res.json({message: 'User registered'})
})

module.exports = router
