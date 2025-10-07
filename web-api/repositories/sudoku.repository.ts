import { db } from '../config/db';

export class SudokuRepository {
    async getRandomSudoku(level: string) {
        const result = await db.query(
            `SELECT id, puzzle, solution
             FROM sudokus
             WHERE level = $1
             ORDER BY RANDOM()
             LIMIT 1`,
            [level]
        );
        return result.rows[0];
    }
}