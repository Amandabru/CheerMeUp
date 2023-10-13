import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/*.{js,ts,jsx,tsx}',
        './src/components/*/*.{js,ts,jsx,tsx}',
        './src/components/Card.tsx',
        './src/pages/*/*.{js,ts,jsx,tsx}',
        './src/animations/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            spacing: {
                13: '3.25rem',
                15: '3.75rem',
                128: '32rem',
                144: '36rem'
            },
            animation: {
                spin: 'spin 6s linear infinite',
                wiggle: 'wiggle 2s ease-in-out infinite'
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-10deg)' },
                    '50%': { transform: 'rotate(10deg)' }
                }
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            'light',
            {
                dark: {
                    ...require('daisyui/src/theming/themes')[
                        '[data-theme=dark]'
                    ],
                    primary: 'mediumgreen',
                    'primary-focus': 'mediumgreen'
                }
            }
        ]
    }
};
