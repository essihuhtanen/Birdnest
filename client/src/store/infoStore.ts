import create from 'zustand'
import { Drone, Pilot } from '../types'
import { fetcher, droneParser } from '../utils'

interface Info {
  currentDrones: Drone[]
  pilots: Pilot[]
  fetchDrones: () => void
}

export const useInfoStore = create<Info>((set, get) => ({
  currentDrones: [],
  pilots: [],
  fetchDrones: async () => {
    const data = await fetcher({ path: 'drones' })
    console.log(data)
    if (data !== undefined) {
      set({
        currentDrones: droneParser(data)
      })
    }
    console.log(get().currentDrones)
  }
}))
