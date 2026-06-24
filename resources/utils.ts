/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

export function reduceNumber(number: number) {
  let reduceSum = number;
  while (reduceSum > 9 && !(reduceSum === 22 || reduceSum === 11)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  }
  return reduceSum;
}
export function reduceNumberISK(number: number, karmicos: number[] = [13, 14, 16, 19]) {
  let reduceSum = number;
  while (reduceSum > 9 && !karmicos.includes(reduceSum)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  }
  return Number(reduceSum);
}
/**
   * Reduce the number to one digit
   * @param reduceSum
   * @returns {Number}
   */
export function reduceNumberForSub(reduceSum: number): number {
  while (reduceSum > 9) {
    reduceSum = reduceSum.toString().split('').reduce((r, c) => r += Number(c), 0);
  }
  return reduceSum;
}

/**
   * Reduce the number just one time
   * @param reduceSum
   * @returns {Number}
   */
export function reduceNumberOnce(reduceSum: number): number {
  reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  return reduceSum;
}

/**
   *Reduce the numbers
   * @param sumNumbers
   * @returns {Number}
   */
export function sumNumbers(sumNumber: number): number {
  sumNumber = sumNumber.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  return sumNumber;
}

export function reduceMonth(reduceSum:number):number {
  if (!(reduceSum === 11 || reduceSum === 12)) {
    reduceSum = reduceSum.toString().split('').reduce((r, c) => r += Number(c), 0);
  }
  return reduceSum;
}

/**
   * Get a value of a vowel
   * @param c
   * @returns {Number}
   */
export function vowelsValues(c: string): number {
  switch (c) {
    case 'a': return 1;
    case 'e': return 5;
    case 'i': return 9;
    case 'o': return 6;
    case 'u': return 3;
    case 'á': return 1;
    case 'é': return 5;
    case 'í': return 9;
    case 'ó': return 6;
    case 'ú': return 3;
    default: return 0;
  }
}

/**
   * Get value of a consonant
   * @param c
   * @returns {Number}
   */
export function consonantValues(c: string): number {
  switch (c) {
    case 'b': return 2;
    case 'c': return 3;
    case 'd': return 4;
    case 'f': return 6;
    case 'g': return 7;
    case 'h': return 8;
    case 'j': return 1;
    case 'k': return 11;
    case 'l': return 3;
    case 'm': return 4;
    case 'n': return 5;
    case 'ñ': return 5;
    case 'p': return 7;
    case 'q': return 8;
    case 'r': return 9;
    case 's': return 1;
    case 't': return 2;
    case 'v': return 22;
    case 'w': return 5;
    case 'x': return 6;
    case 'y': return 7;
    case 'z': return 8;
    default: return 0;
  }
}

/**
   * Get value of a vowel or consonant
   * @param x
   * @returns {Number}
   */
export function letterValue(x: string): number {
  switch (x) {
    case 'a': return 1;
    case 'e': return 5;
    case 'i': return 9;
    case 'o': return 6;
    case 'u': return 3;
    case 'á': return 1;
    case 'é': return 5;
    case 'í': return 9;
    case 'ó': return 6;
    case 'ú': return 3;
    case 'b': return 2;
    case 'c': return 3;
    case 'd': return 4;
    case 'f': return 6;
    case 'g': return 7;
    case 'h': return 8;
    case 'j': return 1;
    case 'k': return 11;
    case 'l': return 3;
    case 'm': return 4;
    case 'n': return 5;
    case 'ñ': return 5;
    case 'p': return 7;
    case 'q': return 8;
    case 'r': return 9;
    case 's': return 1;
    case 't': return 2;
    case 'v': return 22;
    case 'w': return 5;
    case 'x': return 6;
    case 'y': return 7;
    case 'z': return 8;
    default: return 0;
  }
}

/**
   * Get a value of a vowel , consonant or especial character
   * @param x
   * @returns {Number}
   */
