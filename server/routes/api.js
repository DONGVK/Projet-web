const express = require('express')
const router = express.Router()
/*const articles = require('../data/articles.js')*/
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'secret',
 database: 'TP5'
})

class User {
  constructor () {
    this.idUser = null
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

router.post('/login', async function(req, res){
  const email = req.body.email
  const password = req.body.password
  if (typeof req.session.user !== 'undefined') { /// Vérifie si l'utilisateur ne s'est pas encore connecté
    res.status(401).json({ message: 'Already connected', respond: false })
    return
  }
  if (typeof email !== 'string' || email === '' || typeof email === 'undefined' ||
    typeof password !== 'string' || password === '' || typeof password === 'undefined'
    ) { // Vérification des variables
    res.status(400).json({ message: 'Bad request', respond: false })
    return
  }
  const resp = await verifyUser(email).then((value)=> { return value}).then((value)=>{return value})// renvoie true si l'email existe dans la BDD
  if(resp === true){
    res.status(501).json({ message: 'User does not exist ', respond: false})
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
  req.session.user = parseInt(result.rows[0].id)//Prendre la valeur de l'id
  res.json({id: req.session.userId, respond: true})
})

module.exports = router
