'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const personModel = dynamoose.model('people-demo', peopleSchema);

exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { id, name, phone } = parsedBody;
  const person = { id, name, phone };

  const response = {
    statusCode: null,
    body: null,
  };

  try {
    const newPerson = await personModel.create(person);
    response.statusCode = 200;
    response.body = JSON.stringify(newPerson);
  } catch (e) {
    console.log('ERROR IN HANDLE CREATE:', e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
};
