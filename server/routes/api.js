const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const profils = require('../data/profils.js')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'youngblood123',
 database: 'portfolio'
})

let seep = null

class User {
  constructor () {
    this.id = null
    this.firstname = null
    this.lastname = null
    this.connected = false
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

class Like{
  constructor () {
    this.list = []
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
    req.session.like = new Like()
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

  /* USER */
router.get('/me', async function(req, res){
  if(req.session.user.id == 'undefined' || req.session.user.id === null){
    res.status(400).json({message: 'Not connected', id: null})
    return
  }
  res.json({id: req.session.user.id, firstname: req.session.user.firstname, lastname: req.session.user.lastname})
})
router.post('/login', async function(req, res){
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
    res.status(500).json({ message: 'User does not exist'})
    return
  }
  const sql = "SELECT id, password, first_name, last_name FROM users WHERE email=$1"
  const result = await client.query({
    text: sql,
    values: [email] // ici name n'est pas concaténée à notre requête
  })//Prise de l'id et du mot de passe hashé
  const bool = await bcrypt.compare(password, result.rows[0].password)// renvoie false si les deux mots de passe sont différents
  if(!(bool)){
    res.status(400).json({ message: 'Password incorrect', respond: false})
    return
  }
  console.log(result.rows)
  req.session.user.id = parseInt(result.rows[0].id)//Prendre la valeur de l'id
  req.session.user.firstname = result.rows[0].first_name
  req.session.user.lastname = result.rows[0].last_name
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

router.get('/logout', async function(req, res){
  if(req.session.user.id === null){
    res.status(400).json({message: 'User not connected'})
    return
  }
  req.session.destroy()
  res.json({message: "Successfuly disconnected"})
})

  /* PROFILS */
router.post('/profils', async function(req, res){
  const idp = profils[profils.length-1].id + 1
  profils.push({id: idp, 
    firstname: req.body.firstname, 
    lastname: req.body.lastname, 
    domain: req.body.domain, 
    skills: req.body.competences, 
    description: "Bonjour, je m'appelle "+ req.body.firstname + ' ' + req.body.lastname +"\n\n Mon domaine est : " + req.body.domain,
    experience: "Aucun pour l'instant",
    img: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png",
    linkedin: req.body.linkedin })
  res.json(profils[idp])
})

router.get('/profils', async function(req, res){
  res.json(profils)
})

router.get('/profil/:id', async function(req, res){
  const id = req.params.id
  var idp = profils.map((obj) => obj.id)
  const index = idp.indexOf(parseInt(id))
  if(index == -1){
    res.status(500).json({message: "The profil doesn't exist"})
    return
  }
  seep = profils[index]
  res.json(profils[index])
})

router.get('/seeprofil', async function(req, res){
  res.json(seep)
})

/*   LIKE    */
router.post('/like', async function(req, res){
  var idp = profils.map((obj) => obj.id)
  if( idp.indexOf(parseInt(req.body.id)) == -1){
    res.status(501).json({ message: "The profil doesn't exist", array: idp })
    return
  }
  if( req.session.like.list.indexOf(parseInt(req.body.id)) != -1){
    res.status(400).json({ message: "Profil already added", array: idp })
    return
  }
  req.session.like.list.push(req.body.id)
  res.json({message: "Profil added."})
})

router.get('/like', async function(req, res){
  res.json(req.session.like.list)
})

router.put('/like/:id', (req, res) => {
  var idp = req.session.profils.map(function(v){
    return parseInt(v.id)
  })
  const indx = idp.indexOf(parseInt(req.params.id))
  if(indx === -1){
    res.status(400).json({message: "Profil doesn't exist."})
    return
  }
  req.session.like.liste[indx].id = req.body.id
  res.send()
})

router.delete('/like/:id', (req, res) => {
  var idp = req.session.like.list.map(function(v){
    return v.id
  })
  const indx = idp.indexOf(parseInt(req.params.id))
  if(indx == -1){
    res.status(400).json({message: "Profil isn't liked"})
    return
  }
  req.session.like.list.splice(indx, 1);
  res.send()
})

module.exports = router
