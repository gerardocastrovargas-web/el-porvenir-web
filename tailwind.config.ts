import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: { pacific:'#102B32', midnight:'#071A20', champagne:'#CFBD99', ivory:'#F5F0E8', terracotta:'#B47654', sage:'#8FA59B' },
    fontFamily: { display: ['Georgia', 'Times New Roman', 'serif'], sans: ['Arial', 'Helvetica', 'sans-serif'] },
  } }, plugins: []
};
export default config;
