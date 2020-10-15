const DATA_RECT = [
  {id:1,value:99},
  {id:2,value:59},
  {id:3,value:22},
  {id:3,value:76},
  {id:9,value:38},
  {id:8,value:71},
  {id:7,value:76},
  {id:4,value:18}
]

const DATA_CIRCLE = [
  {id:8,value:8},
  {id:7,value:41},
  {id:2,value:22},
  {id:4,value:36},
  {id:6,value:38},
  {id:3,value:17},
  {id:2,value:90},
  {id:1,value:18}
]

const container = d3.select("svg")
.classed('container',true);

const xScale = d3.scaleLinear().domain([0,10]).rangeRound([0,500]);
const yScale = d3.scaleLinear().domain([0,100]).rangeRound([0,500]);

container
.selectAll(".bar")
.data(DATA_RECT)
.enter()
.append('rect')
.attr('width',4)
.attr('height',4)
.attr('x',data=>xScale(data.id))
.attr('y', data=>500-yScale(data.value))
.style("fill","blue")
.text(data=>data.value);


container
.selectAll(".bar")
.data(DATA_CIRCLE)
.enter()
.append('circle')
.attr('r',4)
.attr('cx',data=>xScale(data.id))
.attr('cy', data=>500-yScale(data.value))
.style("fill","green")
.text(data=>data.value);

