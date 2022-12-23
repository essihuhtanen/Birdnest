const express = require('express')
const app = express()
const PORT = 3001

app.get('/drones', (req, res) => {
  fetch('http://assignments.reaktor.com/birdnest/drones')
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
    })
})

app.get('/pilots/:id', (req, res) => {
  const id = req.params.id
  fetch(`http://assignments.reaktor.com/birdnest/pilots/${id}`)
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
    })
})

app.listen(PORT, () => console.log('Listening on port 3001'))
