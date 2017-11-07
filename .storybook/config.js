import { configure, storiesOf, setAddon } from '@storybook/react'
import infoAddon, { setDefaults } from '@storybook/addon-info'

setAddon(infoAddon);

setDefaults({
  source: true,
  inline: true,
  header: false,
});

const req = require.context('../src/', true, /stories\.(js|jsx)$/)

configure(() => req.keys().forEach(req), module)
