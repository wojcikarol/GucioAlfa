// models/parkingSlot.model
// Interfejs dla pojedynczego miejsca parkingowego
export interface IParkingSlot {
    slotId: string;           // ID miejsca parkingowego, np. "P001", "P002"
    isOccupied: boolean;      // Status: czy miejsce jest zajęte (true) czy wolne (false)
    lastUpdated?: Date;       // Opcjonalna data ostatniej aktualizacji statusu miejsca
}

// Typ Query do dynamicznego zapytania
export type Query<T> = {
    [key: string]: T;
};
