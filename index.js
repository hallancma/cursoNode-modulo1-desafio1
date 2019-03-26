const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age || !age.match(/^[0-9]+$/)) {
    // res.send('Não é um número')
    return res.redirect('/?error=Não é um número')
  }

  return next()
}

app.get('/', (req, res) => {
  const error = req.query.error
  return res.render('start', { error })
})

app.get('/major', checkAgeQueryParam, (req, res) => {
  const { age } = req.query
  const { peso } = req.query

  return res.render('major', { age, peso })
})

app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query
  const { foi } = req.query
  return res.render('minor', { age, foi })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  const { peso } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}&peso=${peso}`)
  } else {
    return res.redirect(`/minor?age=${age}&foi=teste`)
  }
})

app.listen(3000)
