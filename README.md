# Backend for Social Condominium (Entria challenge)

* GraphQL query: https://graphqlbin.com/vrOU7

### Directory Structure

```
├── /data/                   # GraphQL generated schema
├── /repl/                   # Read-Eval-Print-Loop (REPL) configuration
├── /scripts/                # Generate GraphQL schema script
├── /src/                    # Source code of GraphQL Server
│   ├── /connection/         # Connections types (Relay)
│   ├── /interface/          # NodeInterface (Relay)
│   ├── /loader/             # Loaders of the models using DataLoader
│   ├── /model/              # Models definition (Mongoose, SQL, Google DataStore)
│   ├── /mutation/           # Mutations definition
├── /test/                   # Test helpers
```

#### Setup

```bash
npm install
```

Note: If you do not have mongodb installed, please install it:

```bash
brew install mongodb
```

#### Develop

```bash
npm run watch
```

### Test

```bash
npm test
```

Or

```bash
npm run test:watch
```

#### Docker and docker-compose

No needs for installing dependencies or running `mongod` in another terminal
window

```bash
docker-compose build && docker-compose up
```

Test

```bash
docker-compose -f docker-compose.test.yml build && docker-compose -f docker-compose.test.yml up
```

#### Production

```bash
# first compile the code
npm run build

# run graphql compiled server
npm start
```

### Flow

```bash
npm run flow
```

Or

```bash
flow
```

### REPL server

```bash
npm run repl

awesome > const user = await M.User.find()
```

Yep, await syntax works on the repl, it is awesome, tks @princejwesley
(https://gist.github.com/princejwesley/a66d514d86ea174270210561c44b71ba)

### Schema

Update your schema

```bash
npm run update-schema
```

Take a look on the
[Schema](https://github.com/sibelius/graphql-dataloader-boilerplate/blob/master/data/schema.graphql)
