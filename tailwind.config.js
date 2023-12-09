/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                white: "rgb(226 232 240)",
                secondary: "#F0761D",
                dimWhite: "rgb(148 163 184)",
            },
            screens: {
                xs: "480px",
                ss: "620px",
                sm: "768px",
                md: "1060px",
                lg: "1200px",
                xl: "1700px",
            },
        },
    },
    plugins: [],
};
