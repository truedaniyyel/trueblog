import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  themes: ['andromeeda'],

  styleOverrides: {
    // You can also override styles
    borderRadius: '0.5rem',
    uiFontFamily: 'JetBrains Mono',
    codeFontFamily: 'JetBrains Mono',
    codeFontSize: '1rem'
  },
});