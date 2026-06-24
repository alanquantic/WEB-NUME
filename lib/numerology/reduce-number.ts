const masterNumbers = new Set([11, 22, 33])

export function reduceNumerologyNumber(value: number): number {
  let current = value

  while (current > 9 && !masterNumbers.has(current)) {
    current = String(current)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0)
  }

  return current
}

