import React from 'react'
import { shallow } from 'enzyme'
import TabPinned from '../Box'

describe('TabPinned', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<TabPinned />)).toHaveLength(1)
  })
})
