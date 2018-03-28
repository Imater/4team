import R from 'ramda'
import moment from 'moment'
import config from 'config'

const leftPad = str => `00${str}`.slice(-'00'.length)
const formatTime = dur =>
  `${leftPad(dur.hours())}:${leftPad(dur.minutes())}:${leftPad(dur.seconds())}`

export const getDays = data => {
  const days = R.compose(
    R.map(day => R.reverse(day)),
    R.map(R.sortBy(R.prop('end'))),
    R.map(day => R.map(task => ({
      ...task,
      time: task.dur ? formatTime(moment.duration(task.dur)) : ''
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
      totalTime: totalTime ? formatTime(moment.duration(totalTime)) : ''
    }
  })(days)

  return R.reverse(R.sortBy(R.prop('date'), R.values(daysWithTotal)))
}
