import { distanceFromNest } from './distance.js'
import { XMLParser } from 'fast-xml-parser'

// The radius of the No Drone Zone in meters
const SAFE_DISTANCE = 100

/**
 * Parses string data to XML and creates drone objects. Returns an array of drone objects,
 * filtered by distance from the nest (only the drones closer than 100 m away).
 * @param {string} data
 * @returns array of json objects
 */
export const droneParser = (data) => {
  const drones = []
  try {
    const parser = new XMLParser()
    const xml = parser.parse(data)
    const dronesToParse = xml.report.capture.drone

    const timestamp = new Date()

    dronesToParse.forEach((droneInfo) => {
      const x = parseFloat(droneInfo.positionX)
      const y = parseFloat(droneInfo.positionY)

      const newDrone = {
        serialNumber: droneInfo.serialNumber,
        model: droneInfo.model,
        manufacturer: droneInfo.manufacturer,
        x: x,
        y: y,
        distance: distanceFromNest(x, y),
        lastSeen: timestamp
      }

      drones.push(newDrone)
    })
  } catch (error) {
    console.log(error)
  }

  const dronesInNDZ = drones.filter((drone) => drone.distance < SAFE_DISTANCE)

  return dronesInNDZ
}
