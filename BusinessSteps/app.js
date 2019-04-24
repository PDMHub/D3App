function loadFile(fileToLoad){
    queue()
    .defer(d3.json, fileToLoad)
    .await(function(error, file) {createForceLayout(file);})
}

function createForceLayout(nodesLinksSchema)
{
    var force = d3.layout.force()
    .charge(-100)
    .size([500,500])
    .linkDistance([100])
    .nodes(nodesLinksSchema.nodes)
    .links(nodesLinksSchema.links)
    .start();
    

    var svg = d3.select("svg")

    var links = svg.selectAll("line.link")
    .data(nodesLinksSchema.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke", "black")
    .style("opacity", 0.8)
    .style("stroke-width", "2");

    var nodes = svg.selectAll("rect")
    .data(nodesLinksSchema.nodes)
        .enter()
        .append("rect")
        .attr({ x: 10, y: 10, width: 120, height: 60})
        .style("stroke", "black")
        .call(force.drag);

    force.on("tick", forceTick);

    function forceTick() {

        links
        .attr("x1", function (d) {return d.source.x;})
        .attr("x2", function (d) {return d.target.x;})
        .attr("y1", function (d) {return d.source.y;})
        .attr("y2", function (d) {return d.target.y;});

        nodes
        .attr("x", function (d) {return d.x;})
        .attr("x", function (d) {return d.x;})
           
        //d3.selectAll("g.node")
        //.attr("transform", function (d) {return "translate("+d.x+","+d.y+")";})
    }
}

function f() { //comment
    console.log("Привет!")
    return d3.select("body").append("div").style("border", "10px black solid").html("hello world");
}

loadFile("GIISschema.json");



