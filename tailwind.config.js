/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        navy: '#0F2A52',
        brand: {
          50: '#EEF4FF',
          100: '#DCE9FF',
          200: '#B9D3FF',
          300: '#8FB6FF',
          400: '#5C90FA',
          500: '#2F6FED',
          600: '#1F53C4',
          700: '#183F97',
          800: '#132F6E',
          900: '#0F2A52',
        },
        mist: '#F5F8FC',
        line: '#E3E9F2',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 42, 82, 0.06)',
        card: '0 1px 3px rgba(15, 42, 82, 0.08)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
  plugins: [],
};
