console.log('Pinnacle')

class Pinnacle {
    constructor(birthDate) {
        this.birthDate = birthDate;
        this.NOW = new Date();
        this.CURRENT_YEAR = this.NOW.getFullYear();
    }

    /* A */
    calcKarma() {
        const birthDate = this.birthDate.split("-");
        const monthBirthDate = parseInt(birthDate[1]);
        const karma = this.reduceNumber(monthBirthDate);
        return karma;
    }

    /* B */
    calcPersonalNumber() {
        const birthDate = this.birthDate.split("-")
        const dayBirthDate = parseInt(birthDate[2])
        const personalNumber = this.reduceNumber(dayBirthDate)
        return personalNumber
    }

    /* C */
    calcPastLife() {
        const birthDate = this.birthDate.split("-")
        const yearBirthDate = parseInt(birthDate[0])
        const pastLife = this.reduceNumber(yearBirthDate)
        return pastLife
    }

    /* D */
    calcPersonalityNumber() {
        const birthDate = this.birthDate.split("-")
        const dayBirthDate = parseInt(birthDate[2])
        const monthBirthDate = parseInt(birthDate[1])
        const yearBirthDate = parseInt(birthDate[0])
        let personalityNumber = dayBirthDate + monthBirthDate + yearBirthDate
        personalityNumber = this.reduceNumber(personalityNumber)
        return personalityNumber
    }

    /* E F G H*/
    calcLifeCycle(cycle = 0) {
        const birthDate = this.birthDate.split("-")
        const yearBirthDate = parseInt(birthDate[0])
        const monthBirthDate = parseInt(birthDate[1])
        const dayBirthDate = parseInt(birthDate[2])

        const reducedYear = this.reduceNumber(yearBirthDate)
        const reducedMonth = this.reduceNumber(monthBirthDate)
        const reducedDay = this.reduceNumber(dayBirthDate)

        const reduceSum = this.reduceNumber(reducedYear + reducedMonth + reducedDay)

        const cycleOne = this.reduceNumber(reducedMonth + reducedDay)
        const cycleOneEnd = yearBirthDate + 36 - reduceSum;
        if (cycle == 1) { return cycleOne }

        const cycleTwo = this.reduceNumber(reducedDay + reducedYear)
        const cycleTwoEnd = cycleOneEnd + 9
        if (cycle == 2) { return cycleTwo }

        const cycleThr = this.reduceNumber(cycleOne + cycleTwo)
        const cycleThrEnd = cycleTwoEnd + 9
        if (cycle == 3) { return cycleThr }


        const cycleFou = this.reduceNumber(monthBirthDate + yearBirthDate)
        if (cycle == 4) { return cycleFou }

        if (cycle == 5) { return cycleThr }
        if (cycle == 6) { return cycleTwo }
        if (cycle == 7) { return cycleOne }
    }

    calcEndFirstLifeCicle() {
        const personalityNumber = this.calcPersonalityNumber()
        const endFirstLifeCicle = 36 - personalityNumber
        return endFirstLifeCicle
    }
    calcEndSecLifeCicle() {
        const endFirstLifeCicle = this.calcEndFirstLifeCicle()
        const endSecLifeCicle = endFirstLifeCicle + 9
        return endSecLifeCicle
    }
    calcEndThiLifeCicle() {
        const endSecLifeCicle = this.calcEndSecLifeCicle()
        const endThiLifeCicle = endSecLifeCicle + 9
        return endThiLifeCicle
    }
    calcEndFouLifeCicle() {
        const endThiLifeCicle = this.calcEndThiLifeCicle()
        const endFouLifeCicle = endThiLifeCicle + 9
        return endFouLifeCicle
    }
    calcEndFifLifeCicle() {
        const endFouLifeCicle = this.calcEndFouLifeCicle()
        const endFifLifeCicle = endFouLifeCicle + 9
        return endFifLifeCicle
    }
    calcEndSixLifeCicle() {
        const endFifLifeCicle = this.calcEndFifLifeCicle()
        const endSixLifeCicle = endFifLifeCicle + 9
        return endSixLifeCicle
    }

    /* I */
    calcUnconsciousNumber() {
        const cycleOne = this.calcLifeCycle(1)
        const cycleTwo = this.calcLifeCycle(2)
        const cycleThr = this.calcLifeCycle(3)
        const unconsciousNumber = this.reduceNumber(cycleOne + cycleTwo + cycleThr)
        return unconsciousNumber
    }

    /* J */
    calcSubconsciousNumber() {
        const cycleFou = this.calcLifeCycle(4)
        const personalityNumber = this.calcPersonalityNumber()
        const subconsciousNumber = this.reduceNumber(cycleFou + personalityNumber)
        return subconsciousNumber

    }

