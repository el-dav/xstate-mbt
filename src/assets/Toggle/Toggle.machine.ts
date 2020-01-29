import { Machine } from 'xstate';

import { MachineTestContext } from 'types';

enum STATES {
  ON = 'ON',
  OFF = 'OFF',
}

enum EVENTS {
  TOGGLE = 'TOGGLE',
}

type Schema = {
  states: {
    [STATES.ON]: {};
    [STATES.OFF]: {};
  };
};

type Event = { type: EVENTS.TOGGLE };

type Context = {};

const ID = 'TOGGLE';

const toggleMachine = Machine<Context, Schema, Event>({
  id: ID,
  initial: STATES.OFF,
  states: {
    [STATES.OFF]: {
      on: {
        [EVENTS.TOGGLE]: {
          target: STATES.ON,
        },
      },
      meta: {
        test: ({ expect, getByTestId }: MachineTestContext) => {
          expect(getByTestId(ID)).toHaveAttribute('data-state', STATES.OFF);
        },
      },
    },
    [STATES.ON]: {
      on: {
        [EVENTS.TOGGLE]: {
          target: STATES.OFF,
        },
      },
      meta: {
        test: ({ expect, getByTestId }: MachineTestContext) => {
          expect(getByTestId(ID)).toHaveAttribute('data-state', STATES.ON);
        },
      },
    },
  },
});

export { STATES, EVENTS, ID };

export default toggleMachine;
