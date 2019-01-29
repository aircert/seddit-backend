import express from 'express';
import graphqlHTTP from 'express-graphql';
import resolverMap from './data/resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import path from 'path';

const schema = fs.readFileSync(path.join(__dirname, 'data/schema.graphql')).toString();

const MySchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
});

const app = express();

app.use("/graphql", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/graphql', graphqlHTTP({
  schema: MySchema,
  graphiql: true
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});