import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    marginTop: 8,
    marginBottom: 11,
    flex: 'auto',
    marginLeft: 5
  }
}))

const BoardHeader = ({ onExitMatch }) => {
  const styles = useStyles()
  return (
    <>
      <Typography variant='h5' className={styles.title}>
        <b>Rikiki</b>
      </Typography>
      <IconButton color='primary' onClick={() => { onExitMatch() }}>
        <ExitToApp />
      </IconButton>
    </>
  )
}

export default BoardHeader
