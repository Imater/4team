import React, { PureComponent } from 'react'
import Iframe from 'components/atoms/Iframe'

export default class PageMain extends PureComponent {
  state = {
    url: 'http://jira.relef.ru/browse/CSSSR-725'
  }

  handleClick = url => () =>
    this.setState({ url })

  render() {
    return (
      <div>
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-723')}>CSSSR-723</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-722')}>CSSSR-722</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-721')}>CSSSR-721</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-720')}>CSSSR-720</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-719')}>CSSSR-719</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/CSSSR-718')}>CSSSR-718</button>
        <br />
        <button onClick={this.handleClick('http://jira.relef.ru/browse/RO-230')}>RO-230</button>
        <br />

        <h1>{this.state.url}</h1>

        <div style={{ height: '700px' }}>
          <Iframe width='100%' height='100%' url={this.state.url} />
        </div>
      </div>
    )
  }
}
