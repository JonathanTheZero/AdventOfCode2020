export type nums = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type exNums = nums | 0;

export type letters = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

export type bit = 0 | 1;

//VERY proud of that type tbh
export type NestedArray<T, Depth extends number = 1> = Depth extends 0 ? T : NestedArray<T[], [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Depth]>;
