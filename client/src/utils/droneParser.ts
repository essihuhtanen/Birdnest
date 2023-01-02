import { Drone } from '../types'
import { distanceFromNest } from './distance'

/**
 * Parses a string of XML data to an array of Drones.
 * @param data
 * @returns array of Drones parsed ([] if none in the data)
 */
export const droneParser = (data: string) => {
  const drones: Drone[] = []

  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(data, 'text/xml')
  const droneinfos = xmlDoc.getElementsByTagName('drone')

  for (let i = 0; i < droneinfos.length; i++) {
    if (droneinfos[i].getElementsByTagName('serialNumber')[0].textContent !== null) {
      const serialNumber = droneinfos[i].getElementsByTagName('serialNumber')[0].textContent
      const model = droneinfos[i].getElementsByTagName('model')[0].textContent
      const manufacturer = droneinfos[i].getElementsByTagName('manufacturer')[0].textContent
      const xPos = droneinfos[i].getElementsByTagName('positionX')[0].textContent
      const yPos = droneinfos[i].getElementsByTagName('positionY')[0].textContent

      let x: number
      let y: number
      xPos !== null ? (x = parseFloat(xPos)) : (x = 0)
      yPos !== null ? (y = parseFloat(yPos)) : (y = 0)

      const newDrone: Drone = {
        serialNumber: serialNumber ? serialNumber : '',
        model: model ? model : '',
        manufacturer: manufacturer ? manufacturer : '',
        x: x,
        y: y,
        distance: distanceFromNest(x, y),
        lastSeen: new Date()
      }
      drones.push(newDrone)
    }
  }

  return drones
}
