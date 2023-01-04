const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())

app.get('/drones', (req, res) => {
  fetch('http://assignments.reaktor.com/birdnest/drones')
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch((err) => {
      res.writeHead(503, 'Error fetching drone resource')
      res.end()
    })
})

app.get('/pilots/:id', (req, res) => {
  const id = req.params.id
  fetch(`http://assignments.reaktor.com/birdnest/pilots/${id}`)
    .then((res) => res.text())
    .then((data) => {
      res.json(data)
      res.end()
    })
    .catch((err) => {
      res.writeHead(503, 'Error fetching pilot resource')
      res.end()
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
