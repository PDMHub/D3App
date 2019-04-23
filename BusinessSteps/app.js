function loadFile(fileToLoad){
    queue()
    .defer(d3.json, fileToLoad)
    .await(function(error, file) {createForceLayout(file);})
}

function createForceLayout(nodesLinksSchema)
{
    var force = d3.layout.force().charge(-1000)
    .size([500,500])
    .nodes(nodesLinksSchema.nodes)
    .links(nodesLinksSchema.links)
    .on("tick", forceTick);

    d3.select("svg").selectAll("line.link")
    .data(nodesLinksSchema.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke", "black")
    .style("opacity", 0.8)
    .style("stroke-width", "2");


    force.start();

    function forceTick() {

        d3.selectAll("line.link")
        .attr("x1", function (d) {return d.source.x;})
        .attr("x2", function (d) {return d.target.x;})
        .attr("y1", function (d) {return d.source.y;})
        .attr("y2", function (d) {return d.target.y;});
    
        d3.selectAll("g.node")
        .attr("transform", function (d) {return "translate("+d.x+","+d.y+")";})
    }
}

function f() { //comment
    console.log("Привет!")
    return d3.select("body").append("div").style("border", "10px black solid").html("hello world");
}

loadFile("GIISschema.json");



