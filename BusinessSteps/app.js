function initSimulationWithFile(fileToLoad){
    d3.queue()
    .defer(d3.json, 'GIISschema.json')
    .await(function (error, file){ if (error) throw error;
            createForceLayout(file);
            console.log('OK');
            });
};

function createForceLayout(nodesLinksSchema)
{
    var width = 640
    var height = 480
    
    var simulation = d3.forceSimulation(nodesLinksSchema.nodes)
    .force('charge', d3.forceManyBody().strength(-20))
    //.force('linkForce', d3.forceLink(nodesLinksSchema.links).distance(20).strength(2))
    .force('center', d3.forceCenter(width/2, height/2))
    .on('tick', forceTick);

 
    var links = d3.select('svg').selectAll('line.link')
    .data(nodesLinksSchema.links)
    .enter()
    .append('line')
    .attr('class', 'linkVisual')
    .style('stroke', 'black')
    .style('opacity', 0.8)
    .style('stroke-width', '2');

    var nodes = d3.select('svg').selectAll('rect')
    .data(nodesLinksSchema.nodes)
        .enter()
        .append('rect')
        .attr('class', 'nodeVisual')
        .style('stroke', 'black')
        
    function forceTick() {

        links
        .attr('x1', function (d) {return d.source.x;})
        .attr('x2', function (d) {return d.target.x;})
        .attr('y1', function (d) {return d.source.y;})
        .attr('y2', function (d) {return d.target.y;});

        nodes
        .attr('x', function (d) {return d.x;})
        .attr('y', function (d) {return d.x;})
           
        //d3.selectAll('g.node')
        //.attr('transform', function (d) {return 'translate('+d.x+','+d.y+')';})
    }
}



//d3.json('GIISschema.json', function(data) {createForceLayout(data); })
//createForceLayout(nodesLinks)
initSimulationWithFile('GIISschema.json');

var data = {"nodes":[{"label": "Клиент 1234", "type": "participant", "description":"Описание1"},
{"label": "ОИС", "type": "participant", "description":"Описание2"},
{"label": "ОТО", "type": "participant", "description":"Описание3"},
{"label": "Название подсистемы ГИИС ЭБ", "type": "question", "description":"Какую подсистему ГИИС ЭБ вы используете?"},
{"label": "Название и версия браузера", "type": "question", "description":"Какой браузер и какой версии вы используете?"},
{"label": "ПУИО ЭБ", "type": "answer", "description":"Подсистема учета и отчетности ЭБ"},
{"label": "ПУР ЭБ", "type": "answer", "description":"Подсистема управления расходами ЭБ"},
{"label": "Не знаю какая подсистема ЭБ", "type": "answer", "description":"Подсистема управления расходами ЭБ"},
{"label": "Браузер Спутник", "type": "answer", "description":"У меня браузер 'Спутник'"},
{"label": "Браузер Firefox", "type": "answer", "description":"У меня браузер Mozilla Firefox"}
],
"links":
[	{"source":0, "target":1},
{"source":1, "target":4},
{"source":4, "target":6},
{"source":4, "target":7},
{"source":4, "target":8},
{"source":6, "target":5},
{"source":7, "target":5},
{"source":5, "target":9},
{"source":5, "target":10},
{"source":5, "target":9},
{"source":8, "target":3}
]
}

createForceLayout(data)



