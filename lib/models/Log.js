const pool = require('../utils/pool');

module.exports = class Log {
    id;
    recipeId;
    dateOfEvent;
    notes;
    rating;

    constructor(row) {
      this.id = String(row.id);
      this.recipeId = String(row.recipe_id);
      this.dateOfEvent = row.date_of_event;
      this.notes = String(row.notes);
      this.rating = String(row.rating);
    }

    static async insert(log) {
      const { rows } = await pool.query(
        'INSERT into logs (recipe_id, date_of_event, notes, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [log.recipeId, log.dateOfEvent, log.notes, log.rating]
      );

      if(!rows[0]) throw new Error('log was not inserted');
      else return new Log(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM logs'
      );

      if(!rows[0]) throw new Error('you suck bitch');
      else return rows.map(rows => new Log(rows));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM logs WHERE id=-$1',
        [id]
      );

      if(!rows[0]) throw new Error('yo');
      else return new Log(rows[0]);
    }
};
