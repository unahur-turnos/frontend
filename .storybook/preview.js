import theme from '../src/theme';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container>
          <Story />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  ),
];
