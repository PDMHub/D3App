function createForceLayout(nodesLinksSchema)
{
    //if (error) throw "Error with file loading";
    var width = 640;
    var height = 480;
    

    // Блок кода, который приводит номера источников и целей в связях к 
    // системе отсчета, начинающейся с нуля
    for (var link in nodesLinksSchema.links) {
        nodesLinksSchema.links[link]["source"] = nodesLinksSchema.links[link]["source"] - 1;
        nodesLinksSchema.links[link]["target"] = nodesLinksSchema.links[link]["target"] - 1;
      }

    var simulation = d3.forceSimulation(nodesLinksSchema.nodes);

    simulation
    .force('charge', d3.forceManyBody().strength(-20))
    //.force('linkForce', d3.forceLink(nodesLinksSchema.links).distance(20).strength(2))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(nodesLinksSchema.links))
    //.force('link', d3.forceLink(nodesLinksSchema.links))
    .on('tick', forceTick);
        
    function forceTick() {

    var links = d3.select('svg').selectAll('line.linkVisual');

        links
        .data(nodesLinksSchema.links)
        .enter()
        .append('line')
        .attr('class', 'linkVisual')
        .attr('x1', d => d.source.x)
        .attr('x2', d => d.target.x)
        .attr('y1', d => d.source.y)
        .attr('y2', d => d.target.y)
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

    }
}

function initSimulationWithFile(fileToLoad){
    
var loadedSchema = d3.json(fileToLoad)
                    .then(function (result) {
                        createForceLayout(result);
                    }, function (error) {
                        console.log(error);
                    });

}


initSimulationWithFile("http://127.0.0.1:3000/GIISschema.json");



