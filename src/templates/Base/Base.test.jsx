import { Base } from '.';
import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';

describe('<Base />', () => {
  test('Test A - should render', () => {
    renderTheme(<Base>Children</Base>);
  });
});