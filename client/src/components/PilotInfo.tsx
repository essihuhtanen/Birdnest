import { Stack, styled, Typography } from '@mui/material'
import { Pilot } from '../types'

const PilotHolder = styled(Stack)(() => ({
  margin: '5px 5px 5px 5px',
  padding: '5px 5px 5px 5px'
}))

const PilotHeader = styled(Stack)(() => ({
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'space-between'
}))

const PilotInfo = ({ pilot }: { pilot: Pilot }) => {
  const { firstname, lastname, email, phone, drone } = pilot
  const pilotName = `${firstname} ${lastname}`
  const lastSeen = `Last seen: ${drone.lastSeen.toLocaleTimeString()}`
  return (
    <PilotHolder>
      <PilotHeader direction='row'>
        <Typography variant='h6'>{pilotName}</Typography>
        <Typography variant='body1'>{lastSeen}</Typography>
      </PilotHeader>
      <Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography>{`${drone.model} (${drone.manufacturer})`}</Typography>
          <Typography>{`Closest distance: ${drone.distance.toFixed(2)} m`}</Typography>
        </Stack>
        <Stack direction='row'>
          <Typography variant='subtitle2'>{`Email: ${email}`}</Typography>
        </Stack>
        <Stack direction='row'>
          <Typography variant='subtitle2'>{`Phone: ${phone}`}</Typography>
        </Stack>
      </Stack>
    </PilotHolder>
  )
}

export default PilotInfo
