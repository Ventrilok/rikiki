import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../theme/theme'

import { Root} from '@mui-treasury/layout'

import bkgdImg from '../images/amanda-jones-P787-xixGio-unsplash.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${bkgdImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function EnterLobby ({playerName, onEnter}) {
  const classes = useStyles()
  const [name, setName] = useState(playerName)

  function handleLogin () {
    onEnter(name)
  }

  return (
    <Root theme={theme} >
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} >
      ici
      </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ImportExportIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
            Bienvenu sur Rikiki v2.0
          </Typography>

            <Typography variant='body'>
            C'est sans doute un peu plus beau.... mais ça marche pas forcément mieux :p
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='playerName'
                name='playerName'
                autoComplete='playerName'
                autoFocus
                label={'Entrez votre nom:'}
                value={name}
                onChange={e => setName(e.target.value)}

            />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleLogin}
            >
              Entrer !
            </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Root>
  )
}
