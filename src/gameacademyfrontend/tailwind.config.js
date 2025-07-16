/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b62f38',     // Акцент Digipen
        dark: '#1e1f20',        // Тёмный фон header
        light: '#ffffff',       // Светлый фон страницы
      },
      fontFamily: {
        montserrat: ['Proxima Nova', 'sans-serif'],
      },

      typography: ({ theme }) => ({
        brand: {
          css: {
            '--tw-prose-body': theme('colors.gray.800'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-lead': theme('colors.gray.700'),
            '--tw-prose-links': theme('colors.blue.600'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-counters': theme('colors.blue.400'),
            '--tw-prose-bullets': theme('colors.blue.400'),
            '--tw-prose-hr': theme('colors.blue.200'),
            '--tw-prose-quotes': theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.blue.400'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.pink.600'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),
            '--tw-prose-invert-body': theme('colors.gray.200'),
            '--tw-prose-invert-headings': theme('colors.white'),
          },
        },
      }),
  
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

