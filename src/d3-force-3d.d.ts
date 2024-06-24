declare module 'd3-force-3d' {
    import { Simulation, SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

    export function forceCenter(x?: number, y?: number, z?: number): any;
    export function forceCollide(radius?: number): any;
    export function forceLink<T extends SimulationNodeDatum>(links?: SimulationLinkDatum<T>[]): any;
    export function forceManyBody(): any;
    export function forceSimulation<T extends SimulationNodeDatum>(nodes?: T[]): Simulation<T, undefined>;
}
