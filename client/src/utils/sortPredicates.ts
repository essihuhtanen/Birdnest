import { Pilot } from '../types'
import { SortVariant } from '../types/sortVariant'

const sortByTime = (a: Pilot, b: Pilot) => {
  if (!(a.drone.lastSeen < b.drone.lastSeen) && !(a.drone.lastSeen > b.drone.lastSeen)) {
    return a.lastname > b.lastname ? 1 : -1
  } else {
    return a.drone.lastSeen <= b.drone.lastSeen ? 1 : -1
  }
}

const sortByTimeReverse = (a: Pilot, b: Pilot) => {
  if (!(a.drone.lastSeen < b.drone.lastSeen) && !(a.drone.lastSeen > b.drone.lastSeen)) {
    return a.lastname > b.lastname ? 1 : -1
  } else {
    return a.drone.lastSeen >= b.drone.lastSeen ? 1 : -1
  }
}

const sortByDistance = (a: Pilot, b: Pilot) => {
  if (a.drone.distance === b.drone.distance) {
    return 0
  } else {
    return a.drone.distance < b.drone.distance ? -1 : 1
  }
}

const sortByDistanceReverse = (a: Pilot, b: Pilot) => {
  if (a.drone.distance === b.drone.distance) {
    return 0
  } else {
    return a.drone.distance > b.drone.distance ? -1 : 1
  }
}

export const pilotSort = (pilots: Pilot[], sortVariant: SortVariant) => {
  switch (sortVariant) {
    case 'time':
      return pilots.sort(sortByTime)
    case 'timeReverse':
      return pilots.sort(sortByTimeReverse)
    case 'distance':
      return pilots.sort(sortByDistance)
    case 'distanceReverse':
      return pilots.sort(sortByDistanceReverse)
  }
}
