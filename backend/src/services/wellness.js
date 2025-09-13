/**
 * @swagger
 * components:
 *   schemas:
 *     WellnessResource:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *           description: Category like 'mindfulness', 'fitness', 'nutrition'
 *         type:
 *           type: string
 *           description: Format such as 'article', 'video', 'exercise'
 *         url:
 *           type: string
 *         description:
 *           type: string
 *     TrackRequest:
 *       type: object
 *       required: [type, value]
 *       properties:
 *         type:
 *           type: string
 *           description: Activity type (e.g., meditation, steps, water, sleep)
 *         value:
 *           type: number
 *           description: Numeric measure (e.g., minutes, steps, ml, hours)
 *         unit:
 *           type: string
 *           description: Unit for the value (min, steps, ml, h)
 *         note:
 *           type: string
 *           description: Optional note
 *     TrackedActivity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         type:
 *           type: string
 *         value:
 *           type: number
 *         unit:
 *           type: string
 *         note:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *     TrackResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/TrackedActivity'
 */

const { randomUUID } = require('crypto');

/**
 * A simple in-memory repository for demo purposes.
 * In production, replace with a persistent store (SQL/NoSQL).
 */
class WellnessService {
  constructor() {
    this._resources = [
      {
        id: 'res-1',
        title: '5-Minute Breathing Exercise',
        category: 'mindfulness',
        type: 'exercise',
        url: 'https://example.com/breathing-exercise',
        description: 'Quick breathing routine to reduce stress.',
      },
      {
        id: 'res-2',
        title: 'Beginner Yoga Flow',
        category: 'fitness',
        type: 'video',
        url: 'https://example.com/beginner-yoga',
        description: 'A gentle 15-minute yoga sequence for all levels.',
      },
      {
        id: 'res-3',
        title: 'Hydration Basics',
        category: 'nutrition',
        type: 'article',
        url: 'https://example.com/hydration-basics',
        description: 'Why staying hydrated matters and how much to drink.',
      },
    ];

    this._tracked = [];
  }

  // PUBLIC_INTERFACE
  /**
   * Returns curated wellness resources.
   * @returns {Array<object>}
   */
  getResources() {
    return this._resources;
  }

  // PUBLIC_INTERFACE
  /**
   * Tracks a user wellness activity.
   * @param {{ userId: string, type: string, value: number, unit?: string, note?: string }} payload
   * @returns {object} The tracked activity
   */
  track(payload) {
    const record = {
      id: randomUUID(),
      userId: payload.userId,
      type: payload.type,
      value: payload.value,
      unit: payload.unit,
      note: payload.note,
      timestamp: new Date().toISOString(),
    };
    this._tracked.push(record);
    return record;
  }

  // PUBLIC_INTERFACE
  /**
   * Lists tracked activities with simple pagination.
   * @param {{ userId: string, limit: number, offset: number }} params
   * @returns {{ total: number, items: Array<object> }}
   */
  listTracked(params) {
    const items = this._tracked.filter((r) => r.userId === params.userId);
    const sliced = items.slice(params.offset, params.offset + params.limit);
    return { total: items.length, items: sliced };
  }
}

module.exports = new WellnessService();
