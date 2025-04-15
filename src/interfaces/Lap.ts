export default interface Lap {
    isValid: boolean;
    date?: string;
    time: string;
    distance_traveled?: number;
    avg_speed: number;
    top_speed: number;
    avg_accuracy?: number;
    coords_count?: number;
    clock?: number;
}
