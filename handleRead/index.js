'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const personModel = dynamoose.model('people-demo', peopleSchema);

exports.handler = async (event) => {
  const id = event.pathParameters && event.pathParameters.id;

  const response = {
    statusCode: null,
    body: null,
  };

  try {
    let personRecords;
    if (id) personRecords = await personModel.get(id.toString());
    else personRecords = await personModel.scan().exec();
    response.statusCode = 200;
    response.body = JSON.stringify(personRecords);
  } catch (e) {
    console.log('ERROR IN HANDLE READ:', e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
};
