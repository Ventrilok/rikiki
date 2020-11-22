import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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

const LobbyHeader = () => {
  const styles = useStyles()
  return (
    <>    
    <Typography variant={'h5'} className={styles.title}>
      <b>RiQiQi</b>
    </Typography>
    </>  
  )
}

export default LobbyHeader
