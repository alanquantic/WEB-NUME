// console.log('Person')

class Person {
    constructor({ name = "", lastName = "", birthDate = null }) {
        this.name = name
        this.lastName = lastName
        this.fullName = `${name} ${lastName}`
        this.birthDate = birthDate
    }

    calcName() {
        let nameLetters = this.name.toString().toLowerCase().split('')
        let nameVowelsValues = 0
        nameLetters.forEach(element => {
            nameVowelsValues += this.vowelsValues(element)
        })
        let nameConsonants = this.name.toString().toLowerCase().split('')
        let nameConsonantsValue = 0
        nameConsonants.forEach(element => {
            nameConsonantsValue += this.consonantValues(element)
        })
        let nameValue = this.reduceNumber(nameVowelsValues + nameConsonantsValue)

        let lastnameLetters = this.lastName.toString().toLowerCase().split('')
        let lastnameVowelsValues = 0
        lastnameLetters.forEach(element => {
            lastnameVowelsValues += this.vowelsValues(element)
        })
        let lastnameConsonants = this.lastName.toString().toLowerCase().split('')
        let lastnameConsonantsValue = 0
        lastnameConsonants.forEach(element => {
            lastnameConsonantsValue += this.consonantValues(element)
        })
        let lastnameValue = this.reduceNumber(lastnameVowelsValues + lastnameConsonantsValue)

        let name = this.reduceNumber(nameValue + lastnameValue)
        return name
    }

    calcSoulNumber() {
        let nameLetters = this.name.toString().toLowerCase().split('')
        let nameVowelsValues = 0
        nameLetters.forEach(element => {
            nameVowelsValues += this.vowelsValues(element)
        })

        let lastnameLetters = this.lastName.toString().toLowerCase().split('')
        let lastnameVowelsValues = 0
        lastnameLetters.forEach(element => {
            lastnameVowelsValues += this.vowelsValues(element)
        })

        let soulNumber = this.reduceNumber(nameVowelsValues + lastnameVowelsValues)
        return soulNumber
    }

    calcSoulExpresion() {
        let nameConsonants = this.name.toString().toLowerCase().split('')
        let nameConsonantsValue = 0
        nameConsonants.forEach(element => {
            nameConsonantsValue += this.consonantValues(element)
        })

        let lastnameConsonants = this.lastName.toString().toLowerCase().split('')
        let lastnameConsonantsValue = 0
        lastnameConsonants.forEach(element => {
            lastnameConsonantsValue += this.consonantValues(element)
        })

        let soulExpresion = this.reduceNumber(nameConsonantsValue + lastnameConsonantsValue)
        return soulExpresion
    }

    /**
     * calculate personal number
     * also AKA "who i'm"
     * @returns {Number} personalNumber
     */
    calcPersonalNumber() {
            if (this.birthDate !== null) {
                let personalNumber = reduceNumber(this.birthDate.getUTCDate())
                return personalNumber
            }
            return false
        }
        /**
         * calculate current satge number
         * @returns {Number} stage
         */

    getLifeStage() {

            let yearBirthDate = parseInt(this.birthDate.getUTCFullYear());
            let monthBirthDate = parseInt(this.birthDate.getUTCMonth() + 1);
            let dayBirthDate = parseInt(this.birthDate.getUTCDate());
            let now = new Date();

            const reducedYear = this.reduceNumber(yearBirthDate)
            const reducedMonth = this.reduceNumber(monthBirthDate)
            const reducedDay = this.reduceNumber(dayBirthDate)

            const reduceSum = this.reduceNumberCustom(reducedYear + reducedMonth + reducedDay)

            const stageOne = this.reduceNumber(reducedMonth + reducedDay)
            const stageOneEnd = yearBirthDate + 36 - reduceSum;
            if (yearBirthDate <= now.getUTCFullYear() && now.getUTCFullYear() <= stageOneEnd) {
                return stageOne;
            }

            const stageTwo = this.reduceNumber(dayBirthDate + yearBirthDate)
            const stageTwoEnd = stageOneEnd + 9
            if (stageOneEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageTwoEnd) {
                return stageTwo;
            }

            const stageThr = this.reduceNumber(stageOne + stageTwo)
            const stageThrEnd = stageTwoEnd + 9
            if (stageTwoEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageThrEnd) {
                return stageThr;
            }

            const stageFou = this.reduceNumber(monthBirthDate + yearBirthDate)
            const stageFouEnd = stageThrEnd + 9
            if (stageThrEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= stageFouEnd) {
                return stageFou;
            }

            if (stageFouEnd <= now.getUTCFullYear() && now.getUTCFullYear() <= (stageFouEnd + 9)) {
                return stageThr;
            }
            if ((stageFouEnd + 9) <= now.getUTCFullYear() && now.getUTCFullYear() <= (stageFouEnd + 18)) {
                return stageTwo;
            }
            if ((stageFouEnd + 18) <= now.getUTCFullYear()) {
                return stageOne;
            }
        }
        /**
         * calculate specific satge
         * stage 1 aka "My traning"
         * @returns {Number} stage
         */

