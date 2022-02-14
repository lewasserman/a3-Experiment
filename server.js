
const { Pool } = require("pg");
const express = require("express");
const app = express();
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'client/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'client/public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

// const handlePost = function( request, response ) {
//     console.log(`handlePost request: ${request}`);
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })

//   request.on( 'end', function() {
//     const json = JSON.parse( dataString )
//     appdata.push(json)
//     appdata.sort(function ( a, b ) {
//       if ( a.rating < b.rating ){
//         return 1;
//       }
//       if ( a.rating > b.rating ){
//         return -1;
//       }
//       if( a.year < b.year){
//         return 1;
//       }
//       if ( a.year > b.year){
//         return -1;
//       }
//       return 0;
//     })
//     for(var i = 0; i < appdata.length; i++){
//       appdata[i].rank = i+1
//     }

//     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//     response.end(JSON.stringify(appdata))
//   })
// }

server.listen( process.env.PORT || port )

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "dv",
  password: "Tammy2432",
  port: 5432,
};

async function createTables() {
  const text = `
    CREATE TABLE Participant (participantId VARCHAR(50) PRIMARY KEY NOT NULL)
  `;
  pool.query(text);
  text = `
    CREATE TABLE Trial (trialId VARCHAR(50) PRIMARY KEY NOT NULL,
    truePerct INT NOT NULL, 
    repPerct INT NOT NULL,
    type VARCHAR(50),
    participantId VARCHAR(50),
    CONSTRAINT fk_participantId 
    FOREIGN KEY(participantId) 
    REFERENCES Participant(participantId))
  `;
  return pool.query(text);
}

async function createParticipant(p) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO Participant (participantId) VALUES ($1);`;
  const values = [p.participantId];
  return pool.query(text, values);
}

async function createTrial(t) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO Trial (trialId, truePerct, repPerct, type, participantId) VALUES ($1,$2,$3,$4,$5);`;
  const values = [t.trialId, t.truePerct, t.repPerct, t.type, t.participantId];
  return pool.query(text, values);
}

async function getTrials(participantId) {
  const pool = new Pool(credentials);
  const text = `SELECT * FROM Trial where participantId=$1;`;
  const values = [participantId];
  return pool.query(text, values);
}

async function getAllTrials() {
  const pool = new Pool(credentials);
  const text = `SELECT * FROM Trial;`;
  return pool.query(text);
}

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  // const now = await pool.query("SELECT NOW()");

  // // Create a new participant ; Register a new user and get an id, which comes from the RETURNING clause.
  // const createParticipantConst = await createParticipant({
  //   participantId: "123",
  // });
  // // const participantId = createParticipant.rows[0]["participantId"];
  // console.log("Created a participant with id: 123");

  // // Create a new participant ; Register a new user and get an id, which comes from the RETURNING clause.
  // const createParticipant2 = await createParticipant({
  //   participantId: "987",
  // });
  // // const participantId = createParticipant.rows[0]["participantId"];
  // console.log("Created a participant with id: 987");

  // Create a new participant ; Register a new user and get an id, which comes from the RETURNING clause.
  // const createTrial1 = await createTrial({
  //   trialId: "456",
  //   truePerct: 50,
  //   repPerct: 60,
  //   type: "bar",
  //   participantId: "123",
  // });
  // // const participantId = createParticipant.rows[0]["participantId"];
  // console.log("Created a trial with id: 456");

  // // Create a new participant ; Register a new user and get an id, which comes from the RETURNING clause.
  // const createTrial2 = await createTrial({
  //   trialId: "789",
  //   truePerct: 70,
  //   repPerct: 80,
  //   type: "bar",
  //   participantId: "987",
  // });
  // // const participantId = createParticipant.rows[0]["participantId"];
  // console.log("Created a trial with id: 456");

  // Obtain the full person object from the database.
  const getAllTrialsResult = await getAllTrials();
  console.log(
    "Result of getAllTrials query: " +
      JSON.stringify(getAllTrialsResult.rows, null, "  ")
  );

  // Obtain the full person object from the database.
  const getTrialsResult = await getTrials("123");
  console.log(
    "Result of getTrials query for participantId 123: " +
      JSON.stringify(getTrialsResult.rows, null, "  ")
  );

  await pool.end();

  // return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  // console.log("Time with pool: " + poolResult.rows[0]["now"]);
})();

app.post( '/add-participant', express.json(), function( request, response ) {

  console.log(`add-participant post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString );
    const pool = new Pool(credentials);
    //add participant to db

    // Create a new participant ; Register a new user and get an id, which comes from the RETURNING clause.
    const createParticipant2 = await createParticipant({
      participantId: json.participantId,
    });
    console.log("Created a participant with id: " + json.participantId);

    await pool.end();

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(json.participantId))
  })
})

app.post( '/add-trial', express.json(), function( request, response ) {

  console.log(`add-trial post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString );
    const pool = new Pool(credentials);
    //add participant to db

    const createTrial2 = await createTrial({
      trialId: json.trialId,
      truePerct: json.truePerct,
      repPerct: json.repPerct,
      type: json.type,
      participantId: json.participantId,
    });
    console.log("Created a trial with id: " + json.trialId);

    await pool.end();

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(json.trialId))
  })
})

app.post( '/get-all-trials', express.json(), function( request, response ) {

  console.log(`get-all-trials post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString );
    const pool = new Pool(credentials);
    //add participant to db

    const getAllTrialsResult = await getAllTrials();
    console.log(
      "Result of getAllTrials query: " +
        JSON.stringify(getAllTrialsResult.rows, null, "  ")
    );

    await pool.end();

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(getAllTrialsResult.rows, null, "  "))
  })
})

app.post( '/get-trials', express.json(), function( request, response ) {

  console.log(`get-trials post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString );
    const pool = new Pool(credentials);
    //add participant to db

    const getTrialsResult = await getTrials(json.participantId);
    console.log(
      "Result of getTrials query for participantId 123: " +
        JSON.stringify(getTrialsResult.rows, null, "  ")
    );

    await pool.end();

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(getTrialsResult.rows, null, "  "))
  })
})


// async function createTables() {
//   const text = `
//     CREATE TABLE Participant (participantId VARCHAR(50) PRIMARY KEY NOT NULL)
//   `;
//   pool.query(text);
//   text = `
//     CREATE TABLE Trial (trialId VARCHAR(50) PRIMARY KEY NOT NULL,
//     truePerct INT NOT NULL, 
//     repPerct INT NOT NULL,
//     type VARCHAR(50),
//     participantId VARCHAR(50),
//     CONSTRAINT fk_participantId 
//     FOREIGN KEY(participantId) 
//     REFERENCES Participant(participantId))
//   `;
//   return pool.query(text);
// }

// async function createParticipant(p) {
//   const text = `INSERT INTO Participant (participantId) VALUES ($1);`;
//   const values = [p.participantId];
//   return pool.query(text, values);
// }

// async function createTrial(t) {
//   const text = `INSERT INTO Trial (trialId, truePerct, repPerct, type, participantId) VALUES ($1,$2,$3,$4,$5);`;
//   const values = [t.trialId, t.truePerct, t.repPerct, t.type, t.participantId];
//   return pool.query(text, values);
// }

// async function getTrials(participantId) {
//   const text = `SELECT * FROM Trial where participantId=$1;`;
//   const values = [participantId];
//   return pool.query(text, values);
// }

// async function getAllTrials() {
//   const text = `SELECT * FROM Trial;`;
//   return pool.query(text);
// }