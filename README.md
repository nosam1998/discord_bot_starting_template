# Basic discord bot
## Structure:

- /
    - src/
        - commands/
            - tools/
        - events/
            - client/
            - mongo/
        - functions
            - handlers/
        - schemas/
            - Mongo DB schema's
    - `index.js` (Main entry point)
    - `package.json`
    - `.env`

## Getting started:
1. run `npm i` in the terminal
2. Update the `.env` file to use your credentials
    1. You can use either `devToken` or `prodToken`. If both are filled then it will use the `prodToken`.
    2. You can choose between `clientId` and `guildId` **OR** `applicationId`
    3. You can use `mongo_connStr` (which is a MongoDB connection string) **OR** you can use the individual parameters (`mongo_host`, `mongo_dbname`, `mongo_database`, `mongo_username`, `mongo_password`)
3. Run the bot by doing: `npm run startmon` to utilize nodemon **OR** `npm run start`
            
