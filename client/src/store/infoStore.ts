import create from 'zustand'
import { Drone, Pilot } from '../types'
import { fetcher, droneParser, pilotParser } from '../utils'

// The observed time period (10 minutes by default) in milliseconds
const OBSERVED_PERIOD = 600000

// The radius of the No Drone Zone in meters
const SAFE_DISTANCE = 100

interface Info {
  currentDrones: Drone[]
  drones: Drone[]
  pilots: Pilot[]
  fetchDrones: () => void
  updateDrones: () => void
  updatePilots: () => void
}

export const useInfoStore = create<Info>((set, get) => ({
  currentDrones: [],
  drones: [],
  pilots: [],
  fetchDrones: async () => {
    const data = await fetcher({ path: 'drones' })
    if (data !== undefined) {
      set({
        currentDrones: droneParser(data).filter((drone) => drone.distance < SAFE_DISTANCE)
      })
    }

    console.log('Drones in area: ' + get().currentDrones.length)
    console.log(get().currentDrones)
    get().updateDrones()
    get().updatePilots()
  },
  // Updates the drones array
  updateDrones: () => {
    // Determine the breakpoint of observation to 10 minutes earlier
    const breakPoint = new Date(Date.now() - OBSERVED_PERIOD)

    get().currentDrones.forEach((drone) => {
      // If the drone has already been spotted, update the timestamp and distance (if applicable)
      if (
        get().drones.find((currentDrone) => currentDrone.serialNumber === drone.serialNumber) !==
        undefined
      ) {
        set({
          drones: get().drones.map((currDrone) => {
            return currDrone.serialNumber === drone.serialNumber
              ? {
                  ...currDrone,
                  lastSeen: drone.lastSeen,
                  distance:
                    drone.distance < currDrone.distance ? drone.distance : currDrone.distance
                }
              : currDrone
          })
        })
      } else {
        // If the drone has not been spotted before, add it
        set({
          drones: [...get().drones, drone]
        })
      }
    })

    // Filter out drones last spotted outside of the observation period
    set({
      drones: get().drones.filter((dr) => dr.lastSeen > breakPoint)
    })
    console.log('All drones: ')
    console.log(get().drones)
  },

  // Fetch the pilot for each drone in the zone
  updatePilots: async () => {
    const newPilots = await pilotParser(get().drones)
    set({
      pilots: newPilots
    })
  }
}))
