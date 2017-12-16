import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../Tabs'

describe('Tabs', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Tabs />)).toHaveLength(1)
  })
})
