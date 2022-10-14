'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const personModel = dynamoose.model('people-demo', peopleSchema);

exports.handler = async (event) => {
  const id = (event.pathParameters.id).toString();

  const response = {
    statusCode: null,
    body: null,
  };

  try {
    await personModel.delete(id);
    response.statusCode = 200;
    response.body = 'Delete successful';
  } catch (e) {
    console.log('ERROR IN HANDLE DELETE:', e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
};
