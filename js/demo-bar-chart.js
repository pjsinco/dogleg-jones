console.log('clampett');

// help from: http://bl.ocks.org/mbostock/2368837

var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = 500 - margin.left - margin.right,
  height = 1200 - margin.top - margin.bottom;

var xScale = d3.scale.linear()
  .range([0, width]);

var yScale = d3.scale.ordinal()
  .rangeRoundBands([height, 0], 0.2);

var xAxis = d3.svg.axis()
  .scale(xScale)
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

  // sort dataset in place
  dataset.sort(function(a, b) {
    return b.r1 - a.r1;
  });

  // we could use d3.exent instead of min, max
  var minScore = d3.min(scores);
  var maxScore = d3.max(scores);

  xScale.domain([minScore, maxScore])
  //yScale.domain(d3.range(0, data.length));
  yScale.domain(dataset.map(function(d) {
    return d.name; 
  }));


  var svg = d3.select('.vis')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' +
        margin.top + ')')

  svg.append('g')
    .classed('x axis', true)
    .attr('transform', 'translate(100, 0)')
    .call(xAxis);

  var yAxis = svg.append('g')
    .classed('y axis', true)
    .append('line')
      .attr('x1', xScale(0))
      .attr('y1', margin.top)
      .attr('x2', xScale(0))
      .attr('y1', height - margin.bottom);

  var barGroup = svg.append('g')
    .classed('bar', true)
    .attr('transform', 'translate(100, 0)')

  var bars = barGroup.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', function(d) {
        return xScale(Math.min((d.r1 - par), 0));
      })
      .attr('y', function(d) {
        return yScale(d.name);
      })
      .attr('width', function(d) {
        return Math.abs(xScale(d.r1 - par) - xScale(0));
      })
      .attr('height', function(d) {
        return yScale.rangeBand();
      })
      .style('fill', function(d) {
        return (d.r1 - par) < 0 ? 'brown' : 'steelblue';
      })
      .style('opacity', '0.7');
      
  var textGroup = svg.append('g')
    .classed('label', true);

  var text = textGroup.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
      .attr('x', margin.left)
      .attr('y', function(d) {
        return yScale(d.name);
      })
      .attr('text-anchor', 'start')
      .attr('transform', 'translate(0,' + 
        (yScale.rangeBand() / 1) + ')')
      .text(function(d) {
        return d.name + ', ' + (d.r1 - par);
      })
      .style('fill', '#666')


}); // end d3.csv
