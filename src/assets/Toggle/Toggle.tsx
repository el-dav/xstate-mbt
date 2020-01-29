import React, { FC } from 'react';
import { useMachine } from '@xstate/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import toggleMachine, { STATES, EVENTS, ID } from './Toggle.machine';

type StyledToggleProps = {
  isOn: boolean;
  color: string;
};
const StyledToggle = styled.div<StyledToggleProps>(
  ({ isOn, color }) => css`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: ${isOn ? color : 'grey'};
  `
);

type Props = {
  className?: string;
  color?: string;
};

const Toggle: FC<Props> = ({ color = 'green', ...rest }) => {
  const [current, send] = useMachine(toggleMachine);

  const onClick = () => {
    send(EVENTS.TOGGLE);
  };

  return (
    <StyledToggle
      data-testid={ID}
      data-state={current.value}
      isOn={current.matches(STATES.ON)}
      color={color}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Toggle;
