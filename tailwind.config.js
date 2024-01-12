/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                white: "rgb(226 232 240)",
                secondary: "#F0761D",
                dimWhite: "rgb(148 163 184)",
                active: "rgba(240, 118, 29, 0.7)",
            },
            screens: {
                xss: "384px",
                xs: "480px",
                ss: "620px",
                sm: "768px",
                md: "1060px",
                lg: "1200px",
                xl: "1700px",
                fhd: '1920px',
                sfhd: '2080px',
            },
            flex: {
                '1/2': '0.5 1 0%',
                '1.5': '1.5 1 0%',
                '2': '2 2 0%',
            },
        },
    },
    plugins: [],
};
