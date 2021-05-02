import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const Sequin = ({ run }) => (
  <StyledConfetti
    recycle={false}
    colors={['#D9ABFF', '#FFC985', '#96DAFF', '#97FEAF', '#FFFE8B']}
    opacity={0.9}
    run={run}
    numberOfPieces={400}
  />
);

const StyledConfetti = styled(Confetti)`
  position: fixed !important;
`;

export default Sequin;
