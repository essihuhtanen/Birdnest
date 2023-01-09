const ORIGO_X = 250000
const ORIGO_Y = 250000

export const distanceFromNest = (x, y) => {
  const xDist = x - ORIGO_X
  const yDist = y - ORIGO_Y
  return Math.sqrt(xDist * xDist + yDist * yDist) / 1000
}
