const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001

app.use(
  cors({
    origin: '*'
  })
)

app.get('/drones', (req, res) => {
  fetch('http://assignments.reaktor.com/birdnest/drones')
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/pilots/:id', (req, res) => {
  const id = req.params.id
  fetch(`http://assignments.reaktor.com/birdnest/pilots/${id}`)
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(PORT, () => console.log('Listening on port 3001'))
