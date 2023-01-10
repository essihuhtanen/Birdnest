import { droneParser } from './utils/droneParser.js'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8080
const OBSERVED_PERIOD = 600000

let droneHistory = []
let currentDrones = []

app.use(cors())
app.use(express.static('build'))

/**
 * Set a timer to fetch the drone data from API every 2 seconds.
 * After fetching new drones, filter the existing array to
 * not include drones spotted more than the observed period
 * ago.
 *
 * The data may contain multiple spottings of the same drone.
 */
const setTimer = () => {
  setInterval(() => {
    fetch('http://assignments.reaktor.com/birdnest/drones')
      .then((res) => res.text())
      .then((data) => {
        currentDrones = droneParser(data)
        droneHistory = droneHistory.concat(currentDrones)
      })
      .catch((err) => console.log(err))

    const breakPoint = new Date(Date.now() - OBSERVED_PERIOD)
    droneHistory = droneHistory.filter((drone) => drone.lastSeen > breakPoint)
  }, 2000)
}

app.get('/drones/history', (req, res) => {
  res.json(droneHistory)
  res.end()
})

app.get('/drones', (req, res) => {
  res.json(currentDrones)
  res.end()
  /*
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
    */
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

setTimer()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
