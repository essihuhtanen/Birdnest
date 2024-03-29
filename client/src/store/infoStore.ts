import create from 'zustand'
import { Drone, Pilot } from '../types'
import { SortVariant } from '../types/sortVariant'
import {
  fetcher,
  initialParse,
  droneParser,
  pilotParser,
  fetchAllPilots,
  pilotSort,
  setTimer
} from '../utils'

// The observed time period in milliseconds
const OBSERVED_PERIOD = 600000

// Default sort variant and description
const DEFAULT_SORTVARIANT: SortVariant = 'time'
const DEFAULT_SORTDESCRIPTION: string = 'Newest first'

interface Info {
  currentDrones: Drone[]
  drones: Drone[]
  pilots: Pilot[]
  sortDescription: string
  sortVariant: SortVariant
  initiateDrones: () => void
  fetchDrones: () => void
  updateDrones: () => void
  updatePilots: () => void
  setSortVariant: (variant: SortVariant, description: string) => void
  sortPilots: () => void
}

export const useInfoStore = create<Info>((set, get) => ({
  currentDrones: [],
  drones: [],
  pilots: [],
  sortDescription: DEFAULT_SORTDESCRIPTION,
  sortVariant: DEFAULT_SORTVARIANT,
  // To be called once: fetches the history data from backend and creates the drones.
  initiateDrones: async () => {
    const data = await fetcher({ path: 'drones/history' })
    const drones = initialParse(data)
    const newPilots = await fetchAllPilots(drones)
    set({
      drones: drones,
      pilots: pilotSort(newPilots, get().sortVariant)
    })
    setTimer(get().fetchDrones)
  },
  fetchDrones: async () => {
    const data = await fetcher({ path: 'drones' })
    if (data !== undefined) {
      set({
        currentDrones: droneParser(data)
      })
      // Update drones and pilots, if there are changes
      if (get().currentDrones.length > 0) {
        get().updateDrones()
      } else {
        // If there are no drones in the area, just check if there are pilots whose observation period is expired
        const breakPoint = new Date(Date.now() - OBSERVED_PERIOD)
        const expiredPilots = get().pilots.filter((pilot) => pilot.drone.lastSeen < breakPoint)
        if (expiredPilots.length > 0) {
          set({
            pilots: get().pilots.filter((pilot) => pilot.drone.lastSeen > breakPoint)
          })
        }
      }
    }
  },
  // Updates the drones array
  updateDrones: () => {
    // Determine the breakpoint of observation
    const breakPoint = new Date(Date.now() - OBSERVED_PERIOD)

    get().currentDrones.forEach((drone) => {
      // If the drone has already been spotted, update the timestamp and distance (if necessary)
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
    // Update pilots
    get().updatePilots()
  },

  // Fetch the pilot for each drone in the zone
  updatePilots: async () => {
    const newPilots = await pilotParser(get().drones, get().pilots)
    set({
      pilots: pilotSort(newPilots, get().sortVariant)
    })
  },
  setSortVariant: (variant: SortVariant, description: string) => {
    set({
      sortVariant: variant,
      sortDescription: description
    })
    get().sortPilots()
  },
  sortPilots: () => {
    set({
      pilots: pilotSort(get().pilots, get().sortVariant)
    })
  }
}))
