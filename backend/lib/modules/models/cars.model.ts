export interface ICars {
    carId: string,
    type: string,
    model: string,
    registration: string,
} export type Query<T> = {
    [key: string]: T;
};

