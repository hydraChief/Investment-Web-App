function executeQueries(dbConn,queries) {
    return new Promise((resolve, reject) => {
      let index = 0;
      const results = [];
  
      // Recursive function to execute queries one by one
      function executeNext() {
        if (index < queries.length) {
          dbConn.query(queries[index], (err, res) => {
            if (err) {
              reject(`Error executing query #${index + 1}: ${err}`);
              return;
            }
            results.push(res);  // Store the result
            index++;
            executeNext();  // Execute the next query
          });
        } else {
          resolve(results);  // Return all the results once all queries are executed
        }
      }
  
      // Start executing queries
      executeNext();
    });
  }

  module.exports = executeQueries;