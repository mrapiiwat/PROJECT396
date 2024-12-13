/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // เพิ่มสีที่ต้องการ
      colors: {
        passenger: {
          DEFAULT: "#4CAF50", // สีสำหรับผู้โดยสาร
          hover: "#388E3C",
        },
        driver: {
          DEFAULT: "#2196F3", // สีสำหรับคนขับ
          hover: "#1976D2",
        },
        primary: '#4CAF50', // สีเขียว (สำหรับผู้โดยสาร)
        secondary: '#2196F3', // สีฟ้า (สำหรับคนขับ)
      },
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"], // ตั้งค่า Font
      },
    },
  },
  plugins: [],
};