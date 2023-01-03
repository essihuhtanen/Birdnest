import { AppBar, Toolbar as MUIToolbar, Typography } from '@mui/material'

const Header = ({ height }: { height: string }) => {
  return (
    <AppBar sx={{ backgroundColor: '#172b72' }}>
      <MUIToolbar variant='dense' sx={{ minHeight: height }}>
        <Typography variant='h3'>Birdnest</Typography>
      </MUIToolbar>
    </AppBar>
  )
}

export default Header
