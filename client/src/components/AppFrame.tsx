import { styled, Typography } from '@mui/material'
import Header from './Header/Header'
import { fetcher } from '../utils/fetcher'
import { useEffect, useState } from 'react'

const HEADER_HEIGHT = '100px'

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  minWidth: '320px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch'
}))

const Background = styled('div')(({ theme }) => ({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'pink',
  marginTop: HEADER_HEIGHT
}))

const AppFrame = () => {
  const [xml, setXML] = useState('Placeholder')

  const droneXML = async () => {
    console.log('fetching drones')
    const data = await fetcher({ path: 'drones' })
    setXML(data)
  }

  useEffect(() => {
    droneXML()
  }, [])

  return (
    <Root>
      <Header height={HEADER_HEIGHT} />
      <Background>
        <Typography>{xml}</Typography>
      </Background>
    </Root>
  )
}

export default AppFrame
