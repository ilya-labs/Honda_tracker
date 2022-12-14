import { AMOUNT_OF_DAYS } from 'src/booking-list/constants';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { IStartEndDates } from 'src/booking-list/types';

class DatesManager {
  getDatesMS() {
    let arrOfDays: number[] = [];
    arrOfDays.length = AMOUNT_OF_DAYS - 1;
    arrOfDays.fill(0);

    const arrDatesMs = arrOfDays.reduce((acc: number[], item, index) => {
      let currentDate = new Date();
      let nextDateMS = +addDays(currentDate, index);
      acc.push(nextDateMS);

      return acc;
    }, []);
    return arrDatesMs;
  }

  getStartAndEndOfDays(datesMs: number[]) {
    return datesMs.reduce((accum: IStartEndDates[], item) => {
      const dateItem: IStartEndDates = {
        date: item,
        start: +startOfDay(new Date(item)),
        end: +endOfDay(new Date(item)),
      };
      accum.push(dateItem);
      return accum;
    }, []);
  }

  getFormattingDate(date: number) {
    return this.formatter.format(date);
  }

  getFormattingDateTime(date: number) {
    return this.formatterDateTime.format(date);
  }

  private formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  private formatterDateTime = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const datesManager = new DatesManager();