export function inclusionValue(x: string): number {
  switch (x) {
    case 'a': return 1;
    case 'á': return 1;
    case 'j': return 1;
    case 's': return 1;
    case 'b': return 2;
    case 'k': return 11;
    case 't': return 2;
    case 'c': return 3;
    case 'l': return 3;
    case 'u': return 3;
    case 'ú': return 3;
    case 'd': return 4;
    case 'm': return 4;
    case 'v': return 22;
    case 'e': return 5;
    case 'é': return 5;
    case 'n': return 5;
    case 'ñ': return 5;
    case 'w': return 5;
    case 'f': return 6;
    case 'o': return 6;
    case 'ó': return 6;
    case 'x': return 6;
    case 'g': return 7;
    case 'p': return 7;
    case 'y': return 7;
    case 'h': return 8;
    case 'q': return 8;
    case 'z': return 8;
    case 'r': return 9;
    case 'i': return 9;
    case 'í': return 9;
    default: return 0;
  }
}

export function getAllMonths(): string[] {
  return [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
}

export function getAllMonthsEnglish(): string[] {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

export function getDaysOfWeek(): string[] {
  return [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
}

export function getDaysOfWeekEnglish(): string[] {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

export function getMonthName(month: number): string {
  if (typeof month !== 'number' || month < 1 || month > 12) {
    return '';
  }
  const monthKeys = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return monthKeys[month - 1];
}

type Compatibility = {
  pn: number[],
  pc: number[],
  pd: number[],
  pne: number[],
};

type CompatibilityTable = {
  [key: number]: Compatibility
};

export function compatibilityObject(): CompatibilityTable {
  const table = {
    1: {
      pn: [1, 5, 7, 11], pc: [2, 3, 9], pd: [4, 6, 22], pne: [8],
    },
    2: {
      pn: [2, 4, 8, 22], pc: [1, 3, 6, 9], pd: [5, 7, 11], pne: [],
    },
    3: {
      pn: [3, 6, 9], pc: [1, 2, 5], pd: [4, 7, 8, 11, 22], pne: [],
    },
    4: {
      pn: [2, 4, 8, 22], pc: [6, 7, 11], pd: [1, 3, 5, 9], pne: [],
    },
    5: {
      pn: [1, 5, 7, 11], pc: [3, 9], pd: [2, 4, 6, 22], pne: [8],
    },
    6: {
      pn: [3, 6, 9], pc: [2, 4, 8, 22], pd: [1, 5, 7, 11], pne: [],
    },
    7: {
      pn: [1, 5, 7, 11], pc: [4, 22], pd: [2, 3, 6, 8, 9], pne: [],
    },
    8: {
      pn: [2, 4, 8, 22], pc: [6], pd: [3, 7, 9, 11], pne: [1, 5],
    },
    9: {
      pn: [3, 6, 9], pc: [1, 2, 5], pd: [4, 7, 8, 11, 22], pne: [],
    },
    11: {
      pn: [1, 5, 7, 11], pc: [4, 8, 22], pd: [2, 3, 6, 9], pne: [],
    },
    22: {
      pn: [2, 4, 8, 22], pc: [6, 7, 11], pd: [1, 3, 5, 9], pne: [],
    },
  };
  return table;
}

export function capitalize(str: string): string {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function getSumHierarchy(a: number, b: number): number {
  const sum = reduceNumber(a + b);
  return sum;
}

export function getCompatibility(number: number, partnerN: number): string {
  const table = compatibilityObject();
  const tableNumber = table[number];
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(tableNumber)) {
    if (v.includes(partnerN)) {
      return k.toUpperCase();
    }
  }
  return 'NOT FOUND';
}

export function getResHierarchy(a: number, b: number): number {
  let n1 = 0;
  let n2 = 0;
  if (a === 11) { n1 = 2; } else { n1 = a; }
  if (a === 22) { n1 = 4; } else { n1 = a; }
  if (b === 11) { n2 = 2; } else { n2 = b; }
  if (b === 22) { n2 = 4; } else { n2 = b; }
  const res = reduceNumber(n1 - n2);
  return Math.abs(res);
}

export function getResBridge(a: number, b: number): number {
  let n1 = 0;
  let n2 = 0;
  if (a === 11) { n1 = 2; } else { n1 = a; }
  if (a === 22) { n1 = 4; } else { n1 = a; }
  if (b === 11) { n2 = 2; } else { n2 = b; }
  if (b === 22) { n2 = 4; } else { n2 = b; }
  const result = reduceNumber(n1 - n2);
  return Math.abs(result !== 0 ? result : n1);
}

export function sliceIntoChunks(arr:number[], chunkSize:number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
export function generateUniqueKey(): string {
  return `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
