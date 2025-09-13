const wellnessService = require('../services/wellness');

/**
 * Controller for wellness-related endpoints.
 */
class WellnessController {
  // PUBLIC_INTERFACE
  /**
   * List curated wellness resources.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static listResources(req, res) {
    const items = wellnessService.getResources();
    return res.status(200).json({ items });
  }

  // PUBLIC_INTERFACE
  /**
   * Track a wellness activity.
   * Validates payload then delegates to service.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static trackActivity(req, res) {
    const { type, value, unit, note } = req.body || {};
    if (!type || typeof type !== 'string') {
      return res.status(400).json({ error: 'type is required and must be a string' });
    }
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      return res.status(400).json({ error: 'value is required and must be a number' });
    }
    const record = wellnessService.track({
      type: String(type).toLowerCase(),
      value: Number(value),
      unit: unit ? String(unit) : undefined,
      note: note ? String(note) : undefined,
      // In a real app, derive from auth/session; demo uses anonymous
      userId: 'anonymous',
    });
    return res.status(201).json(record);
  }

  // PUBLIC_INTERFACE
  /**
   * List tracked wellness activities with simple pagination.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static listTracked(req, res) {
    const limit = Math.max(1, Math.min(100, Number(req.query.limit ?? 20)));
    const offset = Math.max(0, Number(req.query.offset ?? 0));
    const result = wellnessService.listTracked({ limit, offset, userId: 'anonymous' });
    return res.status(200).json(result);
  }
}

module.exports = WellnessController;
