import { DateTime, Interval } from 'luxon';
import { CHART_START_HOUR, CHART_END_HOUR, MINUTES_IN_HOUR } from './constants';

export const getNextId = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  let result = 1;
  if (list) {
    list.sort((a, b) => a.id - b.id);
    result = list.pop().id + 1;
  }
  return result;
};

export const getRandom = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1);
};

export const buildChartData = list => {
  const intervals = list.map(item => {
    const start = DateTime.fromISO(item.start);
    const end = DateTime.fromISO(item.end);
    return {
      id: item.id,
      interval: Interval.fromDateTimes(start, end),
      start,
      end,
    };
  });

  const newHours = [];
  for (let hour = CHART_START_HOUR; hour <= CHART_END_HOUR; hour + 1) {
    let sum = 0;
    const startHour = DateTime.fromObject({ hour, minute: 0, second: 0 });
    const endHour = DateTime.fromObject({ hour, minute: 59, second: 59 });
    const currentHourInterval = Interval.fromDateTimes(startHour, endHour);
    const found = intervals.filter(int =>
      currentHourInterval.intersection(int.interval)
    );
    if (found.length > 0) {
      let duration = MINUTES_IN_HOUR;
      found.forEach(el => {
        if (el.end.hour === hour && el.start.hour === hour) {
          duration = el.end.diff(el.start, ['minutes']).toObject().minutes;
        } else if (el.end.hour === hour) {
          duration = el.end.minute;
        } else if (el.start.hour === hour) {
          duration = MINUTES_IN_HOUR - el.start.minute;
        }
        sum += duration;
      });
    }
    newHours.push({
      hour,
      value: sum > MINUTES_IN_HOUR ? MINUTES_IN_HOUR : sum,
    });
  }

  return newHours;
};

export default {
  getNextId,
  getRandom,
  buildChartData,
};
