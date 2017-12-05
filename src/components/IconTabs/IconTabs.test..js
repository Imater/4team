import React from 'react'
import { shallow } from 'enzyme'
import IconTabs from '../IconTabs'

describe('IconTabs', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<IconTabs />)).toHaveLength(1)
  })
})
