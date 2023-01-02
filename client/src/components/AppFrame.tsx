import { Box, Stack, styled, Typography } from '@mui/material'
import Header from './Header/Header'
import { useEffect } from 'react'
import { useInfoStore } from '../store/infoStore'
import { Container } from '@mui/system'

const HEADER_HEIGHT = '100px'

const Root = styled('div')(() => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  minWidth: '320px'
}))

const Background = styled(Stack)(() => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: 'pink',
  marginTop: HEADER_HEIGHT
}))

const PilotInfo = styled(Stack)(() => ({
  margin: '5px',
  padding: '5px',
  backgroundColor: 'white',
  display: 'inline-block',
  borderStyle: 'solid',
  borderRadius: '5px'
}))

const PilotContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  alignItems: 'center'
}))

const AppFrame = () => {
  const { fetchDrones, pilots } = useInfoStore()

  // Set the interval to fetch drones
  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchDrones()
    }, 2000)
    return () => {
      clearInterval(intervalCall)
    }
  }, [])

  return (
    <Root>
      <Header height={HEADER_HEIGHT} />
      <Background>
        <PilotContainer>
          {pilots.length > 0 ? (
            pilots.map((pilot) => (
              <PilotInfo id={pilot.id}>
                <ul>
                  Name: {pilot.firstname} {pilot.lastname}
                </ul>
                <ul>Email: {pilot.email}</ul>
                <ul>Phone: {pilot.phone}</ul>
                <ul>Last spotted: {pilot.drone.lastSeen.toLocaleTimeString()}</ul>
                <ul>Closest distance to nest: {pilot.drone.distance.toFixed(2)} m</ul>
              </PilotInfo>
            ))
          ) : (
            <Typography>No drones in the No Drone Zone</Typography>
          )}
        </PilotContainer>
      </Background>
    </Root>
  )
}

export default AppFrame
