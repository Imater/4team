import React from 'react'
import { shallow, mount } from 'enzyme'
import TabPinned from '../TabPinned'
import Box from '../../atoms/Box'

describe('TabPinned', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<TabPinned />)).toHaveLength(1)
  })
  it('should render normal with children content', () => {
    const wrapper = mount(<TabPinned>TabPinned</TabPinned>)
    expect(wrapper.find(Box).text()).toEqual('TabPinned')
  })
})
