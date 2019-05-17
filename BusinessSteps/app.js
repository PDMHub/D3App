function createForceLayout(nodesLinksSchema)
{
    if (error) throw "Error with file loading";
    var width = 640;
    var height = 480;
    
    var simulation = d3.forceSimulation(nodesLinksSchema.nodes);

    simulation
    .force('charge', d3.forceManyBody().strength(-20))
    //.force('linkForce', d3.forceLink(nodesLinksSchema.links).distance(20).strength(2))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(nodesLinksSchema.links))
    .on('tick', forceTick);
        
    function forceTick() {

    var links = d3.select('svg').selectAll('line.link');

        links
        .data(nodesLinksSchema.links)
        .enter()
        .append('line')
        .attr('class', 'linkVisual')
        .attr('x1', d => d.source.x1)
        .attr('x2', d => d.source.x2)
        .attr('y1', d => d.source.y1)
        .attr('y2', d => d.source.y2)
        .style('stroke', 'black')
        .style('opacity', 0.8)
        .style('stroke-width', '2');

    var nodes = d3.select('svg').selectAll('rect');

        nodes
        .data(nodesLinksSchema.nodes)
        .enter()
        .append('rect')
        .attr('class', 'nodeVisual')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', '50')
        .attr('height', '30')
        .style('stroke-width', '2')
        .style('stroke', 'black');

/*         links
        .attr('x1', function (d) {return d.source.x;})
        .attr('x2', function (d) {return d.target.x;})
        .attr('y1', function (d) {return d.source.y;})
        .attr('y2', function (d) {return d.target.y;});

        nodes
        .attr('x', function (d) {return d.x;})
        .attr('y', function (d) {return d.x;}) */
           
        //d3.selectAll('g.node')
        //.attr('transform', function (d) {return 'translate('+d.x+','+d.y+')';})
    }
}

function initSimulationWithFile(fileToLoad){
    d3.queue()
    .defer(d3.json, fileToLoad)
    .await(function(error, jsonSchema) {createForceLayout(jsonSchema);});
}

function valueDecrease(jsonObject)
{
   console.log("Все хорошо");
}

//d3.json('GIISschema.json', function(data) {createForceLayout(data); })
//createForceLayout(nodesLinks)
initSimulationWithFile("GIISschema.json");



