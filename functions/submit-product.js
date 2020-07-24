var Airtable = require('airtable');
const {key, baseId} = process.env; // Get the enviroment values defined in netlify site 
var base = new Airtable({apiKey:key}).base(baseId);

const table = base('sighting');

const submitRecord = async (fields) => {
  console.log('ran in submitRecord');
  console.log(fields)
    await table.create(fields);
}

exports.handler = function(event, context, callback) {
    const product = JSON.parse(event.body);
console.log("ran in function")
console.log(product);
    const newRecord= {
      'Category': product.Category,
      'Type': product.Type,
      'Description': product.Description,
      'Location': product.Location,
    }
    
    submitRecord(newRecord);
    
    callback(null, {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true
      },
    });
  };