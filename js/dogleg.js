console.log('hello');

var data;
d3.json('/data/tourn-1978-32.json', function(error, json) {
  
  console.log(json);

  console.log(Object.keys(json)[34]);
  console.log(Object.keys(json[3]));
  //console.log(Object.keys(json[Object.keys(json)][0]));

  console.log(data);
  
  //console.log(data);
  //console.log(typeof(data));

  // # of cols reflects # of fields in data
  //console.log(data[22]);

  var fields = d3.keys(data[0]);
  
  var table = d3.select('.vis')
    .append('table');

  var tHead = table
    .append('thead');
    
  tHead
    .selectAll('th')
    .data(fields)
    .enter()
      .append('th')
      .text(function(d) {
        return d;
      });
  
  var tBody = table.append('tbody')

  
    
    

});
