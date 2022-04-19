import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import App from './App';
import TimerFuncitonal from './components/TimerFunctional';

jest.useFakeTimers();

test('Play to pause btn', () => {
  const { getByTestId } = render(<App />);
  const toggleButton = getByTestId("btn-play-pause")
  fireEvent.click(toggleButton);
  const pauseBtn = getByTestId("PauseIcon");

  expect(toggleButton).toContainElement(pauseBtn)
});

test('Timer tick', () => {
  const { getByTestId } = render(<App />);
  const toggleButton = getByTestId("btn-play-pause")
  fireEvent.click(toggleButton);

  jest.time
});
