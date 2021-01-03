const pool = require('../utils/pool');
const Log = require('./log');

module.exports = class Recipe {
    id;
    name;
    ingredients;
    directions;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.ingredients = row.ingredients;
      this.directions = row.directions;
    }

    static async insert(recipe) {
      const { rows } = await pool.query(
        'INSERT INTO recipes (name, ingredients, directions) VALUES ($1, $2, $3) RETURNGING *',
        [recipe.name, recipe.ingredients, recipe.directions]
      );

      if(!rows[0]) throw new Error ('hated it');
      else return new Recipe(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM recipes'
      );

      if(!rows[0]) throw new Error ('het it ');
      else return rows.map(rows => new Recipe(rows));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
            SELECT recipes.*,
            array_to_json(array_agg9logs.*))
            AS logs
            FROM recipes
            JOIN logs
            ON recipes.id = logs.recipe_id
            WHERE id=$1
            GROUP BY recipes.id`,
      [id] 
      );

      if(!rows[0]) throw new Error ('shut up');
      else return {

        ...new Recipe(rows[0]),
        logs: rows[0].logs.map(log => new Log(log))
      };
        
    }

    static async update(id, { name, ingedients, directions }) {
      const { rows } = await pool.query(`
        UPDATE recipes
        SET name=$1,
        ingredients=$2,
        directions=$3
        WHERE id=$4
        RETURNING *`,
      [name, ingedients, directions, id]
      );

      if(!rows[0]) throw new Error ('no no no');
      return new Recipe(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM recipes WHERE id=$1 RETURNING *',
        [id]
      );
      if(!rows[0]) throw new Error ('kiss it');
      else return new Recipe(rows[0]);
    }
    
};
