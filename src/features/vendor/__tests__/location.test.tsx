import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LocationCard } from '../components/LocationCard';

const initialState = {};

const mockStore = configureStore();

test('location card has an image and buttons are clickable', async () => {
  const location = render(
    <Provider store={mockStore(initialState)}>
      <LocationCard />
    </Provider>
  );

  const locationImg = (await location.findByTestId('hero-img')) as HTMLImageElement;
  expect(locationImg.src).toContain('map.svg');

  const editButton = await location.queryAllByTestId('edit');
  await editButton.click;
  const deleteButton = await location.queryAllByTestId('delete');
  await deleteButton.click;

  location.unmount();
});
