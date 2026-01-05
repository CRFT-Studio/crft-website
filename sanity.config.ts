// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'crft-studio',
  title: 'CRFT Studio',
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET_NAME,
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
})
