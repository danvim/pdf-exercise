import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { renderToStaticMarkup } from 'react-dom/server'
import * as sass from 'sass'
import 'tsx/esm'
import { IdAttributePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin)
  eleventyConfig.addPlugin(IdAttributePlugin)

  eleventyConfig.setServerOptions({
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })

  eleventyConfig.addExtension('mdx', {
    outputFileExtension: 'html',
    compile: async (str, inputPath) => {
      const { default: mdxContent } = await evaluate(str, {
        ...runtime,
        baseUrl: pathToFileURL(inputPath),
      })
      return async (data) => {
        const res = await mdxContent(data)
        return renderToStaticMarkup(res)
      }
    },
  })

  // SCSS support
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    useLayouts: false,
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath)
      if (parsed.name.startsWith('_')) {
        return
      }
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes],
      })
      this.addDependencies(inputPath, result.loadedUrls)
      return async () => {
        return result.css
      }
    },
  })
  eleventyConfig.addTemplateFormats('scss')

  // TypeScript/TSX/JSX support
  eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile: () =>
      async function (data) {
        const content = await this.defaultRenderer(data)
        return renderToStaticMarkup(content)
      },
  })
  eleventyConfig.addTemplateFormats(['11ty.ts', '11ty.tsx', '11ty.jsx'])

  eleventyConfig.addPassthroughCopy('./public/**/*')

  return {
    dir: {
      input: 'src/pages',
      includes: '../_components',
      layouts: '../_layouts',
      data: '../_data',
      output: '_site',
    },
    templateFormats: ['mdx', 'md', 'scss', '11ty.ts', '11ty.tsx', '11ty.jsx'],
  }
}
