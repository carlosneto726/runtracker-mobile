import Coord from "./Coord";

export default interface Circuit {
    id: number;
    length: number;
    name: string;
    start: any;
    coords: Coord[];
}
