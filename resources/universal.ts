import {
  getDate, getMonth, getYear,
} from 'date-fns';
import _ from 'lodash';

import { reduceNumber, reduceNumberISK } from './utils';

export type SplittedDate = {
  day: number,
  month: number,
  year: number,
};

export class Universal {
  date: Date;

  NOW: Date;

  karmicos: number[];

  /**
   * @param {string} date - Date in string format
   */
  constructor(date?: string) {
    this.date = new Date(date ?? '');
    this.NOW = new Date();
    this.karmicos = [13, 14, 16, 19];
  }

  /**
   * @param {string | number | Date} date - Date in string format
   */
  setDate(date: string | number | Date) {
    this.date = new Date(date);
  }

  /**
   * @returns {number} - Universal Year
   * @description
   * 1. Sumar los dígitos del año
   * 2. Si el resultado del paso 1 es mayor a 9, sumar los dígitos del resultado del paso 1
   * 3. Regresar el resultado del paso 2
   * @example
   * 1. 2021 = 5
   * 2. 5 <= 9, regresar 5
   * 1. 2022 = 6
   * 2. 6 <= 9, regresar 6
   * 1. 2023 = 7
   * 2. 7 <= 9, regresar 7
   * 1. 2024 = 8
   * 2. 8 <= 9, regresar 8
   * 1. 2025 = 9
   * 2. 9 <= 9, regresar 9
   */
  calcUniversalYear(year?: number): number {
    const yearToCalculate = _.isNil(year) ? getYear(this.NOW) : year;
    return reduceNumber(yearToCalculate);
  }

  /**
   * @returns {string} - Universal Year with Karmic Symbol
   */
  calcUniversalYearISK(year?: number): string {
    const universalYear = this.calcUniversalYear(year);
    return this.karmicos.includes(universalYear) ? '*' : '';
  }

