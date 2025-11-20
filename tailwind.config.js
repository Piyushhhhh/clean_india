/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-50',
    'bg-green-50',
    'bg-red-50',
    'border-blue-500',
    'border-green-500',
    'border-red-500',
    'text-blue-700',
    'text-green-700',
    'text-red-700',
    'bg-blue-100',
    'bg-green-100',
    'bg-red-100',
    'bg-orange-100',
    'bg-purple-100',
    'text-blue-600',
    'text-green-600',
    'text-red-600',
    'text-orange-600',
    'text-purple-600',
  ],
}

