import React from 'react'
import { shallow, mount } from 'enzyme'
import Tab from '../Tab'

describe('TabPinned', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Tab />)).toHaveLength(1)
  })
  it('should render normal with children content', () => {
    const wrapper = mount(<Tab>Tab</Tab>)
    expect(wrapper.find('.tab__text').text()).toEqual('Tab')
  })
})
