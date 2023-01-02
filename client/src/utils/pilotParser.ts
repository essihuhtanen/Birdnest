import { Drone, Pilot } from '../types'
import { fetcher } from './fetcher'
const fetchPilot = async (drone: Drone) => {
  const data = await fetcher({ path: 'pilots', id: drone.serialNumber })
  return parsePilot(data, drone)
}

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

export const pilotParser = async (drones: Drone[], pilots: Pilot[]) => {
  for (const drone of drones) {
    // Check if the pilot is already known and then either update it or fetch the pilot info
    const savedPilot = pilots.find((pilot) => pilot.drone.serialNumber === drone.serialNumber)

    if (savedPilot !== undefined) {
      pilots.map((pilot) => (pilot.id === savedPilot.id ? { ...pilot, drone: drone } : pilot))
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
