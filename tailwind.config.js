/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'lg-custom': '934px', // Custom breakpoint for 1000px
            },
        },
    },
    plugins: [],
}