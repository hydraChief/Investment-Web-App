const dbConnection = require('../db/connections.db');

const getInvestmentDistributionModel = async (user) => {
    let query = `
        SELECT 
            company_name,
            COALESCE(SUM(CASE WHEN type = 'buy' THEN total_units ELSE 0 END), 0) -
            COALESCE(SUM(CASE WHEN type = 'sell' THEN total_units ELSE 0 END), 0) AS units_remaining
        FROM investments
        WHERE user_id = ?
        GROUP BY company_name
        HAVING units_remaining > 0;`
    dbConnection.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        return results;
    });
};

const getInvestmentDistributionByAmountModel = async (user) => {
}

const getDateSeriesDataforAllUnitsBoughtSoldModel = async (user) => {
    let query = `
            WITH RECURSIVE date_series AS (
            SELECT MIN(transaction_date) AS dt
            FROM investments
            WHERE user_id = 123
            UNION ALL
            SELECT DATE_ADD(dt, INTERVAL 1 DAY)
            FROM date_series
            WHERE dt < (SELECT MAX(transaction_date) FROM investments WHERE user_id = 123)
        ),
        companies AS (
            SELECT DISTINCT company_name FROM investments WHERE user_id = 123
        ),
        types AS (
            SELECT 'buy' AS type
            UNION ALL
            SELECT 'sell'
        ),
        company_type_date AS (
            SELECT 
                d.dt AS transaction_date,
                c.company_name,
                t.type
            FROM date_series d
            CROSS JOIN companies c
            CROSS JOIN types t
        )
        SELECT 
            ctd.transaction_date,
            ctd.company_name,
            ctd.type,
            COALESCE(SUM(i.total_units), 0) AS total_units,
            COALESCE(SUM(i.total_amount), 0) AS total_amount
        FROM company_type_date ctd
        LEFT JOIN investments i
            ON i.transaction_date = ctd.transaction_date
        AND i.company_name = ctd.company_name
        AND i.type = ctd.type
        AND i.user_id = 123
        GROUP BY ctd.transaction_date, ctd.company_name, ctd.type
        ORDER BY ctd.transaction_date, ctd.company_name, ctd.type;
`
    dbConnection.query('SELECT * FROM investments', (error, results) => {
        if (error) {
            throw error;
        }
        return results;
    });
}

//this is for particular company
const getDateSeriesDataforUnitsBoughtSoldModel= async (user,comapanyNmme) => {
    let query = `
            WITH RECURSIVE date_series AS (
            SELECT MIN(transaction_date) AS dt
            FROM investments
            WHERE user_id = 123 AND company_name = 'Tesla'
            UNION ALL
            SELECT DATE_ADD(dt, INTERVAL 1 DAY)
            FROM date_series
            WHERE dt < (SELECT MAX(transaction_date) FROM investments WHERE user_id = 123 AND company_name = 'Tesla')
        ),
        types AS (
            SELECT 'buy' AS type
            UNION ALL
            SELECT 'sell'
        ),
        company_type_date AS (
            SELECT 
                d.dt AS transaction_date,
                t.type
            FROM date_series d
            CROSS JOIN types t
        )
        SELECT 
            ctd.transaction_date,
            'Tesla' AS company_name,
            ctd.type,
            COALESCE(SUM(i.total_units), 0) AS total_units,
            COALESCE(SUM(i.total_amount), 0) AS total_amount
        FROM company_type_date ctd
        LEFT JOIN investments i
            ON i.transaction_date = ctd.transaction_date
        AND i.type = ctd.type
        AND i.user_id = 123
        AND i.company_name = 'Tesla'
        GROUP BY ctd.transaction_date, ctd.type
        ORDER BY ctd.transaction_date, ctd.type;
 `
}
module.exports = {
    getInvestmentDistributionModel,
    getInvestmentDistributionByAmountModel
};
