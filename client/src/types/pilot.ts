import { Drone } from './drone'

export interface Pilot {
  drone: Drone
  name: string
  email: string
  phone: string
  distance: number
  seenAt: Date
}