    /* K */
    calcFirstGoal() {
        return this.reduceNumber(
                Math.abs(
                    this.reduceNumberForSub(this.calcKarma()) -
                    this.reduceNumberForSub(this.calcPersonalNumber())
                )
            )
            // const birthDate = this.birthDate.split("-")
            // const monthBirthDate = parseInt(birthDate[1])
            // let reducedMonth = this.reduceNumber(monthBirthDate)
            // reducedMonth = this.sumNumbers(monthBirthDate)
            // const dayBirthDate = parseInt(birthDate[2])
            // let reducedDay = this.reduceNumber(dayBirthDate)
            // reducedDay = this.sumNumbers(dayBirthDate)
            // const goal = Math.abs( reducedMonth - reducedDay )
            // return goal
    }

    /* L */
    calcSecGoal() {
        return this.reduceNumber(
                Math.abs(
                    this.reduceNumberForSub(this.calcPastLife()) -
                    this.reduceNumberForSub(this.calcPersonalNumber())
                )
            )
            // const birthDate = this.birthDate.split("-")
            // const dayBirthDate = parseInt(birthDate[2])
            // let reducedDay = this.reduceNumber(dayBirthDate)
            // reducedDay = this.sumNumbers(reducedDay)
            // const yearBirthDate = parseInt(birthDate[0])
            // let reducedYear = this.reduceNumber(yearBirthDate)
            // reducedYear = this.sumNumbers(reducedYear)
            // const goal = Math.abs( reducedDay - reducedYear )
            // return goal
    }

    /* M */
    calcThiGoal() {
        const firstGoal = this.calcFirstGoal()
        const sumFirst = this.sumNumbers(firstGoal)
        const secondGoal = this.calcSecGoal()
        const sumSecond = this.sumNumbers(secondGoal)
        const goal = Math.abs(sumFirst - sumSecond)
        return goal
    }

    /* N */
    calcFourGoal() {
        return this.reduceNumber(
                Math.abs(
                    this.reduceNumberForSub(this.calcKarma()) -
                    this.reduceNumberForSub(this.calcPastLife())
                )
            )
            // const birthDate = this.birthDate.split("-")
            // const monthBirthDate = parseInt(birthDate[1])
            // let monthReduced = this.sumNumbers(monthBirthDate)
            // const yearBirthDate = parseInt(birthDate[0])
            // let yearReduced = this.reduceNumber( yearBirthDate )
            // yearReduced = this.sumNumbers( yearReduced )
            // const goal = Math.abs( monthReduced - yearReduced )
            // return goal
    }

    /* O */
    calcNegativeUnconsciousNumber() {
        const firstGoal = this.calcFirstGoal()
        const secondGoal = this.calcSecGoal()
        const thirdGoal = this.calcThiGoal()
        let negativeUnconsciousNumber = (firstGoal + secondGoal + thirdGoal)
        negativeUnconsciousNumber = this.reduceNumber(negativeUnconsciousNumber)
        return negativeUnconsciousNumber
    }

    /* P */
    calcShadeNumber() {
        const personalityNumber = this.calcPersonalityNumber()
        const negativeUnconsciousNumber = this.calcNegativeUnconsciousNumber()
        let shadeNumber = (personalityNumber + negativeUnconsciousNumber)
        shadeNumber = this.reduceNumber(shadeNumber)
        return shadeNumber
    }

    /* Q */
    calcFamilysLowerSelfNumber() {
        const firstGoal = this.calcFirstGoal()
        const thirdGoal = this.calcThiGoal()
        let lowerSelfNumber = (firstGoal + thirdGoal)
        lowerSelfNumber = this.reduceNumber(lowerSelfNumber)
        return lowerSelfNumber
    }

    /* R */
    calcConsciousLowerSelfNumber() {
        const secGoal = this.calcSecGoal()
        const thirdGoal = this.calcThiGoal()
        let consciousLowerSelfNumber = (secGoal + thirdGoal)
        consciousLowerSelfNumber = this.reduceNumber(consciousLowerSelfNumber)
        return consciousLowerSelfNumber
    }

    /* S */
    calcLatentLowerSelfNumber() {
        const familysLowerSelfNumber = this.calcFamilysLowerSelfNumber()
        const consciousLowerSelfNumber = this.calcConsciousLowerSelfNumber()
        let latentLowerSelfNumber = (familysLowerSelfNumber + consciousLowerSelfNumber)
        latentLowerSelfNumber = this.reduceNumber(latentLowerSelfNumber)
        return latentLowerSelfNumber
    }

    calcW() {
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
        ]
        const occurrences = appearances.reduce(function(acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        let w = 0;
        let W = ''
        Object.values(occurrences).forEach(el => el === 3 ? w++ : w)
        if (w === 1) {
            Object.entries(occurrences).map((el, i) => {
                if (el[1] === 3) {
                    W = parseInt(el[0]) * 3
                }
            })
        }
        return W
    }

    reduceNumber(reduceSum) {
        while (reduceSum > 9 && !(reduceSum == 22 || reduceSum == 11)) {
            reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0);
        }
        return reduceSum;
    }

    reduceNumberForSub(reduceSum) {
        while (reduceSum > 9) {
            reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0);
        }
        return reduceSum;
    }

    sumNumbers(sumNumbers) {
        sumNumbers = sumNumbers.toString().split('').reduce((r, c) => r += parseInt(c), 0);
        return sumNumbers;
    }
}