const investmentModel = require('../modles/investments.modles');

function addInvestmentModel(req, res) {
    const investmentData = req.body;
    if(!investmentData || !investmentData.companyName || !investmentData.units || !investmentData.price || !investmentData.type || !investmentData.userId) {
        return res.status(400).json({ error: 'Invalid investment data' });
    }
    investmentModel.addInvestmentModel(investmentData)
        .then(result => {
        res.status(201).json({ message: 'Investment added successfully', data: result });
        })
        .catch(err => {
        console.error('Error adding investment:', err);
        res.status(500).json({ error: 'Failed to add investment' });
        });
}

function squareOffInvestment(req, res) {
}

module.exports = {
  addInvestmentModel,
  squareOffInvestment
};