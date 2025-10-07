import { Player } from "./Player";

export interface Game {
    id: string;
    sudoku: number[][];
    players: Player[];
    level: 'easy' | 'medium' | 'hard';
    status: 'waiting' | 'playing' | 'finished';
}