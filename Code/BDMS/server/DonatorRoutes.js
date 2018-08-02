var DonatorsController = require('./controllers/DonatorController'),
app = require('express')(),
parser = require('body-parser');

app.use(parser.json());

app.on('mount', DonatorsController.onMount);

app.get('/', DonatorsController.findLocation);

app.post('/', DonatorsController.createDonator);

app.param('donatorId', DonatorsController.paramsDonator);

app.get('/:donatorId', DonatorsController.getDonatorById);

app.put('/:donatorId', DonatorsController.updateDonatorById);

app.delete('/:donatorId', DonatorsController.deleteDonatorById);

module.exports = app;

