console.log('clampett');

var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = 960 - margin.left - margin.right,
  height = 960 - margin.top - margin.bottom;

var svg = d3.select('.vis')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('transform', 'translate(' + margin.left + ',' +
    margin.top + ')');

var xScale = d3.scale.linear()
  .range([0, width]);

var yScale = d3.scale.ordinal()
  .rangeBands([height, 0]);

var xAxis = d3.svg.axis()
  .scale(xAxis)
  .orient('top');

var dataset;

d3.csv('data/tourn-1978/tourn-1978-32.csv', function(error, data) {

  // TODO
  // calc. programmatically
  var par = 72;

  // extract the info
  dataset = data.map(function(d) {
    return {
      name: d.Name,
      id: d.player_id,
      r1: +d['1'],
      r2: +d['2'],
      r3: +d['3'],
      r4: +d['4']
    };
  });

  var keys = Object.keys(dataset[0]).filter(function(key) {
    return key != 'name' && key != 'id';
  });

  // grab all the scores so we can determine min, max
  var scores = [];
  dataset.forEach(function(d) {
    for (var i = 0; i < keys.length; i++) {
      scores.push(d[keys[i]] - par);
    }
  });

  // we could use d3.exent instead of min, max
  var minScore = d3.min(scores);
  var maxScore = d3.max(scores);

  xScale.domain([minScore, 0, maxScore]);
  yScale.domain(d3.range(0, data.length));
  
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', function(d) {
        return xScale(d.r1 - par);
      })
      .attr('y', function(d, i) {
        return yScale(i);
      })
      .attr('width', function(d) {
        return xScale(d.r1 - par);
      })
      .attr('height', function(d) {
        return yScale.rangeBand();
      })
      .style('fill', 'cadetblue')
      
  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
      .attr('x', function(d) {
        return width;
      })
      .attr('y', function(d, i) {
        return yScale(i);
      })
      .attr('text-anchor', 'end')
      .text(function(d) {
        return d.name + ', ' + (d.r1 - par);
      })
      .style('fill', '#666')


}); // end d3.csv
