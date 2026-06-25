export interface PersonParams {
  name?: string;
  lastName?: string;
  birthDate?: Date | string | number | null;
}

export interface NameSettingItem {
  pmN: number;
  pmD: number;
  pmC: string;
}

type NumericLikeDate = Date | string | number;

class Person {
  name: string;
  lastName: string;
  fullName: string;
  birthDate: Date | null;

  constructor({ name = "", lastName = "", birthDate = null }: PersonParams = {}) {
    this.name = name;
    this.lastName = lastName;
    this.fullName = `${name} ${lastName}`.trim();
    this.birthDate = this.normalizeBirthDate(birthDate);
  }

  private parseDateOnlyString(value: string): Date | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      return null;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return new Date(Date.UTC(year, month - 1, day, 12));
  }

  private normalizeBirthDate(value: Date | string | number | null): Date | null {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (typeof value === "string") {
      const parsedDateOnly = this.parseDateOnlyString(value);
      if (parsedDateOnly !== null) {
        return parsedDateOnly;
      }
    }

    const normalizedDate = value instanceof Date ? value : new Date(value);
    return Number.isNaN(normalizedDate.getTime()) ? null : normalizedDate;
  }

  private getBirthDateOrThrow(): Date {
    if (this.birthDate === null) {
      throw new Error("birthDate is required for this calculation.");
    }

    return this.birthDate;
  }

  private toDate(value: NumericLikeDate): Date {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === "string") {
      const parsedDateOnly = this.parseDateOnlyString(value);
      if (parsedDateOnly !== null) {
        return parsedDateOnly;
      }
    }

    return new Date(value);
  }

  calcName(): number {
    const nameLetters = this.name.toLowerCase().split("");
    let nameVowelsValues = 0;
    nameLetters.forEach((element) => {
      nameVowelsValues += this.vowelsValues(element);
    });

    const nameConsonants = this.name.toLowerCase().split("");
    let nameConsonantsValue = 0;
    nameConsonants.forEach((element) => {
      nameConsonantsValue += this.consonantValues(element);
    });
    const nameValue = this.reduceNumber(nameVowelsValues + nameConsonantsValue);

    const lastnameLetters = this.lastName.toLowerCase().split("");
    let lastnameVowelsValues = 0;
    lastnameLetters.forEach((element) => {
      lastnameVowelsValues += this.vowelsValues(element);
    });

    const lastnameConsonants = this.lastName.toLowerCase().split("");
    let lastnameConsonantsValue = 0;
    lastnameConsonants.forEach((element) => {
      lastnameConsonantsValue += this.consonantValues(element);
    });
    const lastnameValue = this.reduceNumber(lastnameVowelsValues + lastnameConsonantsValue);

    return this.reduceNumber(nameValue + lastnameValue);
  }

  calcSoulNumber(): number {
    const nameLetters = this.name.toLowerCase().split("");
    let nameVowelsValues = 0;
    nameLetters.forEach((element) => {
      nameVowelsValues += this.vowelsValues(element);
    });

    const lastnameLetters = this.lastName.toLowerCase().split("");
    let lastnameVowelsValues = 0;
    lastnameLetters.forEach((element) => {
      lastnameVowelsValues += this.vowelsValues(element);
    });

    return this.reduceNumber(nameVowelsValues + lastnameVowelsValues);
  }

  calcSoulExpresion(): number {
    const nameConsonants = this.name.toLowerCase().split("");
    let nameConsonantsValue = 0;
    nameConsonants.forEach((element) => {
      nameConsonantsValue += this.consonantValues(element);
    });

    const lastnameConsonants = this.lastName.toLowerCase().split("");
    let lastnameConsonantsValue = 0;
    lastnameConsonants.forEach((element) => {
      lastnameConsonantsValue += this.consonantValues(element);
    });

    return this.reduceNumber(nameConsonantsValue + lastnameConsonantsValue);
  }

  calcPersonalNumber(): number | false {
    if (this.birthDate !== null) {
      const personalNumber = this.reduceNumber(this.birthDate.getUTCDate());
      return personalNumber;
    }

    return false;
  }

  getLifeStage(): number | undefined {
    const birthDate = this.getBirthDateOrThrow();
    const yearBirthDate = birthDate.getUTCFullYear();
    const monthBirthDate = birthDate.getUTCMonth() + 1;
    const dayBirthDate = birthDate.getUTCDate();
    const now = new Date();

    const reducedYear = this.reduceNumber(yearBirthDate);
    const reducedMonth = this.reduceNumber(monthBirthDate);
    const reducedDay = this.reduceNumber(dayBirthDate);

    const reduceSum = this.reduceNumberCustom(reducedYear + reducedMonth + reducedDay);

    const stageOne = this.reduceNumber(reducedMonth + reducedDay);
    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (yearBirthDate <= now.getUTCFullYear() && now.getUTCFullYear() <= stageOneEnd) {
      return stageOne;
    }

    const stageTwo = this.reduceNumber(dayBirthDate + yearBirthDate);
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageTwoEnd) {
      return stageTwo;
    }

    const stageThree = this.reduceNumber(stageOne + stageTwo);
    const stageThreeEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageThreeEnd) {
      return stageThree;
    }

    const stageFour = this.reduceNumber(monthBirthDate + yearBirthDate);
    const stageFourEnd = stageThreeEnd + 9;
    if (stageThreeEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageFourEnd) {
      return stageFour;
    }

    if (stageFourEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageFourEnd + 9) {
      return stageThree;
    }

    if (stageFourEnd + 9 <= now.getUTCFullYear() && now.getUTCFullYear() <= stageFourEnd + 18) {
      return stageTwo;
    }

    if (stageFourEnd + 18 <= now.getUTCFullYear()) {
      return stageOne;
    }

    return undefined;
  }

  getLifeStageBy(stage = 1): number | null {
    const birthDate = this.getBirthDateOrThrow();
    const yearBirthDate = birthDate.getUTCFullYear();
    const monthBirthDate = birthDate.getUTCMonth() + 1;
    const dayBirthDate = birthDate.getUTCDate();

    const reducedYear = this.reduceNumber(yearBirthDate);
    const reducedMonth = this.reduceNumber(monthBirthDate);
    const reducedDay = this.reduceNumber(dayBirthDate);

    const reduceSum = this.reduceNumber(reducedYear + reducedMonth + reducedDay);

    const stageOne = this.reduceNumber(reducedMonth + reducedDay);
    const stageOneEnd = yearBirthDate + 36 - reduceSum;
    if (stage === 1) {
      return stageOne;
    }

    const stageTwo = this.reduceNumber(dayBirthDate + yearBirthDate);
    const stageTwoEnd = stageOneEnd + 9;
    if (stage === 2) {
      return stageTwo;
    }

    const stageThree = this.reduceNumber(stageOne + stageTwo);
    const stageThreeEnd = stageTwoEnd + 9;
    if (stage === 3) {
      return stageThree;
    }

    const stageFour = this.reduceNumber(monthBirthDate + yearBirthDate);
    const stageFourEnd = stageThreeEnd + 9;
    if (stage === 4) {
      return stageFour;
    }

    if (stage === 5) {
      return stageThree;
    }

    if (stage === 6) {
      return stageTwo;
    }

    if (stage === 7) {
      return stageOne;
    }

    void stageFourEnd;
    return null;
  }

  calcPersonalityNumber(): number | false {
    if (this.birthDate !== null) {
      const personalityNumber = this.reduceNumber(
        this.birthDate.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate(),
      );
      return personalityNumber;
    }

    return false;
  }

  calcPersonalYear(yearToCalculate: NumericLikeDate | 0 = 0): number | false {
    let targetYear = yearToCalculate;

    if (targetYear === 0) {
      targetYear = new Date();
    }

    if (this.birthDate !== null && targetYear !== null) {
      const normalizedYear = this.toDate(targetYear);
      const personalYear = this.reduceNumber(
        normalizedYear.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate(),
      );
      return personalYear;
    }

    return false;
  }

  calcPersonalMonth(monthToCalculate: NumericLikeDate | 0 = 0, toCalculate: NumericLikeDate | 0 = 0): number | false {
    let targetMonth = monthToCalculate;

    if (targetMonth === 0) {
      targetMonth = new Date();
    }

    if (this.birthDate !== null && targetMonth !== null) {
      let now = new Date();
      if (toCalculate !== 0) {
        now = this.toDate(toCalculate);
      }

      const normalizedMonth = this.toDate(targetMonth);
      let personalMonth = this.reduceNumber(
        now.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate(),
      );
      personalMonth = this.reduceNumber(personalMonth + normalizedMonth.getUTCMonth() + 1);
      return personalMonth;
    }

    return false;
  }

  calcPersonalWeek(dayToCalculate: NumericLikeDate | 0 = 0): number | string {
    let targetDay = dayToCalculate;

    if (targetDay === 0) {
      targetDay = new Date();
    }

    const normalizedDay = this.toDate(targetDay);
    const personalYear = this.calcPersonalYear(normalizedDay);
    const monthToCalculate = normalizedDay.getUTCMonth() + 1;

    if (personalYear === false) {
      return false.toString();
    }

    const sumPersonalWeekOne = this.reduceNumber(personalYear + monthToCalculate);
    if (normalizedDay.getUTCDate() >= 1 && normalizedDay.getUTCDate() <= 7) {
      return sumPersonalWeekOne;
    }

    const sumPersonalWeekTwo = this.reduceNumber(personalYear + sumPersonalWeekOne);
    if (normalizedDay.getUTCDate() >= 8 && normalizedDay.getUTCDate() <= 14) {
      return sumPersonalWeekTwo;
    }

    const sumPersonalWeekThree = this.reduceNumber(sumPersonalWeekTwo + sumPersonalWeekOne);
    if (normalizedDay.getUTCDate() >= 15 && normalizedDay.getUTCDate() <= 21) {
      return sumPersonalWeekThree;
    }

    const sumPersonalWeekFour = this.reduceNumber(monthToCalculate + sumPersonalWeekOne);
    if (normalizedDay.getUTCDate() >= 22) {
      return sumPersonalWeekFour;
    }

    return `${sumPersonalWeekOne} ${sumPersonalWeekTwo} ${sumPersonalWeekThree} ${sumPersonalWeekFour}`;
  }

  calcPersonalDay(dayToCalculate: NumericLikeDate | 0 = 0): number | false {
    let targetDay = dayToCalculate;

    if (targetDay === 0) {
      targetDay = new Date();
    }

    const normalizedDay = this.toDate(targetDay);
    const personalYear = this.calcPersonalYear(normalizedDay);
    const monthToCalculate = normalizedDay.getUTCMonth() + 1;

    if (personalYear === false) {
      return false;
    }

    const sumPersonalDay = personalYear + normalizedDay.getUTCDate() + monthToCalculate;
    if (sumPersonalDay > 9 && !(sumPersonalDay === 22 || sumPersonalDay === 11)) {
      let reduceSum = sumPersonalDay
        .toString()
        .split("")
        .reduce((result, current) => result + parseInt(current, 10), 0);

      while (reduceSum > 9 && !(reduceSum === 22 || reduceSum === 11)) {
        reduceSum = reduceSum
          .toString()
          .split("")
          .reduce((result, current) => result + parseInt(current, 10), 0);
      }

      return reduceSum;
    }

    return sumPersonalDay;
  }

  reduceNumber(reduceSum: number): number {
    let result = reduceSum;

    while (result > 9 && !(result === 22 || result === 11)) {
      result = result
        .toString()
        .split("")
        .reduce((value, current) => value + parseInt(current, 10), 0);
    }

    return result;
  }

  reduceNumberCustom(reduceSum: number): number {
    let result = reduceSum;

    while (result > 9) {
      result = result
        .toString()
        .split("")
        .reduce((value, current) => value + parseInt(current, 10), 0);
    }

    return result;
  }

  sumNumbers(sumNumbers: number | string): number {
    return sumNumbers
      .toString()
      .split("")
      .reduce((value, current) => value + parseInt(current, 10), 0);
  }

  vowelsValues(char: string): number {
    switch (char) {
      case "a":
      case "á":
      case "Ã¡":
        return 1;
      case "e":
      case "é":
      case "Ã©":
        return 5;
      case "i":
      case "í":
      case "Ã­":
        return 9;
      case "o":
      case "ó":
      case "Ã³":
        return 6;
      case "u":
      case "ú":
      case "Ãº":
        return 3;
      default:
        return 0;
    }
  }

  consonantValues(char: string): number {
    switch (char) {
      case "b":
        return 2;
      case "c":
        return 3;
      case "d":
        return 4;
      case "f":
        return 6;
      case "g":
        return 7;
      case "h":
        return 8;
      case "j":
        return 1;
      case "k":
        return 11;
      case "l":
        return 3;
      case "m":
        return 4;
      case "n":
      case "ñ":
      case "Ã±":
        return 5;
      case "p":
        return 7;
      case "q":
        return 8;
      case "r":
        return 9;
      case "s":
        return 1;
      case "t":
        return 2;
      case "v":
        return 22;
      case "w":
        return 5;
      case "x":
        return 6;
      case "y":
        return 7;
      case "z":
        return 8;
      default:
        return 0;
    }
  }

  charValues(char: string): number {
    switch (char) {
      case "a":
        return 1;
      case "b":
        return 2;
      case "c":
        return 3;
      case "d":
        return 4;
      case "e":
        return 5;
      case "f":
        return 6;
      case "g":
        return 7;
      case "h":
        return 8;
      case "i":
        return 9;
      case "j":
        return 1;
      case "k":
        return 11;
      case "l":
        return 3;
      case "m":
        return 4;
      case "n":
        return 5;
      case "o":
        return 6;
      case "p":
        return 7;
      case "q":
        return 8;
      case "r":
        return 9;
      case "s":
        return 1;
      case "t":
        return 2;
      case "u":
        return 3;
      case "v":
        return 22;
      case "w":
        return 5;
      case "x":
        return 6;
      case "y":
        return 7;
      case "z":
        return 8;
      default:
        return 0;
    }
  }

  letterValue(char: string): number {
    switch (char) {
      case "a":
        return 1;
      case "e":
        return 5;
      case "i":
        return 9;
      case "o":
        return 6;
      case "u":
        return 3;
      case "b":
        return 2;
      case "c":
        return 3;
      case "d":
        return 4;
      case "f":
        return 6;
      case "g":
        return 7;
      case "h":
        return 8;
      case "j":
        return 1;
      case "k":
        return 11;
      case "l":
        return 3;
      case "m":
        return 4;
      case "n":
      case "ñ":
      case "Ã±":
        return 5;
      case "p":
        return 7;
      case "q":
        return 8;
      case "r":
        return 9;
      case "s":
        return 1;
      case "t":
        return 2;
      case "v":
        return 22;
      case "w":
        return 5;
      case "x":
        return 6;
      case "y":
        return 7;
      case "z":
        return 8;
      default:
        return 0;
    }
  }

  getNameSetting(): NameSettingItem[] {
    const nameSetting: NameSettingItem[] = [];

    this.fullName
      .toLowerCase()
      .split("")
      .forEach((element) => {
        const letterNumericValue = this.letterValue(element);

        for (let index = 1; index <= letterNumericValue; index += 1) {
          nameSetting.push({
            pmN: this.reduceNumber(index),
            pmD: letterNumericValue,
            pmC: element.toUpperCase(),
          });
        }
      });

    return nameSetting.slice(0, 102);
  }
}

export default Person;
