// This loads the enviornmental variables used in the react app
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epologue');

// Sets up the HTTP server and adds settings to allow cross-origin resource sharing (CORS) and will be automatically parsed to JSON
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup Sequelize to use sqlite
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
});

// Defines the database model
const Match = database.define('matches', {
    timestamp: Sequelize.INTEGER,
    map: Sequelize.INTEGER,
    playersNumber: Sequelize.INTEGER,
    teamComposition: Sequelize.STRING,
    enemyComposition: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    victory: Sequelize.BOOLEAN,
    killingBlows: Sequelize.INTEGER,
    damage: Sequelize.INTEGER,
    healing: Sequelize.INTEGER,
    honor: Sequelize.INTEGER,
    ratingChange: Sequelize.INTEGER,
    teamMMR: Sequelize.INTEGER,
    enemyMMR: Sequelize.INTEGER,
    specialization: Sequelize.STRING,
    isRated: Sequelize.BOOLEAN,
});

// Initialize epilogue - binds sequelize and express together and allows quick CRUD endpoint creation in a few lines of code
epilogue.initialize({ app, sequelize: database });

// Create endpoints for the Match model: one for a list of matches which will have POST and GET methods and one for the individual matches which will hage GET PUT and DELETE mehtods.
epilogue.resource({
    model: Match,
    endpoints: ['/matches', '/matches/:id'],
});

// Set listening port to enviornmental variable or localhost port 3001 (since react app is running on 3000)
const port = process.env.SERVER_PORT || 3001;

// Once the database is initialized have express start listening for HTTP request on specified port
database.sync().then(()=> {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});