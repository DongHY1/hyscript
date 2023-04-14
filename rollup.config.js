import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
    {
      format: 'esm',
      file: 'dist/index.mjs',
    },

  ],
  plugins: [typescript()],
}
