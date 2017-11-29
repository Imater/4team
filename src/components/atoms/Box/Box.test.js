import React from 'react'
import { shallow } from 'enzyme'
import Box from '../Box'

describe('Box', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Box />)).toHaveLength(1)
  })
})