    getLifeStageBy(stage = 1) {

        let yearBirthDate = parseInt(this.birthDate.getUTCFullYear());
        let monthBirthDate = parseInt(this.birthDate.getUTCMonth() + 1);
        let dayBirthDate = parseInt(this.birthDate.getUTCDate());
        let now = new Date();

        const reducedYear = this.reduceNumber(yearBirthDate)
        const reducedMonth = this.reduceNumber(monthBirthDate)
        const reducedDay = this.reduceNumber(dayBirthDate)

        const reduceSum = this.reduceNumber(reducedYear + reducedMonth + reducedDay)

        const stageOne = this.reduceNumber(reducedMonth + reducedDay)
        const stageOneEnd = yearBirthDate + 36 - reduceSum;
        if (stage == 1) {
            // console.log(stageOne);
            return stageOne;
        }

        const stageTwo = this.reduceNumber(dayBirthDate + yearBirthDate)
        const stageTwoEnd = stageOneEnd + 9
        if (stage == 2) {
            return stageTwo;
        }

        const stageThr = this.reduceNumber(stageOne + stageTwo)
        const stageThrEnd = stageTwoEnd + 9
        if (stage == 3) {
            return stageThr;
        }

        const stageFou = this.reduceNumber(monthBirthDate + yearBirthDate)
        const stageFouEnd = stageThrEnd + 9
        if (stage == 4) {
            return stageFou;
        }

        if (stage == 5) {
            return stageThr;
        }
        if (stage == 6) {
            return stageTwo;
        }
        if (stage == 7) {
            return stageOne;
        }
        return null;
    }

    /**
     * calculate personality number
     * @returns {Number} personalityNumber
     */
    calcPersonalityNumber() {
        if (this.birthDate !== null) {
            let personalityNumber = reduceNumber(this.birthDate.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate())
            return personalityNumber
        }
        return false
    }

    /**
     * calculate personal year
     * @param {Number} yearToCalculate
     * @returns {Number} personalYear
     */
    calcPersonalYear(yearToCalculate = 0) {
        if (yearToCalculate == 0) {
            yearToCalculate = new Date();
        }
        if (this.birthDate !== null && yearToCalculate !== null) {
            yearToCalculate = new Date(yearToCalculate)
            let personalYear = reduceNumber(yearToCalculate.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate());
            return personalYear
        }
        return false
    }

    /**
     * calculate personal month
     * @param {Number} monthToCalculate
     * @returns {Number} personalMonth
     */
    calcPersonalMonth(monthToCalculate = 0, toCalculate = 0) {
        if (monthToCalculate == 0) {
            monthToCalculate = new Date();
        }

        if (this.birthDate !== null && monthToCalculate !== null) {
            let now = new Date()
            if (toCalculate != 0) {
                now = new Date(toCalculate)
            }
            monthToCalculate = new Date(monthToCalculate)
            let personalMonth = reduceNumber(now.getUTCFullYear() + this.birthDate.getUTCMonth() + 1 + this.birthDate.getUTCDate())
            personalMonth = reduceNumber(personalMonth + monthToCalculate.getUTCMonth() + 1)
            return personalMonth
        }
        return false
    }

