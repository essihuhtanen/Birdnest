import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import { useState } from 'react'
import { SortVariant } from '../types/sortVariant'

const SortingMenu = ({
  options,
  onSelection
}: {
  options: { name: string; sortId: SortVariant }[]
  onSelection: (id: SortVariant, description: string) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const setSorter = (id: SortVariant, description: string) => {
    setOpen(false)
    onSelection(id, description)
  }

  return (
    <Stack direction='row'>
      <IconButton size='small' onClick={handleButtonClick}>
        <Typography variant='subtitle2'>Sort</Typography>
        <SortIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.name} onClick={() => setSorter(option.sortId, option.name)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}

export default SortingMenu
