import { Drone } from './drone'

export interface Pilot {
  drone: Drone
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
}
