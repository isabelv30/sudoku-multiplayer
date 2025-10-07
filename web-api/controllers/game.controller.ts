import { Request, Response } from 'express';
import { GameService } from '../services/game.service';

const gameService = new GameService();

/**
 * POST /game
 * Creates a new game with a given difficulty
 */
export const createGame = async (req: Request, res: Response) => {
    try {
        const { level } = req.body;

        if (!level || !['easy', 'medium', 'hard'].includes(level)) {
            return res.status(400).json({ message: 'Invalid difficulty level.' });
        }

        const newGame = gameService.createGame(level);
        return res.status(201).json(newGame);
    } catch (error) {
        console.error('Error creating game:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * POST /game/:id/join
 * Adds a new player to an existing game
 */
export const joinGame = async (req: Request, res: Response) => {
    try {
        const { id: gameId } = req.params;
        const { playerName } = req.body;

        if (!playerName) {
            return res.status(400).json({ message: 'Player name is required.' });
        }

        const updatedGame = gameService.joinGame(gameId, playerName);
        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found.' });
        }

        return res.status(200).json(updatedGame);
    } catch (error) {
        console.error('Error joining game:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * GET /game/:id
 * Returns the current game state (board, players, etc.)
 */
export const getGame = async (req: Request, res: Response) => {
    try {
        const { id: gameId } = req.params;

        const game = gameService.getGame(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found.' });
        }

        return res.status(200).json(game);
    } catch (error) {
        console.error('Error getting game:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};