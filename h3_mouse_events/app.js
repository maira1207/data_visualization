var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
.attr("transform","translate(100,0)")
.attr("x",50)
.attr("y",50)
.attr("class","title")
.text("Some data at the Bar");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g");
g.attr("transform","translate(100,100)");

var data = [
  {year:2010, val: 6},
  {year:2011, val: 14},
  {year:2012, val: 21},
  {year:2013, val: 34},
  {year:2014, val: 56},
  {year:2016, val: 45},
  {year:2017, val: 57},
  {year:2019, val: 61},
];

xScale.domain(data.map(function(d) { return d.year;}));
yScale.domain([0,d3.max(data, function(d) {return d.val;})]);

g.append("g")
.attr("transform","translate(0,"+height+")")
.call(d3.axisBottom(xScale));


g.append("g")
.call(d3.axisLeft(yScale));


 var Tooltip = d3.select("#div_template")
    .append("div")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("display","inline-block")
    .style("position","absolute")
    .style("opacity", 0);


var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}


var mousemove = function(d) {
  console.log(d3.select(this));
    var val_ = d3.select(this).data()[0].val;
    var year = d3.select(this).data()[0].year;
    Tooltip
      .html("Val:  " + val_ + "<br>" + "Year: " + year)
      .style("left", Math.round(d3.select(this).attr("x")) + 110 + "px")
      .style("top", Math.round((height - d3.select(this).attr("height") + 55)) + "px")
  }

var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
}



g.selectAll(".bar")
.data(data)
.enter()
.append("rect")
.attr("class","bar")
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)
.attr("x", (d)=>xScale(d.year))
.attr("y", (d)=>yScale(d.val))
.attr("width", xScale.bandwidth())
.style("stroke", "none")
.style("opacity", 0.8)
.transition()
.ease(d3.easeLinear)
.duration(500)
.delay((d,i)=>i*50)
.attr("height", (d)=>height-yScale(d.val));
