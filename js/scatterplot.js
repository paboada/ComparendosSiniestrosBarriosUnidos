/* global d3, handleMouseOver, handleMouseOut */

function draw_scatter(archivo){
    
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);

var y = d3.scale.linear().range([height, 0]); 

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom"); 

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").selectAll("#contenedor2").append("svg").attr("class","scatter1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var ruta = "data/";
var extension = ".csv";
var archivo_procesar = ruta.concat(archivo,extension);
   
d3.csv(archivo_procesar, function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.Comparendos = +d.Comparendos;
    d.Siniestros = +d.Siniestros;
  });

  //x.domain(d3.extent(data, function(d) { return d.Comparendos; })).nice();
  //y.domain(d3.extent(data, function(d) { return d.Siniestros; })).nice();
  y.domain([-100, 100]);
  x.domain([-100, 100]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height/2 + ")")
       .attr("font-size", "7pt")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("%Delta-Comp");

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width/2 + ")",0)
       .attr("font-size", "7pt")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("%Delta-Sin") 



        
        
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", function(d) { return d.Mes; })
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.Comparendos); })
      .attr("cy", function(d) { return y(d.Siniestros); })
      .style("fill", function(d) { return color(d.Mes); })
      .on("mouseover",function(d) {
           console.log("movimiento de mouse");
           console.log("Comparendos: " + d.Comparendos);
           console.log("Siniestros: " + d.Siniestros);
           console.log(d.Localidad);           
           var elegido = d.Mes;
           console.log("elegido: " + elegido);           
           
          var c = d3.selectAll(".scatter1")
             .selectAll("."+elegido)
             .attr("r",20)
             .attr("opacity", "0.4")
             ;
           })
      .on("mouseout", function(d) {
          var elegido = d.Mes;
                               var c = d3.selectAll(".scatter1")
             .selectAll("."+elegido)
             .attr("r",3.5)
              .attr("opacity", "1")
        })
    ;
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate("+ 2 +"," + i * 19 + ")"; })
      
      
      ;

  legend.append("rect")
      .attr("x", width+10)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width)
      .attr("y", 9) 
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
      
 //leyendas para circulos  
 
    var legend_circles = svg.selectAll(".legend_circles")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "legend_circles")
                            ;
      
  legend_circles.append("text")
                .attr("x", function(d) { return x(d.Comparendos)-3; })
                .attr("y", function(d) { return y(d.Siniestros)-5; }) 
                .attr("font-size", "7pt")
                .style("text-anchor", "end")
                .text(function(d) { return "(" + d.Comparendos + ", "; }); 
        
  legend_circles.append("text")
                .attr("x", function(d) { return x(d.Comparendos)+15; })
                .attr("y", function(d) { return y(d.Siniestros)-5; }) 
                .attr("font-size", "7pt")
                .style("text-anchor", "end")
                .text(function(d) { return d.Siniestros+")"; });  

});
      
 
}

    


