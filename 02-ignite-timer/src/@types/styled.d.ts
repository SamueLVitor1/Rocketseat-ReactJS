import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

// criando tipagem para o modulo styled components
declare module 'styled-componetns' {
  export interface DefaultTheme extends ThemeType{}
}