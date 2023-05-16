import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  build: {
    commonjsOptions: {
       esmExternals: true 
    },
 },
 rollupOptions: {
  external: ['react', 'react-dom'],
  output: {
    globals: {
      react: 'React',
    },
  },
},

}

