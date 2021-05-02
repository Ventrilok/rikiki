import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { filter } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Layout, {
  Root,
  getContent,
  getFullscreen,
  getDrawerSidebar,
  getInsetFooter,
} from '@mui-treasury/layout';
import theme from '../../theme/theme';

import GamePanel from '../gamepanel';
import PlayingCard from '../playingcard';
import PlayerList from '../playerlist';
import Sequin from '../sequin';
import Hand from '../hand';

const Content = getContent(styled);
const Fullscreen = getFullscreen(styled);
const DrawerSidebar = getDrawerSidebar(styled);

const InsetFooter = getInsetFooter(styled);

const images = require.context('../../images/', true);

const useStyles = makeStyles(() => ({
  gameZone: {
    backgroundColor: '#038c65',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.24' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  trumpZone: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  lastPlayedCards: {
    borderRadius: '1vh',
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderColor: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
    color: '#ffffff',
    padding: theme.spacing(2),
  },
  playingZone: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  middle: {
    flex: 'auto',
    marginLeft: 10,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, .04)',
    '&:not(:last-child)': {
      marginRight: 16,
    },
  },
  bidValue: {
    padding: '0px 8px',
    fontSize: 20,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const RikikiBoard = (props) => {
  const { G, ctx, moves, playerID, matchData, onExitMatch } = props;
  const isCurrentPlayer = playerID === ctx.currentPlayer;
  const [centralDeck, setCentralDeck] = useState([]);

  /** ******** Bidder functions ********* */
  const [openBidder, setOpenBidder] = useState(false);
  const [bid, setBid] = useState(null);

  let totalBid = 0;
  for (let i = 0; i < G.players.length; i++) {
    totalBid += G.players[i].bid;
  }

  const forbbidenBid = G.currentLevel - totalBid;
  const possibleBids = Array.from(Array(G.currentLevel + 1).keys());

  if (G.nbBids + 1 === ctx.numPlayers) {
    possibleBids.splice(forbbidenBid, 1);
  }

  function decreaseBid() {
    if (bid === null) {
      setBid(forbbidenBid !== 0 ? 0 : 1);
    } else if (possibleBids.includes(bid - 1)) {
      setBid(bid - 1);
    } else if (bid - 2 >= 0) {
      setBid(bid - 2);
    }
  }

  function increaseBid() {
    if (bid === null) {
      setBid(forbbidenBid !== 0 ? 0 : 1);
    } else if (possibleBids.includes(bid + 1)) {
      setBid(bid + 1);
    } else if (bid + 2 <= G.currentLevel) {
      setBid(bid + 2);
    }
  }
  function abosluteZero() {
    moves.bid(0, true);
    setOpenBidder(false);
  }

  function announceBid() {
    moves.bid(bid, false);
    setOpenBidder(false);
  }
  /** ******** Bidder functions ********* */

  /** ******** Exchange Trump functions ********* */
  const [openExchange, setOpenExchange] = useState(false);

  function exchangeTrump(doExchange) {
    moves.exchangetrump(doExchange);
    setOpenExchange(false);
  }
  /** ******** Exchange Trump functions ********* */

  /** ******** Play functions ********* */
  function playCard(index) {
    if (G.playedCards.length === 0) {
      // if there is no card played then, the player can play anything
      moves.playcard(index);
    } else {
      const playerCard = G.players[ctx.currentPlayer].hand[index]; // Get the intended card to play
      const results = filter(G.players[ctx.currentPlayer].hand, ['suit', G.playedCards[0].suit]); // Check if player has any card of the suite of the 1st card thrown
      if (results.length > 0 && playerCard.suit == G.playedCards[0].suit) {
        moves.playcard(index);
      } else if (results.length === 0) {
        moves.playcard(index);
      }
    }
  }
  /** ******** Play functions ********* */

  /** ******** Phase control functions ********* */
  useEffect(() => {
    switch (ctx.phase) {
      case 'draw':
        setOpenExchange(G.canExchange && playerID.toString() === G.playerCanExchange.toString());
        break;
      case 'bid':
        setOpenBidder(isCurrentPlayer);
        break;
      default:
    }
  });

  const isGameOver = ctx.gameover !== undefined;
  /** ******** Phase control functions ********* */

  useEffect(() => {
    let timer;
    if (ctx.phase === 'bid') {
      setCentralDeck([]);
    } else if (G.playedCards.length === 0) {
      setCentralDeck(G.lastPlayedCards);
      timer = setTimeout(() => {
        setCentralDeck([]);
      }, 1500);
    } else if (G.playedCards.length > 0) {
      setCentralDeck(G.playedCards);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [G.playedCards]);

  /* Layout settings */
  const styles = useStyles();
  const scheme = Layout();
  scheme.configureHeader((builder) => {
    builder.create('appHeader').registerConfig('xs', {
      position: 'relative',
      initialHeight: 60,
    });
  });
  scheme.configureEdgeSidebar((builder) => {
    builder.create('primarySidebar', { anchor: 'left' }).registerPermanentConfig('xs', {
      width: '25%',
      collapsible: true,
      collapsedWidth: 80,
    });
  });
  scheme.enableAutoCollapse('primarySidebar', 'sm');
  scheme.configureInsetSidebar((builder) => {
    builder.create('secondarySidebar', { anchor: 'right' }).registerAbsoluteConfig('sm', {
      width: '33%',
    });
  });

  const transitions = useTransition(centralDeck, (card) => card.key, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Fullscreen className={styles.gameZone}>
      <Root theme={theme} scheme={scheme}>
        <CssBaseline />
        <DrawerSidebar sidebarId="primarySidebar">
          <Box py="10px" px={2} display="flex" alignItems="center">
            <Typography variant="h5" className={styles.middle}>
              <b>
                {typeof matchData !== 'undefined' ? matchData[playerID].name : G.players[0].name}
              </b>
            </Typography>
            <IconButton className={styles.iconBtn}>
              <ExitToApp onClick={onExitMatch} />
            </IconButton>
          </Box>
          <GamePanel
            direction={G.direction}
            currentLevel={G.currentLevel}
            totalRound={G.totalRound}
          />
          <PlayerList
            players={G.players}
            playerNames={matchData}
            currentPlayer={ctx.currentPlayer}
          />
        </DrawerSidebar>
        <Content>
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={4}>
            <Grid item xs={6}>
              <Box className={styles.trumpZone}>
                <PlayingCard card={G.trump} cardWidth={120} />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box className={styles.lastPlayedCards}>
                {G.lastPlayedCards.length === 0
                  ? 'Dernier pli'
                  : G.lastPlayedCards.map((card) => (
                      <PlayingCard card={card} cardWidth={80} key={card.key} />
                    ))}
              </Box>
            </Grid>
            <Grid item xs={12} className={styles.playingZone}>
              <div className="hand hhand active-hand">
                {transitions.map(({ item, key }) => (
                  <animated.img
                    key={key}
                    style={props}
                    alt=""
                    className="card"
                    width={120}
                    src={images(`./${item.point}${item.suit.toUpperCase()}.svg`).default}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Content>
        <InsetFooter ContainerProps={{ disableGutters: true }}>
          <Box display="flex" p={1}>
            <Hand
              cards={G.players[playerID].hand}
              cardWidth={100}
              spacing={0.25}
              active={isCurrentPlayer}
              onPlayCard={playCard}
            />
          </Box>
        </InsetFooter>

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={openExchange}
          aria-labelledby="dialog-exchange"
          TransitionComponent={Transition}
        >
          <DialogTitle id="dialog-exchange">Echange</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Désires-tu échanger ton 2 d&apos;atout avec l&apos;atout actuel?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => exchangeTrump(false)} color="secondary" variant="contained">
              Non
            </Button>
            <Button onClick={() => exchangeTrump(true)} color="primary" variant="contained">
              Oui
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={openBidder}
          aria-labelledby="dialog-bidder"
          TransitionComponent={Transition}
        >
          <DialogTitle id="dialog-bidder">Paris</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Combien de pli penses-tu être capable de faire ?
            </DialogContentText>
            <Box mb={2} align="center">
              <IconButton onClick={() => decreaseBid()}>
                <Remove />
              </IconButton>
              <span className={styles.bidValue}>{bid}</span>
              <IconButton onClick={() => increaseBid()}>
                <Add />
              </IconButton>
            </Box>
          </DialogContent>
          <DialogActions>
            {G.currentLevel >= 7 && (
              <Button onClick={abosluteZero} color="secondary" variant="contained">
                Je tente le zéro absolu
              </Button>
            )}
            <Button
              disabled={bid === null}
              onClick={announceBid}
              color="primary"
              variant="contained"
            >
              Je valide {bid}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isGameOver}
          aria-labelledby="dialog-gameover"
          TransitionComponent={Transition}
        >
          <DialogTitle id="dialog-gameover">Fin de partie</DialogTitle>
          <DialogContent>
            <Sequin run={isGameOver} />
            <DialogContentText id="alert-dialog-description">
              Merci d&apos;avoir joué.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onExitMatch} color="primary" variant="contained">
              Quitter la partie
            </Button>
          </DialogActions>
        </Dialog>
      </Root>
    </Fullscreen>
  );
};

export default RikikiBoard;
