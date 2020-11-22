import React , { useState } from 'react'
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
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(({ palette }) => ({
  title: {
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    marginTop: 8,
    marginBottom: 11,
    flex: 'auto',
    marginLeft: 5
  },
  settingHead: {
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.34)',
    fontWeight: 'bold',
    fontSize: 13,
    '& + *': {
      color: 'rgba(0,0,0,0.34)',
      fontSize: 28
    }
  },
  settingLabel: {
    fontSize: 13
  },
  settingIcon: {
    padding: 6,
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.04)',
    width: 32,
    height: 32
  },
  blue: {
    color: 'rgb(0, 153, 255)',
    background: 'none'
  },

  root: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 40,
    border: '1px solid',
    borderColor: palette.grey[300]
  },
  iconBtn: {
    padding: 8,
    '& svg': {
      fontSize: 16
    }
  },
  value: {
    padding: '0px 8px'
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

const MatchCreator = (props) => {
  const { onCreateMatch} = props
  const styles = useStyles()


  const [nbPlayers, setNbPlayer] = useState(2);


  return (
    <div>
    <SectionHeader>Créer un nouveau match</SectionHeader>
    <Box pb={2} align={"center"}>
      <div className={styles.root}>
        <IconButton
          className={styles.iconBtn} onClick={() => (nbPlayers - 1 >= 2 ? setNbPlayer(nbPlayers - 1) : 2)}                  >
          <Remove />
        </IconButton>
        <span className={styles.value}>{nbPlayers}</span>
        <IconButton
          className={styles.iconBtn}
          onClick={() => setNbPlayer(nbPlayers + 1)}
        >
          <Add />
        </IconButton>
        <>&nbsp;</>
        <IconButton
          className={styles.iconBtn}
          color="primary"
          onClick={() => onCreateMatch(nbPlayers)}
        >
          <CheckIcon />
        </IconButton>
      </div>
    </Box>
    <Divider />
    </div>
  )
}

export default MatchCreator
