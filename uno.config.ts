import { defineConfig, presetWind, presetTypography } from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetTypography()],
  theme: {
    colors: {
      cream: '#FFFBF7',
      gold: '#D4AF37',
      green: '#A8B89F',
      dark: '#2C2C2C',
      white: '#FFFFFF',
    },
  },
  shortcuts: {
    'btn-primary':
      'px-6 py-3 bg-gold text-white rounded-full hover:bg-opacity-90 transition-all duration-300 font-semibold',
    'btn-secondary':
      'px-6 py-3 border-2 border-gold text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 font-semibold',
    card: 'bg-white rounded-lg shadow-lg p-6 transition-all duration-300',
    'section-title': 'text-4xl md:text-5xl font-serif text-dark text-center mb-12',
    'section-padding': 'py-16 md:py-24 px-4 md:px-8',
  },
  rules: [
    [
      'text-gradient-gold',
      {
        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'background-clip': 'text',
      },
    ],
  ],
  safelist: ['animate-fade-in', 'animate-slide-up', 'animate-float'],
});
