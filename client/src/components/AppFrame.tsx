import { Stack, styled, Typography } from '@mui/material'
import Header from './Header'
import PilotInfo from './PilotInfo'
import SortingMenu from './SortingMenu'
import { useEffect } from 'react'
import { useInfoStore } from '../store/infoStore'
import { Container } from '@mui/system'
import { SortOption } from '../types/sortVariant'

const HEADER_HEIGHT = '100px'
const MARGIN_HEIGHT = '50px'
const SORT_OPTIONS: SortOption[] = [
  { name: 'Newest first', sortId: 'time' },
  { name: 'Oldest first', sortId: 'timeReverse' },
  { name: 'Closest first', sortId: 'distance' },
  { name: 'Farthest first', sortId: 'distanceReverse' }
]

const Root = styled('div')(() => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  minHeight: '100vh',
  minWidth: '320px'
}))

const Background = styled(Stack)(() => ({
  width: '100%',
  height: '100%',
  marginTop: HEADER_HEIGHT
}))

const PilotContainer = styled(Container)(() => ({
  width: '60%',
  marginTop: MARGIN_HEIGHT,
  marginBottom: MARGIN_HEIGHT,
  backgroundColor: 'white',
  alignItems: 'center'
}))

const AppFrame = () => {
  const { fetchDrones, pilots, setSortVariant, sortDescription } = useInfoStore()

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
          <Stack direction='row-reverse' alignItems='center' justifyContent='space-between'>
            <SortingMenu options={SORT_OPTIONS} onSelection={setSortVariant} />
            {pilots.length > 0 && (
              <Typography variant='body2'>{`Showing drone spottings (${sortDescription})`}</Typography>
            )}
          </Stack>
          <Stack direction='row'></Stack>
          {pilots.length > 0 ? (
            pilots.map((pilot) => <PilotInfo key={pilot.id} pilot={pilot}></PilotInfo>)
          ) : (
            <Typography>No drones in the No Drone Zone</Typography>
          )}
        </PilotContainer>
      </Background>
    </Root>
  )
}

export default AppFrame
