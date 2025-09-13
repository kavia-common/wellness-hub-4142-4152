const express = require('express');
const WellnessController = require('../controllers/wellness');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Wellness
 *     description: Wellness resources and tracking
 */

/**
 * @swagger
 * /wellness/resources:
 *   get:
 *     summary: Get wellness resources
 *     description: Returns a list of curated wellness resources (articles, videos, exercises).
 *     tags:
 *       - Wellness
 *     responses:
 *       200:
 *         description: A list of wellness resources
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WellnessResource'
 */
router.get('/resources', WellnessController.listResources);

/**
 * @swagger
 * /wellness/track:
 *   post:
 *     summary: Track a wellness activity
 *     description: Records a user wellness activity such as meditation, steps, water intake, or sleep.
 *     tags:
 *       - Wellness
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrackRequest'
 *     responses:
 *       201:
 *         description: Activity tracked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrackResponse'
 *       400:
 *         description: Invalid request payload
 */
router.post('/track', WellnessController.trackActivity);

/**
 * @swagger
 * /wellness/track:
 *   get:
 *     summary: List tracked wellness activities
 *     description: Returns a paginated list of tracked wellness activities for demo purposes (in-memory).
 *     tags:
 *       - Wellness
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Max number of items to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip.
 *     responses:
 *       200:
 *         description: A list of tracked activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrackedActivity'
 */
router.get('/track', WellnessController.listTracked);

module.exports = router;
