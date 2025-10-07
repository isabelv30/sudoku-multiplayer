import { GameRepository } from '../repositories/game.repository';
import { SudokuRepository } from '../repositories/sudoku.repository';

export class GameService {
    private gameRepo = new GameRepository();
    private sudokuRepo = new SudokuRepository();

    async createGame(level: 'easy' | 'medium' | 'hard') {
        // 1. Pick a sudoku puzzle from DB
        const sudoku = await this.sudokuRepo.getRandomSudoku(level);
        if (!sudoku) throw new Error(`No sudoku found for level ${level}`);

        // 2. Create game entry
        const newGame = await this.gameRepo.createGame(sudoku.id, level);

        return {
            ...newGame,
            sudoku: sudoku.puzzle,
        };
    }

    async joinGame(gameId: string, playerName: string) {
        return await this.gameRepo.addPlayer(gameId, playerName);
    }

    async getGame(gameId: string) {
        const game = await this.gameRepo.getGameById(gameId);
        if (!game) throw new Error('Game not found');
        return game;
    }
}