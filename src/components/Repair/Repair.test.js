import React from 'react'
import { shallow } from 'enzyme'
import Repair from '.'

describe('@component Repair', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Repair />)).toHaveLength(1)
  })
})

