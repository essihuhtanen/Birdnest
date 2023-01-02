import { Drone, Pilot } from '../types'
import { fetcher } from './fetcher'

const fetchPilot = async (drone: Drone) => {
  const data = await fetcher({ path: 'pilots', id: drone.serialNumber })
  return parsePilot(data, drone)
}

export const parsePilot = (data: string, drone: Drone) => {
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

export const pilotParser = async (drones: Drone[]) => {
  const pilots: Pilot[] = []

  for (const drone of drones) {
    const pilot = await fetchPilot(drone)
    console.log('pilot fetched: ' + pilot?.email)
    pilot !== null && pilots.push(pilot)
  }

  return pilots
}
