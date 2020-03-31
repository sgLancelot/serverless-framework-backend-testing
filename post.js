const dynamodb = require('aws-sdk/clients/dynamodb')
const docClient = new dynamodb.DocumentClient({ convertEmptyValues: true })

const uuid = require('uuid')

const tableName = process.env.DDB_TABLE_NAME

module.exports.post = async event => {
  const data = JSON.parse(event.body)
  const timestamp = new Date().getTime()
  
  var params = {
      TableName: tableName,
      Item: { 
        id: uuid.v1(),
        name: data.name, 
        contact: data.contact, 
        additional: data.additional,
        createdAt: timestamp
      }
  }

  try {
    await docClient.put(params).promise()
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Successfully posted to DDB!'
    }
  } catch(exception) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Failed to post to DDB!'
    }
  }

  const ddbPromise = await docClient.put(params).promise()
  if (ddbPromise) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Successfully posted to DDB!'
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Couldn\'t create the todo item.'
    }
  }
}


/*
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME

exports.handler = async (event) => {
    console.log("EVENT IS::::", event)
    var params = {
        TableName: tableName,
        Item: { Name: event.name, contact: event.contact, additional: event.additional }
    }
    
    return docClient.put(params).promise() 
    // docClient.put(params) returns a promise. Hence, can return a promise directly.

};
*/