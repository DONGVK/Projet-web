const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'youngblood123',
 database: 'TP5'
})

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  const article =  req.session.panier
  res.json(article)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  const panier = req.session.panier
  var ida = articles.map((obj) => obj.id)
  var idp = panier.articles.map((obj) => obj.id)
  if( ida.indexOf(parseInt(req.body.id)) == -1){
    res.status(501).json({ message: "The article doesn't exist", array: idp })
    return
  }
  if(idp.indexOf(req.body.id) != -1){
    res.status(400).json({message: 'Article has already been added in the panier'})
    return
  }
  if(parseInt(req.body.quantity) <= 0){
    res.status(400).json({message: 'Quantity invalid'})
    return
  }
  panier.articles.push({id: parseInt(req.body.id), quantity: parseInt(req.body.quantity)})
  res.json({id: parseInt(req.body.id), quantity: parseInt(req.body.quantity)})
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  if(typeof req.session.userId == 'undefined'){
    res.status(400).json({message: 'Refused payment', pay: false})
    return
  }
  //req.session.destroy()
  req.session.panier = new Panier() // on ne veut pas détruire la session de l'utilisateur s'il est connecté
  res.json({message: 'Accepted payment', pay: true})
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  var idp = req.session.panier.articles.map(function(v){
    return parseInt(v.id)
  })
  const indx = idp.indexOf(parseInt(req.params.articleId))
  if(indx === -1){
    res.status(400).json({message: "Article is not in the panier."})
    return
  }
  else if(parseInt(req.body.quantity) <= 0){
    res.status(400).json({message: "The quantity is invalid."})
    return
  }
  req.session.panier.articles[indx].quantity = parseInt(req.body.quantity)
  res.send()
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  var idp = req.session.panier.articles.map(function(v){
    return v.id
  })
  const indx = idp.indexOf(parseInt(req.params.articleId))
  if(indx == -1){
    res.status(400).json({message: "Article is not in the panier."})
    return
  }
  req.session.panier.articles.splice(indx, 1);
  res.send()
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

  /* ------------------ TP 5 --------------------------- */
  router.post('/register',async function(req, res){
    const email = req.body.email
    const password = req.body.password
    //Vérification des variables
    if (typeof email !== 'string' || email === '' || typeof email === 'undefined' ||
      typeof password !== 'string' || password === '' || typeof password === 'undefined'
      ) {
      res.status(400).json({ message: 'bad request', respond: false })
      return
    }
    const resp = await verifyUser(email).then((value)=> { return value}).then((value)=>{return value})//renvoie false si l'email existe déjà
    if(resp !== true){
      res.status(501).json({ message: 'email already exist', respond: false})
      return
    }
    addUser(email, password)
    res.json({message: 'user created', respond: true})
  })

  async function verifyUser(email) { // Vérifie si l'utilisateur est dans la BDD
    const sql = "SELECT * FROM users WHERE email=$1"
    const result = await client.query({
      text: sql,
      values: [email] // ici name n'est pas concaténée à notre requête
    })
    //.then(r => console.log(r))
    //.catch(e => console.error(e.stack))
    return parseInt(result.rowCount) == 0 // si c'est égale à 0 alors l'email n'existe pas dans la BDD
  }

  async function addUser(email, password) { // Ajoute l'utilisateur dans la BDD
    const hash = await bcrypt.hash(password, 10)
    const sql = "INSERT INTO users(email, password) VALUES($1, $2)"
    await client.query({
      text: sql,
      values: [email, hash]
    })
  }

  router.post('/login', async function(req, res){
    const email = req.body.email
    const password = req.body.password
    if (typeof req.session.userId !== 'undefined') { /// Vérifie si l'utilisateur ne s'est pas encore connecté
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
    req.session.userId = parseInt(result.rows[0].id)//Prendre la valeur de l'id
    res.json({id: req.session.userId, respond: true})
  })

  router.get('/me',(req, res)=>{
    if(typeof req.session.userId == 'undefined'){ // Voir si l'utilateur est connecté
      res.status(401).json({message: 'User not connected'})
      return 
    }
    res.json({id: req.session.userId})
  })

  router.post('/disconnect', (req, res) =>{
    if(typeof req.session.userId == 'undefined'){ // Voir si l'utilateur est connecté
      res.status(401).json({message: 'User not connected'})
      return 
    }
    req.session.destroy()// Efface la session
    res.json({message: 'Disconnected successfully'})
  })

module.exports = router
