import React from 'react';
import { buildChartData } from '../helpers';
import { DateTime } from 'luxon';

describe('Build chart data', () => {

    const checkElement = (array, hour, value) => {
        const element = array.find(item => item.hour === hour);
        expect(element.value).toBe(value);
    };

    const createList = (id, from, to) => {
          return [{
              id,
              name: `item${id}`,
              start: DateTime.fromObject(from).toISO(),
              end: DateTime.fromObject(to).toISO(),
          }];
    };

    // [ 6.10 - 6.55 ]
    const list1 = createList(1, { hour: 6, minute: 10 }, { hour: 6, minute: 55 });

    // [ 8.35 - 9.20 ]
    const list2 = createList(2, { hour: 8, minute: 35 }, { hour: 9, minute: 20 });

    // [ 10.45 - 12.30 ]
    const list3 = createList(3, { hour: 10, minute: 45 }, { hour: 12, minute: 30 });

    // [ 12.10 - 15.20 ]
    const list4 = createList(4, { hour: 13, minute: 10 }, { hour: 16, minute: 20 });

    // [ 23.25 - 00.20 next day ]
    const nextDayTime = DateTime.local().plus({ days: 1 }).set({ hour: 0, minute: 20 }).toObject();
    const list5 = createList(5, { hour: 23, minute: 25 }, nextDayTime);

    describe('#test1', () => {

        const result1 = buildChartData(list1);

        describe('Entry in 1 interval', () => {
            it('first interval', () => {
                checkElement(result1, 6, 45);
            });
        });
    });

    describe('#test2', () => {

        const result2 = buildChartData(list2);

        describe('Entry in 2 intervals', () => {
            it('first interval', () => {
                checkElement(result2, 8, 25);
            });

            it('second interval', () => {
                checkElement(result2, 9, 20);
            });
        });
    });

    describe('#test3', () => {

        const result3 = buildChartData(list3);

        describe('Entry into 3 hour intervals', () => {
            it('first interval', () => {
                checkElement(result3, 10, 15);
            });

            it('second interval', () => {
                checkElement(result3, 11, 60);
            });

            it('third interval', () => {
                checkElement(result3, 12, 30);
            });
        });
    });

    describe('#test4', () => {

        const result4 = buildChartData(list4);

        describe('Entry in 4 intervals', () => {
            it('first interval', () => {
                checkElement(result4, 13, 50);
            });

            it('second interval', () => {
                checkElement(result4, 14, 60);
            });

            it('second interval', () => {
                checkElement(result4, 15, 60);
            });

            it('second interval', () => {
                checkElement(result4, 16, 20);
            });
        });
    });

    describe('#test5 (with next day)', () => {

        const result5 = buildChartData(list5);

        it('first interval', () => {
            checkElement(result5, 23, 35);
        });

        it('second interval', () => {
            checkElement(result5, 0, 0);
        });
    });
});
