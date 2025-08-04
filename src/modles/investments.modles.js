const dbConnection = require('../db/connections.db');

const addInvestmentModel = async (investmentData) => {
    const { companyName, units, price, type, userId } = investmentData;
    const query = `
        INSERT INTO investments (company_name, total_units, total_amount, type, user_id, transaction_date, transaction_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW());
    `;
    dbConnection.query(query, [companyName, units, price * units, type, userId, new Date().toISOString().split('T')[0]], (error, results) => {
        if (error) {
            throw error;
        }
        return results;
    });
}

const squareOffInvestmentModel = async (investmentData) => {
    const { companyName, units, price, type, userId } = investmentData;
    const query = `
        INSERT INTO investments (company_name, total_units, total_amount, type, user_id, transaction_date, transaction_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW());
    `;
    dbConnection.query(query, [companyName, units, price * units, type, userId, new Date().toISOString().split('T')[0]], (error, results) => {
        if (error) {
            throw error;
        }
        return results;
    });
}

module.exports = {
    addInvestmentModel,
    squareOffInvestmentModel
};