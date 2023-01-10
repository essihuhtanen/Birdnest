import { Drone, Pilot } from '../types'
import { fetcher } from './fetcher'

/**
 * Fetch single pilot information from backend
 * @param drone
 * @returns Pilot | null
 */
const fetchPilot = async (drone: Drone) => {
  const data = await fetcher({ path: 'pilots', id: drone.serialNumber })
  return parsePilot(data, drone)
}

/**
 * Parses a pilot json to Pilot. Returns the created Pilot or null, if the json data is malformed.
 * @param data
 * @param drone
 * @returns Pilot | null
 */
const parsePilot = (data: string, drone: Drone) => {
  const jsonData = JSON.parse(data)

  const pilot: Pilot = {
    drone: drone,
    id: jsonData.pilotId,
    firstname: jsonData.firstName,
    lastname: jsonData.lastName,
    email: jsonData.email,
    phone: jsonData.phoneNumber
  }
  // Check for malformed json (undefined values in the object)
  let correctData: boolean = true
  Object.values(pilot).forEach((value) => value === undefined && (correctData = false))

  return correctData ? pilot : null
}

/**
 * Updates the array of Pilots to have all pilots of the array of Drones.
 * Either updates the Drone of the Pilot in the array or creates a new Pilot, if one does not exist.
 * Deletes all Pilots whose Drones are not in the Drone array.
 * @param drones
 * @param pilots
 * @returns Pilot[]
 */
export const pilotParser = async (drones: Drone[], pilots: Pilot[]) => {
  for (const drone of drones) {
    // Check if the pilot is already known and then either update it or fetch the pilot info
    const savedPilot = pilots.find((pilot) => pilot.drone.serialNumber === drone.serialNumber)

    if (savedPilot !== undefined) {
      pilots = pilots.map((pilot) =>
        pilot.id === savedPilot.id ? { ...pilot, drone: drone } : pilot
      )
    } else {
      const newPilot = await fetchPilot(drone)
      newPilot !== null && pilots.push(newPilot)
    }
  }

  // Remove excess pilots before returning
  return pilots.filter((pilot) =>
    drones.find((drone) => drone.serialNumber === pilot.drone.serialNumber)
  )
}

export const fetchAllPilots = async (drones: Drone[]) => {
  const pilots: Pilot[] = []

  for (const drone of drones) {
    const newPilot = await fetchPilot(drone)
    newPilot !== null && pilots.push(newPilot)
  }

  return pilots
}
