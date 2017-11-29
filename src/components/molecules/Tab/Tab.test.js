import React from 'react'
import { shallow, mount } from 'enzyme'
import Tab from '../Tab'

describe('TabPinned', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Tab />)).toHaveLength(1)
  })
})
