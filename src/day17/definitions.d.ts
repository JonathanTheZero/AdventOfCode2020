export type coordinates = [
    number,
    number,
    number
];

export type gridType<T> = {
    [key: string]: T
};

export const enum States {
    Active = "#",
    Inactive = "."
}