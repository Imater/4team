import R from 'ramda'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import config from 'config'

momentDurationFormatSetup(moment)

export const getDays = data => {
  const days = R.compose(
    R.map(day => R.reverse(day)),
    R.map(R.sortBy(R.prop('end'))),
    R.map(day => R.map(task => ({
      ...task,
      time: task.dur ? moment.duration(task.dur, 'milliseconds').format('h[ч] mm[м]') : ''
    }), day)),
    R.map(day => R.values(day)),
    R.map(day => R.reduce((acc, cur) => ({
      ...acc,
      [cur.description]: {
        ...R.pick(['date', 'description', 'dur', 'end', 'id'], cur),
        dur: cur.dur + R.pathOr(0, [cur.description, 'dur'], acc)
      }
    }), {}, day)),
    R.groupBy(R.prop('date')),
    R.map(task => ({
      id: R.match(config.task.template, task.description)[0],
      date: task.end.split('T')[0],
      ...R.pick(['description', 'dur', 'end'], task)
    }))
  )(data)

  const daysWithTotal = R.map(day => {
    const totalTime = day.reduce((acc, task) => acc + task.dur, 0)
    const date = R.path([0, 'date'], day)

    return {
      date,
      tasks: day,
      totalTime: totalTime ? moment.duration(totalTime, 'milliseconds').format('h[ч] mm[м]') : ''
    }
  })(days)

  const sortedDays = R.reverse(R.sortBy(R.prop('date'), R.values(daysWithTotal)))
  const formatedDate = R.map(day => ({
    ...day,
    date: `${moment(day.date).locale('ru').format('MM.DD.YYYY dd')}`
  }))(sortedDays)

  return formatedDate
}
