import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  middle: {
    flex: 'auto',
    marginLeft: 16
  },
  iconBtn: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, .04)',
    '&:not(:last-child)': {
      marginRight: 16
    }
  }
}))

const PlayerPlate = ({ playerName }) => {
  const styles = useStyles()
  return (
    <Box py='10px' px={2} display='flex' alignItems='center'>
      <Typography variant='h5' className={styles.middle}>
        Hello {playerName}
      </Typography>
    </Box>
  )
}

export default PlayerPlate
