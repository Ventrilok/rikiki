import React, { useState } from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import CheckIcon from '@material-ui/icons/Check'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(({ palette }) => ({

  settingHead: {
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.34)',
    fontWeight: 'bold',
    fontSize: 13,
    '& + *': {
      color: 'rgba(0,0,0,0.34)',
      fontSize: 28
    }
  }
}))

const SectionHeader = ({ children }) => {
  const styles = useStyles()
  return (
    <Box
      p={'14px'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={styles.sectionHeader}
    >
      <Typography className={styles.settingHead}>{children}</Typography>
    </Box>
  )
}

const ExitLobby = ({onExitLobby}) => {
  const styles = useStyles()

  return (
    <div>
      <SectionHeader >Options</SectionHeader>
      <Box pb={2}>
        <Box
          height={'44px'}
          pl={'14px'}
          pr={'12px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
            >
          <Typography variant={'body2'}>Quitter le jeux</Typography>
          <IconButton color='primary' onClick={() => { onExitLobby() }}>
            <ExitToApp />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </div>
  )
}

export default ExitLobby
