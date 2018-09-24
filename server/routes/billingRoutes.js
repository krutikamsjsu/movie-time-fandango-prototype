const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //need movie id and user id

    const charge = await stripe.charges.create({
      amount: 900,
      currency: 'usd',
      description: '$9 for the movie',
      source: req.body.id
    });

    if (charge.status === 'succeeded') {
      console.log('The status here is', charge.status);
      //need to save in the DB
      res.status(200).send({ message: 'Thank you for making the payment' });
    } else {
      res.status(401).send({ error: 'Payment did not go through' });
    }
  });
  /*
  Following API return the receipts of the user who is currently logged in
  */
  app.get('/api/getReceits/'), async (req, res) => {
    const redis = require('redis');
    const redisUrl = 'redis://127.0.0.1:6379';
    const client = redis.createClient(redisUrl);
    const util = require('util');
    client.get = util.promisify(client.get);
    //Before saving it in the cache, check if anything in the cache
    //that is related to the query
    const cachedCustomerReceipt = await client.get(req.user.id);

    //if no, update cache to store our data
    if (cachedCustomerReceipt) {
      console.log('serving from cache');
      return res.send(JSON.parse(cachedCustomerReceipt));
    }
    console.log('serving from backend');
    const receipts = await Receipt.find({ _user: req.user.id });
    client.set(req.user.id, receipts);
  };
};