  /**
   * @param {number} day - Day in number format
   * @param {number} month - Month in number format
   * @param {number} year - Year in number format
   * @returns {number} - Universal Day
   * @description
   * 1. Sumar el día, el mes y el año
   * 2. Si el resultado del paso 1 es mayor a 9, sumar los dígitos del resultado del paso 1
   * 3. Regresar el resultado del paso 2
   * @example
   * 1. 1 + 1 + 2021 = 2023
   * 2. 2023 <= 9, regresar 2023
   * 1. 1 + 1 + 2022 = 2024
   * 2. 2024 <= 9, regresar 2024
   * 1. 1 + 1 + 2023 = 2025
   * 2. 2025 <= 9, regresar 2025
   */
  calcUniversalDay(opts: SplittedDate): number {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts?.day) ? getDate(this.NOW) : opts.day;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    return reduceNumber(
      this.calcUniversalYear(yearToCalculate)
      + monthToCalculate
      + dayToCalculate,
    );
  }

  /**
   * @returns {string} - Universal Day with Karmic Symbol
   */
  calcUniversalDayISK(opts: SplittedDate): string {
    const universalDay = reduceNumberISK(this.calcUniversalDay(opts));
    return this.karmicos.includes(universalDay) ? '*' : '';
  }

  /**
   * @param {number} month - Month in number format
   * @param {number} year - Year in number format
   * @returns {number} - Universal Week
   * @description
   * 1. Sumar el mes y el año
   * 2. Si el día está entre 1 y 7, regresar el resultado del paso 1
   * 3. Sumar el resultado del paso 1 con el resultado del paso 2
   * 4. Si el día está entre 8 y 14, regresar el resultado del paso 3
   * 5. Sumar el resultado del paso 1 con el resultado del paso 3
   * 6. Si el día está entre 15 y 21, regresar el resultado del paso 5
   * 7. Sumar el mes y el resultado del paso 1
   * 8. Regresar el resultado del paso 7
   * @example
   * 1. 1 + 2021 = 2022
   * 2. 1 <= 1 <= 7, regresar 2022
   * 3. 2022 + 2022 = 4044
   * 4. 8 <= 1 <= 14, regresar 4044
   * 5. 2022 + 4044 = 6066
   * 6. 15 <= 1 <= 21, regresar 6066
   * 7. 1 + 2022 = 2023
   * 8. Regresar 2023
   */
  calcCurrentUniversalWeek(opts: SplittedDate): number {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts?.day) ? getDate(this.NOW) : opts.day;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    const sumUniversalWeekOne = reduceNumber(reduceNumber(yearToCalculate) + reduceNumber(monthToCalculate));
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return sumUniversalWeekOne;
    }
    const sumUniversalWeekTwo = reduceNumber(reduceNumber(yearToCalculate) + sumUniversalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return sumUniversalWeekTwo;
    }
    const sumUniversalWeekThree = reduceNumber(sumUniversalWeekTwo + sumUniversalWeekOne);
    if (dayToCalculate >= 15 && dayToCalculate <= 21) {
      return sumUniversalWeekThree;
    }
    const sumUniversalWeekFour = reduceNumber(reduceNumber(monthToCalculate) + sumUniversalWeekOne);
    return sumUniversalWeekFour;
  }

  /**
   * @returns {string} - Current Universal week with Karmic Symbol
   */
  calcCurrentUniversalWeekISK(opts: SplittedDate): string {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const dayToCalculate = _.isNil(opts?.day) ? getDate(this.NOW) : opts.day;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    const sumUniversalWeekOne = reduceNumberISK(yearToCalculate + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return this.karmicos.includes(sumUniversalWeekOne) ? '*' : '';
    }
    const sumUniversalWeekTwo = reduceNumberISK(yearToCalculate + sumUniversalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return this.karmicos.includes(sumUniversalWeekTwo) ? '*' : '';
    }
    const sumUniversalWeekThree = reduceNumberISK(sumUniversalWeekTwo + sumUniversalWeekOne);
    if (dayToCalculate >= 15 && dayToCalculate <= 21) {
      return this.karmicos.includes(sumUniversalWeekThree) ? '*' : '';
    }
    const sumUniversalWeekFour = reduceNumberISK(monthToCalculate + sumUniversalWeekOne);
    return this.karmicos.includes(sumUniversalWeekFour) ? '*' : '';
  }

  /**
   * @param {number} weekToCalculate - Week to calculate
   * @param {number} month - Month in number format
   * @param {number} year - Year in number format
   * @returns {number} - Universal Week
   */
  calcUniversalWeek(weekToCalculate: 1 | 2 | 3 | 4, opts: SplittedDate): number {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    const weekOne = reduceNumber(reduceNumber(monthToCalculate) + reduceNumber(yearToCalculate));
    if (weekToCalculate === 1) {
      return weekOne;
    }
    const weekTwo = reduceNumber(reduceNumber(yearToCalculate) + weekOne);
    if (weekToCalculate === 2) {
      return weekTwo;
    }
    const weekThr = reduceNumber(weekOne + weekTwo);
    if (weekToCalculate === 3) {
      return weekThr;
    }
    const weekFou = reduceNumber(reduceNumber(monthToCalculate) + weekOne);
    return weekFou;
  }

  calcUniversalWeekISK(weekToCalculate: 1 | 2 | 3 | 4, opts: SplittedDate): string {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    const weekOne = monthToCalculate + this.calcUniversalYear(yearToCalculate);
    if (weekToCalculate === 1) {
      const universalWeekOne = reduceNumberISK(weekOne);
      return this.karmicos.includes(universalWeekOne) ? '*' : '';
    }
    const weekTwo = this.calcUniversalYear(yearToCalculate) + weekOne;
    if (weekToCalculate === 2) {
      const universalWeekTwo = reduceNumberISK(weekTwo);
      return this.karmicos.includes(universalWeekTwo) ? '*' : '';
    }
    const weekThr = weekOne + weekTwo;
    if (weekToCalculate === 3) {
      const universalWeekThree = reduceNumberISK(weekThr);
      return this.karmicos.includes(universalWeekThree) ? '*' : '';
    }
    const weekFou = monthToCalculate + weekOne;
    const universalWeekFou = reduceNumberISK(weekFou);
    return this.karmicos.includes(universalWeekFou) ? '*' : '';
  }

  /**
   * @param {number} month - Month in number format
   * @param {number} year - Year in number format
   * @returns {number} - Universal Month
   */
  calcUniversalMonth(opts: SplittedDate): number {
    const monthToCalculate: number = opts.month;
    const yearToCalculate: number = opts.year;
    return reduceNumber(this.calcUniversalYear(yearToCalculate) + monthToCalculate);
  }

  calcUniversalMonthISK(opts: SplittedDate): string {
    const monthToCalculate: number = _.isNil(opts?.month) ? getMonth(this.NOW) + 1 : opts.month;
    const yearToCalculate = _.isNil(opts?.year) ? getYear(this.NOW) : opts.year;
    const universalMonth = reduceNumberISK(this.calcUniversalYear(yearToCalculate) + monthToCalculate);
    return this.karmicos.includes(universalMonth) ? '*' : '';
  }
}

export default Universal;
