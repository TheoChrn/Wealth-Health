import react from '@vitejs/plugin-react'

export default {
  plugins: [
    react(),
  ],
  css: {
    modules:true,
  },
  build: {
    cssCodeSplit: true,
  },
}








