type PinnacleBirthDate = string | Date;

class Pinnacle {
  birthDate: string;
  NOW: Date;
  CURRENT_YEAR: number;

  constructor(birthDate: PinnacleBirthDate) {
    this.birthDate = this.normalizeBirthDate(birthDate);
    this.NOW = new Date();
    this.CURRENT_YEAR = this.NOW.getFullYear();
  }

  private normalizeBirthDate(birthDate: PinnacleBirthDate): string {
    if (birthDate instanceof Date) {
      const year = birthDate.getUTCFullYear();
      const month = String(birthDate.getUTCMonth() + 1).padStart(2, "0");
      const day = String(birthDate.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return birthDate;
  }

  private getBirthDateParts(): [number, number, number] {
    const parts = this.birthDate.split("-");

    if (parts.length !== 3) {
      throw new Error("birthDate must use the format YYYY-MM-DD.");
    }

    const yearBirthDate = parseInt(parts[0], 10);
    const monthBirthDate = parseInt(parts[1], 10);
    const dayBirthDate = parseInt(parts[2], 10);

    if ([yearBirthDate, monthBirthDate, dayBirthDate].some((value) => Number.isNaN(value))) {
      throw new Error("birthDate contains invalid numeric values.");
    }

    return [yearBirthDate, monthBirthDate, dayBirthDate];
  }

  calcKarma(): number {
    const [, monthBirthDate] = this.getBirthDateParts();
    return this.reduceNumber(monthBirthDate);
  }

  calcPersonalNumber(): number {
    const [, , dayBirthDate] = this.getBirthDateParts();
    return this.reduceNumber(dayBirthDate);
  }

  calcPastLife(): number {
    const [yearBirthDate] = this.getBirthDateParts();
    return this.reduceNumber(yearBirthDate);
  }

  calcPersonalityNumber(): number {
    const [yearBirthDate, monthBirthDate, dayBirthDate] = this.getBirthDateParts();
    let personalityNumber = dayBirthDate + monthBirthDate + yearBirthDate;
    personalityNumber = this.reduceNumber(personalityNumber);
    return personalityNumber;
  }

  calcLifeCycle(cycle = 0): number | undefined {
    const [yearBirthDate, monthBirthDate, dayBirthDate] = this.getBirthDateParts();
    console.log("#1");
    console.log(yearBirthDate);
    console.log(monthBirthDate);
    console.log(dayBirthDate);

    const reducedYear = this.reduceNumber(yearBirthDate);
    const reducedMonth = this.reduceNumber(monthBirthDate);
    const reducedDay = this.reduceNumber(dayBirthDate);
    console.log("#2");
    console.log(reducedYear);
    console.log(reducedMonth);
    console.log(reducedDay);

    const reduceSum = this.reduceNumber(reducedYear + reducedMonth + reducedDay);
    console.log("#3");
    console.log(reduceSum);

    const cycleOne = this.reduceNumber(reducedMonth + reducedDay);
    const cycleOneEnd = yearBirthDate + 36 - reduceSum;
    if (cycle === 1) {
      return cycleOne;
    }

    const cycleTwo = this.reduceNumber(reducedDay + reducedYear);
    const cycleTwoEnd = cycleOneEnd + 9;
    if (cycle === 2) {
      return cycleTwo;
    }

    const cycleThree = this.reduceNumber(cycleOne + cycleTwo);
    const cycleThreeEnd = cycleTwoEnd + 9;
    if (cycle === 3) {
      return cycleThree;
    }

    const cycleFour = this.reduceNumber(monthBirthDate + yearBirthDate);
    if (cycle === 4) {
      return cycleFour;
    }

    if (cycle === 5) {
      return cycleThree;
    }

    if (cycle === 6) {
      return cycleTwo;
    }

    if (cycle === 7) {
      return cycleOne;
    }

    void cycleThreeEnd;
    return undefined;
  }

  calcEndFirstLifeCicle(): number {
    const personalityNumber = this.calcPersonalityNumber();
    return 36 - personalityNumber;
  }

  calcEndSecLifeCicle(): number {
    const endFirstLifeCicle = this.calcEndFirstLifeCicle();
    return endFirstLifeCicle + 9;
  }

  calcEndThiLifeCicle(): number {
    const endSecLifeCicle = this.calcEndSecLifeCicle();
    return endSecLifeCicle + 9;
  }

  calcEndFouLifeCicle(): number {
    const endThiLifeCicle = this.calcEndThiLifeCicle();
    return endThiLifeCicle + 9;
  }

  calcEndFifLifeCicle(): number {
    const endFouLifeCicle = this.calcEndFouLifeCicle();
    return endFouLifeCicle + 9;
  }

  calcEndSixLifeCicle(): number {
    const endFifLifeCicle = this.calcEndFifLifeCicle();
    return endFifLifeCicle + 9;
  }

  calcUnconsciousNumber(): number {
    const cycleOne = this.calcLifeCycle(1) ?? 0;
    const cycleTwo = this.calcLifeCycle(2) ?? 0;
    const cycleThree = this.calcLifeCycle(3) ?? 0;
    const unconsciousNumber = this.reduceNumber(cycleOne + cycleTwo + cycleThree);
    return unconsciousNumber;
  }

  calcSubconsciousNumber(): number {
    const cycleFour = this.calcLifeCycle(4) ?? 0;
    const personalityNumber = this.calcPersonalityNumber();
    const subconsciousNumber = this.reduceNumber(cycleFour + personalityNumber);
    return subconsciousNumber;
  }

  calcFirstGoal(): number {
    return this.reduceNumber(
      Math.abs(this.reduceNumberForSub(this.calcKarma()) - this.reduceNumberForSub(this.calcPersonalNumber())),
    );
  }

  calcSecGoal(): number {
    return this.reduceNumber(
      Math.abs(this.reduceNumberForSub(this.calcPastLife()) - this.reduceNumberForSub(this.calcPersonalNumber())),
    );
  }

  calcThiGoal(): number {
    const firstGoal = this.calcFirstGoal();
    const sumFirst = this.sumNumbers(firstGoal);
    const secondGoal = this.calcSecGoal();
    const sumSecond = this.sumNumbers(secondGoal);
    return Math.abs(sumFirst - sumSecond);
  }

  calcFourGoal(): number {
    return this.reduceNumber(
      Math.abs(this.reduceNumberForSub(this.calcKarma()) - this.reduceNumberForSub(this.calcPastLife())),
    );
  }

  calcNegativeUnconsciousNumber(): number {
    const firstGoal = this.calcFirstGoal();
    const secondGoal = this.calcSecGoal();
    const thirdGoal = this.calcThiGoal();
    let negativeUnconsciousNumber = firstGoal + secondGoal + thirdGoal;
    negativeUnconsciousNumber = this.reduceNumber(negativeUnconsciousNumber);
    return negativeUnconsciousNumber;
  }

  calcShadeNumber(): number {
    const personalityNumber = this.calcPersonalityNumber();
    const negativeUnconsciousNumber = this.calcNegativeUnconsciousNumber();
    let shadeNumber = personalityNumber + negativeUnconsciousNumber;
    shadeNumber = this.reduceNumber(shadeNumber);
    return shadeNumber;
  }

  calcFamilysLowerSelfNumber(): number {
    const firstGoal = this.calcFirstGoal();
    const thirdGoal = this.calcThiGoal();
    let lowerSelfNumber = firstGoal + thirdGoal;
    lowerSelfNumber = this.reduceNumber(lowerSelfNumber);
    return lowerSelfNumber;
  }

  calcConsciousLowerSelfNumber(): number {
    const secGoal = this.calcSecGoal();
    const thirdGoal = this.calcThiGoal();
    let consciousLowerSelfNumber = secGoal + thirdGoal;
    consciousLowerSelfNumber = this.reduceNumber(consciousLowerSelfNumber);
    return consciousLowerSelfNumber;
  }

  calcLatentLowerSelfNumber(): number {
    const familysLowerSelfNumber = this.calcFamilysLowerSelfNumber();
    const consciousLowerSelfNumber = this.calcConsciousLowerSelfNumber();
    let latentLowerSelfNumber = familysLowerSelfNumber + consciousLowerSelfNumber;
    latentLowerSelfNumber = this.reduceNumber(latentLowerSelfNumber);
    return latentLowerSelfNumber;
  }

  calcW(): number | "" {
    const appearances = [
      this.calcFirstGoal(),
      this.calcNegativeUnconsciousNumber(),
      this.calcSecGoal(),
      this.calcThiGoal(),
      this.calcFourGoal(),
      this.calcFamilysLowerSelfNumber(),
      this.calcConsciousLowerSelfNumber(),
      this.calcLatentLowerSelfNumber(),
      this.calcShadeNumber(),
    ];

    const occurrences = appearances.reduce<Record<number, number>>((accumulator, current) => {
      accumulator[current] = (accumulator[current] ?? 0) + 1;
      return accumulator;
    }, {});

    let w = 0;
    let W: number | "" = "";

    Object.values(occurrences).forEach((value) => {
      if (value === 3) {
        w += 1;
      }
    });

    if (w === 1) {
      Object.entries(occurrences).forEach(([key, value]) => {
        if (value === 3) {
          W = parseInt(key, 10) * 3;
        }
      });
    }

    return W;
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

  reduceNumberForSub(reduceSum: number): number {
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
}

export default Pinnacle;
