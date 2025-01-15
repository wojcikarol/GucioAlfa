export interface IParkingSlot {
    slotId: string;         
    isOccupied: boolean;      
    lastUpdated?: Date;      
}
export type Query<T> = {
    [key: string]: T;
};
