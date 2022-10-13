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
  console.log('EVENT BODY:', event.body);

  const parsedBody = JSON.parse(event.body);
  const { id, name, phone } = parsedBody;

  const person = { id, name, phone };
  console.log('PERSON:', person);

  const response = {
    statusCode: null,
    body: null,
  };

  try {
    const newPerson = await personModel.update(person);
    response.statusCode = 200;
    response.body = JSON.stringify(newPerson);
  } catch (e) {
    console.log('ERROR IN HANDLE CREATE:', e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  return response;
};
