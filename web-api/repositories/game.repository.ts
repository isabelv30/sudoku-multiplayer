import { db } from '../config/db';
import { Game } from '../models/Game';
import { Player } from '../models/Player';

export class GameRepository {
    async createGame(sudokuId: number, level: string): Promise<Game> {
        const result = await db.query(
            `INSERT INTO games (sudoku_id, level, status, created_at)
             VALUES ($1, $2, 'waiting', NOW())
             RETURNING id, sudoku_id, level, status, created_at`,
            [sudokuId, level]
        );

        return result.rows[0];
    }

    async addPlayer(gameId: string, playerName: string): Promise<Player | null> {
        const result = await db.query(
            `INSERT INTO players (game_id, name, score)
             VALUES ($1, $2, 0)
             RETURNING id, name, score, game_id`,
            [gameId, playerName]
        );
        return result.rows[0];
    }

    async getGameById(gameId: string): Promise<Game | null> {
        const gameRes = await db.query(
            `SELECT * FROM games WHERE id = $1`,
            [gameId]
        );

        if (gameRes.rowCount === 0) return null;

        const playersRes = await db.query(
            `SELECT id, name, score FROM players WHERE game_id = $1`,
            [gameId]
        );

        return { ...gameRes.rows[0], players: playersRes.rows };
    }

    async updateGameStatus(gameId: string, status: string): Promise<void> {
        await db.query(
            `UPDATE games SET status = $1 WHERE id = $2`,
            [status, gameId]
        );
    }
}