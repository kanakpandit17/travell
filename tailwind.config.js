/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing :{
        '25':'35rem'

      },
      fontFamily:{
        poppins: ["Poppins", "sans-serif"]
      },
      backgroundImage:{
        'texture_pattern':"url('https://t4.ftcdn.net/jpg/04/84/11/15/360_F_484111532_W0WOkKeXQzF75XusA7R8e3llIDXqyCFm.jpg')"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      }
    },
  },
  plugins: [],
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },


}