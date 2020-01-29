import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createModel } from '@xstate/test';

import { MachineTestContext } from 'types';

import toggleMachine, { EVENTS, ID } from './Toggle.machine';
import Toggle from './Toggle';

describe('Toggle', () => {
  describe('Toggle Machine', () => {
    const toggleModel = createModel<MachineTestContext>(
      toggleMachine
    ).withEvents({
      [EVENTS.TOGGLE]: {
        exec: async ({ getByTestId }) => {
          await fireEvent.click(getByTestId(ID));
        },
      },
    });

    const testPlans = toggleModel.getShortestPathPlans();

    testPlans.forEach(plan => {
      describe(plan.description, () => {
        // Do any cleanup work after testing each path
        // afterEach(cleanup);

        plan.paths.forEach(path => {
          test(path.description, async () => {
            const rendered = render(<Toggle color="red" />);
            await path.test({
              ...rendered,
              expect,
            });
          });
        });
      });
    });

    test('coverage', () => {
      toggleModel.testCoverage();
    });
  });
});