    calcPersonalWeek(dayToCalculate = 0) {
            if (dayToCalculate == 0) {
                dayToCalculate = new Date();
            }
            dayToCalculate = new Date(dayToCalculate);
            // console.log(dayToCalculate.getUTCMonth() + 1);
            let personalYear = this.calcPersonalYear(dayToCalculate);
            let monthToCalculate = dayToCalculate.getUTCMonth() + 1;

            let sumPersonalWeekOne = this.reduceNumber(personalYear + monthToCalculate);
            if (dayToCalculate.getUTCDate() >= 1 && dayToCalculate.getUTCDate() <= 7) {
                return sumPersonalWeekOne;
            }

            let sumPersonalWeekTwo = this.reduceNumber(personalYear + sumPersonalWeekOne);
            if (dayToCalculate.getUTCDate() >= 8 && dayToCalculate.getUTCDate() <= 14) {
                return sumPersonalWeekTwo;
            }

            let sumPersonalWeekThree = this.reduceNumber(sumPersonalWeekTwo + sumPersonalWeekOne);
            if (dayToCalculate.getUTCDate() >= 15 && dayToCalculate.getUTCDate() <= 21) {
                return sumPersonalWeekThree;
            }

            let sumPersonalWeekFour = this.reduceNumber(monthToCalculate + sumPersonalWeekOne);
            if (dayToCalculate.getUTCDate() >= 22) {
                return sumPersonalWeekFour;
            }

            return `${sumPersonalWeekOne} ${sumPersonalWeekTwo} ${sumPersonalWeekThree} ${sumPersonalWeekFour}`;
        }
        /**
         * calculate personal day
         * @param {Number} dayToCalculate
         * @returns {Number} sumPersonalDay
         */
    calcPersonalDay(dayToCalculate = 0) {
        if (dayToCalculate == 0) {
            dayToCalculate = new Date();
        }

        let now = new Date();
        dayToCalculate = new Date(dayToCalculate);
        let personalYear = this.calcPersonalYear(dayToCalculate);
        let monthToCalculate = dayToCalculate.getUTCMonth() + 1;

        let sumPersonalDay = personalYear + dayToCalculate.getUTCDate() + monthToCalculate;
        if (sumPersonalDay > 9 && !(sumPersonalDay == 22 || sumPersonalDay == 11)) {
            let reduceSum = sumPersonalDay.toString().split('').reduce((r, c) => r += parseInt(c), 0);
            while (reduceSum > 9 && !(reduceSum == 22 || reduceSum == 11)) {
                reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0);
            }
            return reduceSum;
        }
        return sumPersonalDay;
    }

    reduceNumber(reduceSum) {
        while (reduceSum > 9 && !(reduceSum == 22 || reduceSum == 11)) {
            reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0)
        }
        return reduceSum
    }
    reduceNumberCustom(reduceSum) {
        while (reduceSum > 9) {
            reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0)
        }
        return reduceSum
    }

    sumNumbers(sumNumbers) {
        sumNumbers = sumNumbers.toString().split('').reduce((r, c) => r += parseInt(c), 0)
        return sumNumbers
    }

    vowelsValues($c) {
        switch ($c) {
            case 'a':
                return 1
            case 'e':
                return 5
            case 'i':
                return 9
            case 'o':
                return 6
            case 'u':
                return 3
            case 'á':
                return 1
            case 'é':
                return 5
            case 'í':
                return 9
            case 'ó':
                return 6
            case 'ú':
                return 3
            default:
                return 0
        }
    }

    consonantValues($c) {
        switch ($c) {
            case 'b':
                return 2
            case 'c':
                return 3
            case 'd':
                return 4
            case 'f':
                return 6
            case 'g':
                return 7
            case 'h':
                return 8
            case 'j':
                return 1
            case 'k':
                return 11
            case 'l':
                return 3
            case 'm':
                return 4
            case 'n':
                return 5
            case 'ñ':
                return 5
            case 'p':
                return 7
            case 'q':
                return 8
            case 'r':
                return 9
            case 's':
                return 1
            case 't':
                return 2
            case 'v':
                return 22
            case 'w':
                return 5
            case 'x':
                return 6
            case 'y':
                return 7
            case 'z':
                return 8
            default:
                return 0
        }
    }

    charValues($c) {
        switch ($c) {
            case 'a':
                return 1
            case 'b':
                return 2
            case 'c':
                return 3
            case 'd':
                return 4
            case 'e':
                return 5
            case 'f':
                return 6
            case 'g':
                return 7
            case 'h':
                return 8
            case 'i':
                return 9
            case 'j':
                return 1
            case 'k':
                return 11
            case 'l':
                return 3
            case 'm':
                return 4
            case 'n':
                return 5
            case 'o':
                return 6
            case 'p':
                return 7
            case 'q':
                return 8
            case 'r':
                return 9
            case 's':
                return 1
            case 't':
                return 2
            case 'u':
                return 3
            case 'v':
                return 22
            case 'w':
                return 5
            case 'x':
                return 6
            case 'y':
                return 7
            case 'z':
                return 8
            default:
                return 0
        }
    }

    letterValue($x) {
        switch ($x) {
            case 'a':
                return 1;
            case 'e':
                return 5;
            case 'i':
                return 9;
            case 'o':
                return 6;
            case 'u':
                return 3;
            case 'b':
                return 2;
            case 'c':
                return 3;
            case 'd':
                return 4;
            case 'f':
                return 6;
            case 'g':
                return 7;
            case 'h':
                return 8;
            case 'j':
                return 1;
            case 'k':
                return 11;
            case 'l':
                return 3;
            case 'm':
                return 4;
            case 'n':
                return 5;
            case 'ñ':
                return 5;
            case 'p':
                return 7;
            case 'q':
                return 8;
            case 'r':
                return 9;
            case 's':
                return 1;
            case 't':
                return 2;
            case 'v':
                return 22;
            case 'w':
                return 5;
            case 'x':
                return 6;
            case 'y':
                return 7;
            case 'z':
                return 8;
            default:
                return 0;
        }
    }

    getNameSetting() {
        let nameSetting = []
        this.fullName.toLowerCase().split('').forEach(el => {
            const lValue = this.letterValue(el)
            for (let i = 1; i <= lValue; i++) {
                nameSetting.push({
                    pmN: this.reduceNumber(i),
                    pmD: lValue,
                    pmC: el.toUpperCase()
                })
            }
        })

        return nameSetting.slice(0, 102)
    }
}