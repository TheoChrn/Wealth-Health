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
  /*rollupOptions: {
    external: ['react', 'react-dom', 'react-select'],
    output: {
      globals: {
        react: 'React',
      },
    },
  },*/
}








