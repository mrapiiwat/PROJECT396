/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // สแกนไฟล์ทั้งหมดใน src ที่มีส่วนขยายเหล่านี้
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