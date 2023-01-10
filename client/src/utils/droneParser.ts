import { Drone } from '../types'

/**
 * Iterates an array od Drone objects, removes duplicates and sets the smallest distance and
 * lates timestamp to the returned drone.
 * @param data Array of JSON Drone objects
 * @returns Drone[]
 */
export const initialParse = (data: Drone[]) => {
  const drones: Drone[] = []

  const uniqueSerials = data
    .map((drone) => drone.serialNumber)
    .filter((v, i, a) => a.indexOf(v) === i)

  // Find the latest timestamp and the smallest distance for each drone
  uniqueSerials.forEach((serialnumber) => {
    const spottings = data.filter((drone) => drone.serialNumber === serialnumber)

    const drone = {
      ...spottings[0],
      lastSeen: new Date(
        spottings.reduce((prev, curr) => (prev.lastSeen > curr.lastSeen ? prev : curr)).lastSeen
      ),
      distance: spottings.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr))
        .distance
    }

    drones.push(drone)
  })
  return drones
}

/**
 * Basic drone parser for replacing date string as a Date object for each drone.
 * @param data Array of JSON Drone objects
 * @returns Drone[]
 */
export const droneParser = (data: Drone[]) => {
  const drones = data.map((drone) => {
    return { ...drone, lastSeen: new Date(drone.lastSeen) }
  })

  return drones
}
