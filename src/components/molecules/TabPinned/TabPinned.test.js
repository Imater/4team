import React from 'react'
import { shallow } from 'enzyme'
import TabPinned from '../TabPinned'

describe('TabPinned', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<TabPinned />)).toHaveLength(1)
  })
})
