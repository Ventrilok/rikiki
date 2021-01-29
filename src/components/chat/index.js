import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import { roundTextFieldStylesHook } from '@mui-treasury/styles/textField/round'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'left',
    padding: 4
  },
  iconBtn: {
    padding: 8,
    '& svg': {
      fontSize: 20
    }
  },
  value: {
    padding: '0px 8px'
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
    marginRight: 5
  },
  txtMsg:
  {
    borderRadius: 20,
    borderColor: '#becddc',
    fontSize: '0.75rem'
  }
}))

const Chat = ({ onSend, messages, playerNames}) => {
  const styles = useStyles()

  const [message, setMessage] = useState('')

  const onChange = (event) => {
    setMessage(event.target.value)
  }

  const triggerSend = (event) => {
    event.preventDefault()
    onSend(message)
    setMessage('')
  }
  const inputBaseStyles = roundTextFieldStylesHook.useInputBase()
  const inputLabelStyles = roundTextFieldStylesHook.useInputLabel()
  const helperTextStyles = roundTextFieldStylesHook.useHelperText()
  return (
    <Box mb={2} >
      <div
        style={{
          height: 200,
          maxWidth: 400,
          padding: '.5em',
          overflow: 'scroll'
        }}
      >
        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: '.25em' }}>
            <strong>{playerNames[message.sender].name}:</strong> {message.payload}
          </div>
        ))}
      </div>
      <TextField
        onChange={onChange} value={message}
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        FormHelperTextProps={{ classes: helperTextStyles }}
      />

      <IconButton className={styles.iconBtn} onClick={(e) => triggerSend(e)}>
        <SendIcon />
      </IconButton>

    </Box>
  )
}

export default Chat
