const { Pool } = require('pg');

const args = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
  JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]}%'
LIMIT ${args[1] || 5};
`).then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has a id of ${user.student_id} and was in the ${user.cohort} cohort`);
  });
}).catch(err => {
  console.log('query error', err.stack);
});