import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../theme/theme'
import { Root } from '@mui-treasury/layout'

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

export default function EnterLobby ({ playerName, playersNames, onEnter }) {
  const classes = useStyles()
  const [name, setName] = useState(playerName)

  function handleLogin () {
    onEnter(name)
  }

  function getErrorMessage (name, playersNames) {
    if (!name) {
      return 'Ton nom ne peut pas être vide'
    }
    if (name.length > 10) {
      return 'Pas plus de 10 caractères stp'
    }
    if (playersNames.includes(name)) {
      return 'Sois plus inspiré, ce nom est déjà pris'
    }
    return null
  };

  const errorMessage = getErrorMessage(name, playersNames)
  const hasError = !!errorMessage
  return (
    <Root theme={theme}>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ImportExportIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Bienvenu sur Rikiki v2.0
            </Typography>

            <Typography variant='body1'>
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
                label='Entrez votre nom:'
                value={name}
                error={hasError}
                helperText={errorMessage}
                onKeyPress={({ key }) => !hasError && key === 'Enter' && handleLogin()}
                onChange={e => setName(e.target.value)}
              />
              <Button
                disabled={hasError}
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
