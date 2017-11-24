import React from 'react'
import { shallow } from 'enzyme'
import Icon from '../Icon'

describe('Icon', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Icon />)).toHaveLength(1)
  })
})
