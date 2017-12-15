/**
 * Component Generator
 */
const path = require('path')
const componentExists = require('../componentExists.js')

const identity = item => item

const generator = kind => ({
  description: `Generator for ${kind} component`,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? 'A atom or molecule with this name already exists' : true
        }

        return 'The name is required'
      }
    }
  ],
  actions: () => ([
    {
      type: 'add',
      path: `./src/components/${kind}s/{{properCase name}}/index.js`,
      templateFile: './index.js.hbs',
      abortOnFail: true
    },
    {
      type: 'add',
      path: `./src/components/${kind}s/{{properCase name}}/{{properCase name}}.js`,
      templateFile: './js.hbs',
      abortOnFail: true
    },
    {
      type: 'add',
      path: `./src/components/${kind}s/{{properCase name}}/{{properCase name}}.styl`,
      templateFile: './styl.hbs',
      abortOnFail: true
    },
    {
      type: 'add',
      path: `./src/components/${kind}s/{{properCase name}}/{{properCase name}}.stories.js`,
      templateFile: './stories.js.hbs',
      abortOnFail: true
    },
    {
      type: 'add',
      path: `./src/components/${kind}s/{{properCase name}}/{{properCase name}}.test.js`,
      templateFile: './test.js.hbs',
      abortOnFail: true
    }
  ].filter(identity).map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  }))
})

module.exports = generator
