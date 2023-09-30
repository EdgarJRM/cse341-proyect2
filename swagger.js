const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CRUD Operations',
    description: 'Start developing a new API and gain experience performing CRUD operations.',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swegger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

//Run server after it gets generated
//swaggerAutogen(outputFile, endpointsFiles, doc),then(async () =>{
//    await import('./index.js');
//});