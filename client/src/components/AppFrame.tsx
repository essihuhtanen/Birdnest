import { Box, Stack, styled, Typography } from '@mui/material'
import Header from './Header/Header'
import { useEffect } from 'react'
import { useInfoStore } from '../store/infoStore'

const HEADER_HEIGHT = '100px'

const Root = styled('div')(() => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  minWidth: '320px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch'
}))

const Background = styled(Stack)(() => ({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'pink',
  marginTop: HEADER_HEIGHT,
  alignContent: 'center',
  overflowY: 'scroll'
}))

const PilotInfo = styled('div')(() => ({
  backgroundColor: 'white',
  display: 'inline-block'
}))

const AppFrame = () => {
  const { fetchDrones, drones } = useInfoStore()

  // Set the interval to fetch drones
  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchDrones()
    }, 2000)
    return () => {
      clearInterval(intervalCall)
    }
  }, [])

  useEffect(() => {
    console.log('Drones updated')
  }, [drones])

  return (
    <Root>
      <Header height={HEADER_HEIGHT} />
      <Background spacing={2}>
        {drones.length > 0 ? (
          drones.map((drone) => (
            <PilotInfo id={drone.serialNumber}>
              <li>{drone.serialNumber}</li>
              <li>{drone.lastSeen.toLocaleTimeString()}</li>
              <li>{drone.distance}</li>
            </PilotInfo>
          ))
        ) : (
          <Typography>No drones</Typography>
        )}
      </Background>
    </Root>
  )
}

export default AppFrame
