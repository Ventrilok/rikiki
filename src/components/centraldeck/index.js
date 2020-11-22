import React, {useState, useEffect} from 'react'
import {useTransition, animated} from 'react-spring'
import Box from '@material-ui/core/Box'

const CentralDeck = ({ playedCards, lastPlayedCards }) => {
  const [centralDeck, setCentralDeck] = useState([])

  useEffect(() => {
    let timer
    if (playedCards.length === 0) {
      setCentralDeck(lastPlayedCards)
      timer = setTimeout(() => { setCentralDeck([]) }, 2000)
    } else if (lastPlayedCards.length > 0) {
      setCentralDeck(playedCards)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [playedCards])

  const transitions = useTransition(centralDeck, card => card.key, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return (
    <Box pb={20}>
      <div className='hand active-hand hhand-compact'>
        {transitions.map(({ item, props, key }) =>
          <animated.div
            key={key}
            style={props}>
            <img
              key={item.point + '' + item.suit}
              alt=''
              className='card'
              src={`./cards/${item.point}${item.suit}.svg`}
          />
          </animated.div>
  )}
      </div>
    </Box>
  )
}

export default CentralDeck
