const { Pool } = require('pg');

const db = new Pool({
    host: 'postgresql-johanagonzalezg.alwaysdata.net',
    user: 'johanagonzalezg',
    password: 'jovy@02912',
    database: 'johanagonzalezg_jg_fitness',
    allowExitOnIdle: true
});


module.exports = {
    db
}