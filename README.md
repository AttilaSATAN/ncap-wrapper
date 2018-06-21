# NCAP-WRAPPER

### This is a wrapper API for NHTSA NCAP 5 STAR API.

Developed under Node 8.11.3 with [Express](https://expressjs.com/), [Axios](https://github.com/axios/axios) and [Jest](https://facebook.github.io/jest/) for testing.
Used with TDD methodology. Both APIs and end-points tested with Jest on development.

It tooked a little more than 6 hours.

To run app:

```bash
git clone https://github.com/AttilaSATAN/ncap-wrapper
cd ncap-wrapper
npm i
node app
```

Endpoint have to be tested against a running server. Before runnig test make sure app is running.
```
npm test
```

There is one more command for continuous test driven development.
```
npm run tdd
```