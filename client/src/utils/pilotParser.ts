import { Drone, Pilot } from '../types'

export const pilotParser = (data: string, drone: Drone) => {
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
  Object.values(pilot).forEach((value) => value !== undefined && (correctData = false))

  return correctData ? pilot : null
}
