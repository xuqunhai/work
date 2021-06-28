// https://csv.js.org/
// Import the package main module
const csv = require('csv')
// Use the module
csv
// Generate 20 records
.generate({
  delimiter: '|',
  length: 2
})
// Parse the records
.pipe(csv.parse({
  delimiter: '|'
}))
// Transform each value into uppercase
.pipe(csv.transform(function(record){
   return record.map(function(value){
     return value.toUpperCase()
   });
}))
// Convert the object into a stream
.pipe(csv.stringify({
  quoted: true
}))
// Print the CSV stream to stdout
.pipe(process.stdout)