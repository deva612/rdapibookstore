const Mobile = require('../models/Mobile');

const addMobile = async (req, res) => {
    try {
        let mobile = new Mobile(req.body);
        await mobile.save();
        console.log('data saved successfully');
        res.status(200).send({
            message: 'data saved successfully'
        });
    } catch (err) {
        res.status(400).send({ message: 'somenthing went wrong' });
    }
}

module.exports = {
    addMobile
}