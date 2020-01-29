import { RenderResult } from '@testing-library/react';

export type MachineTestContext = RenderResult & {
  expect: typeof expect;
};
