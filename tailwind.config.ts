/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Solid Colors
        "text-grey-2": '#222222',
        "text-grey-1": '#AAAAAA',
        "text-blue-2": '#0C365A',
        "text-blue-1": '#325BAF',
        "text-green": '#01D167',
        skyBlue: '#23CEFD',
        indigoBlue: '#536DFF',
        lightGray: '#E5E5E5',
        "pale-gray": '#F0F0F0',
        "cloud-white": '#F5F5F5',
        "powder-blue": '#F5F9FF',
        "mint-cream": '#EDFFF5',
        "pastel-mint": '#DDFFEC',
        "soft-white": '#FCFCFC',
        iceWhite: '#FAFCFF',
        silverMist: '#DDDDDD',

        // Transparent & Overlay Colors
        blackOverlay2: '#00000005',
        blackOverlay4: '#0000000A',
        blackOverlay6: '#0000000F',
        blackOverlay8: '#00000014',
        blackOverlay12: '#0000001F',
        blackOverlay16: '#00000029',
        transparentBlueTint: '#009DFF1A',
        transparentTealTint: '#00D6B51A',
        transparentPinkTint: '#F251951A',
        transparentDarkGreen: '#072A441F',
        transparentWhite: '#FFFFFF00',
        transparentBlack: '#00000000',
      },

      fontFamily: {
        avenir: ['Nunito', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        sfpro: ['Inter', 'sans-serif'],
      },

      fontSize: {
        'fs-9': '9px',
        'fs-12': '12px',
        'fs-13': '13px',
        'fs-14': '14px',
        'fs-15': '15px',
        'fs-16': '16px',
        'fs-22': '22px',
        'fs-24': '24px',
        'fs-26': '26px',
      },

      lineHeight: {
        'lh-12': '12px',
        'lh-13': '13px',
        'lh-14': '14px',
        'lh-16': '16px',
        'lh-18': '18px',
        'lh-19': '19px',
        'lh-20': '20px',
        'lh-24': '24px',
        'lh-32': '32px',
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      letterSpacing: {
        normal: '0',
        wide24: '0.015em',
        wide120: '0.075em',
        wide247: '0.15em',
      },
    },
  },
  plugins: [],
}
