'use strict';

const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const personModel = dynamoose.model('Person', personSchema);

exports.handler = async (event) => {
  console.log('EVENT:', event);
  console.log('EVENT QUERY PARAMETERS:', event.queryStringParameters);
  const pathId = event.pathParameters.id;

  const { id, name, phone } = event.queryStringParameters;

  const person = { id, name, phone };
  console.log('PERSON:', person);

  const response = {
    statusCode: null,
    body: null,
  };

  let personRecords;
  try {
    if (pathId) personRecords = await personModel.scan().exec();
    else personRecords = await personModel.scan(pathId).exec();
    response.statusCode = 200;
    response.body = JSON.stringify(personRecords);
  } catch (e) {
    console.log('ERROR IN HANDLE CREATE:', e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
};
