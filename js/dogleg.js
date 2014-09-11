console.log('hello');

var data = [];

d3.json('/data/tourn-1978-32.json', function(error, json) {
  
  //console.log(json);
  //console.log(Object.keys(json)[34]);
  //console.log(Object.keys(json[3]));
  //console.log(Object.keys(json[Object.keys(json)][0]));

  var keys = Object.keys(json);

  keys.forEach(function(d, i) {
    data[i] = json[i];
  })

  console.log(data);
  var players = data.map(function(d, i) {
    return {
      pos: d['Pos'],
      Name: d['Name'],
      r1: +d['1'],
      r2: +d['2'],
      r3: +d['3'],
      r4: +d['4'],
      purse: +d['Purse'],
      strokes: +d['Strokes'],
      total: +d['Total'],
      playerId: d['player_id']
    }
  });


  // get header fields from a player object
  var fields = Object.keys(players[0]);

  //console.log(players);
  
  var table = d3.select('.vis').append('table'),
    tHead = table.append('thead');
    
  tHead
    .selectAll('th')
    .data(fields)
    .enter()
      .append('th')
      .text(function(d) {
        return d;
      });
  
  var tBody = table.append('tbody');

  var rows = tBody
    .selectAll('tr')
    .data(players)
    .enter()
      .append('tr')


  console.log(rows);
  var cells = rows
    .selectAll('td')
    .data(function(row, i) {
      return d3.range(Object.keys(row).length)
        .map(function(column, i){
          return row[Object.keys(row)[i]];
        })
    })
    .enter()
      .append('td')
      .text(function(d) {
        return d
      })
    
    

  
  
  
    
    

});
