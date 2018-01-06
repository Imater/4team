import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Split from 'components/Split'
import Iframe from 'components/Iframe'
import LeftPanel from 'components/LeftPanel'
import UserPanel from 'components/UserPanel'
import WorkDay from 'components/WorkDay'
import Tasks from 'components/Tasks'
import styles from './App.styl'

const users = [
  {
    name: 'Все'
  }, {
    name: 'Женя'
  }, {
    name: 'Олег'
  }, {
    name: 'Арарат'
  }, {
    name: 'Рустам'
  }, {
    name: 'Денис'
  }, {
    name: 'Андрей'
  }
]

const today = {
  name: 'Сегодня',
  time: '06:20:37'
}

const tasks = [
  {
    name: 'CSSSR-567 Верстка - мой прайс - возможность выгрузить данные',
    url: 'http://jira.relef.ru/browse/CSSSR-567',
    time: '01:41:31'
  }, {
    name: 'CSSSR-725 Доступ менеджера - ошибка отображения интерфейса (вкладка Партнеры)',
    url: 'http://jira.relef.ru/browse/CSSSR-725',
    time: '22:10'
  }, {
    name: 'CSSSR-723 [Релиз 27.12.2017] Некорректная начальная дата истории загрузок и продлений (сборка + исправление замечаний)',
    url: 'http://jira.relef.ru/browse/CSSSR-723',
    time: '02:12:58'
  }, {
    name: 'CSSSR-707 [Релиз 27.12.2017] Не работает функционал Цены на сайте на странице Ассортимент и остатки (меняем принцип округления)',
    url: 'http://jira.relef.ru/browse/CSSSR-707',
    time: '40:16'
  }, {
    name: 'CSSSR-732 Клиентская часть - Отображение остатков',
    url: 'http://jira.relef.ru/browse/CSSSR-732',
    time: '02:23:41'
  }
]

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
export default class App extends Component {
  renderLeftPanel() {
    return (
      <LeftPanel>
        <UserPanel users={users} />

        <WorkDay day={today}>
          <Tasks tasks={tasks} />
        </WorkDay>
      </LeftPanel>
    )
  }

  render() {
    return (
      <div className={styles.app}>
        <Split
          left={this.renderLeftPanel()}
          right={<Iframe url='http://jira.relef.ru/browse/CSSSR-718' />}
        />
      </div>
    )
  }
}
