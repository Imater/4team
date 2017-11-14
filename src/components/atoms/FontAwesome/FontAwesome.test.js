import React from 'react'
import { shallow } from 'enzyme'
import FontAwesome from '../FontAwesome'

describe('FontAwesome', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<FontAwesome />)).toHaveLength(1)
  })
})
