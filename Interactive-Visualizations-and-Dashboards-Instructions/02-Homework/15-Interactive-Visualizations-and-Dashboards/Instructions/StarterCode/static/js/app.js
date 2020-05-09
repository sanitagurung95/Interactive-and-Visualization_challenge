//Use d3.json() to fetch data from SAMPLE JSON file
function fetchData(id) {
    d3.json("samples.json").then(data => {
        console.log(data);    
    // Use `.html("") to clear any existing metadata
        sampleData.html("");
    
        // Use `Object.entries` to add each key and value pair to the panel

      Object.entries(data).forEach(([key,value]) =>{
        metadata.append("data").text(`${key}: ${value}`);


      })
    });
};

// // build dropdown menu
function init() { 
  var dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
      console.log(data)
      data.names.forEach((name) => {
          dropdown.append("option").text(name).property("value");
      });

      fetchData(data.names[0]);
      metaData(data.names[0]);
  });
}

init();
// (DROPDOWN MENU cited from activities 2, solved 9)



function fetchData(id) {
  d3.json("samples.json").then((data)=> {
      console.log(data)
      
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      console.log(samples);

      // Get top 10 otu ids
      var samplevalues = samples.sample_values.slice(0, 10).reverse();
      var otuTop = (samples.otu_ids.slice(0, 10)).reverse();
      
      var otuID = otuTop.map(id => "OTU " + id)
      console.log(otuID)

      var labels = samples.otu_labels.slice(0, 10);

      var trace1 = {
          x: samplevalues,
          y: otuID,
          text: labels,
          marker: {
            color: 'Blue'},
          type:"bar",
          orientation: "h",
      };

      var data = [trace1];

      // bar layout
      var layout_Bar = {
          title: id+" Top 10 OTUs",
          yaxis:{
            tickmode:"linear"},
          height: 500,
          width: 1000,
          margin: {
              left: 100,
              right: 100,
              top: 100,
              bottom: 100
          }
      };
              // (CITED: "Margin" copied the line from Activities 3, solved 7).


      // bar plot
      Plotly.newPlot("bar", data, layout_Bar);

    
      // bubble plot
      var trace2 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.sample_values,
              colorscale: "Earth"
          },
          text: samples.otu_labels

      };

      // bubble plot layout
      var layout_Bubble = {
          xaxis:{title: "OTU ID"},
          height: 580,
          width: 1200
      };

      var data1 = [trace2];

      // create the bubble plot
      Plotly.newPlot("bubble", data1, layout_Bubble); 



    });
}  


// data for the demographic panel
function metaData(id) {

  d3.json("samples.json").then((data)=> {
      
      var metadata = data.metadata;

      console.log(metadata)

      var result = metadata.filter(meta => meta.id.toString() === id)[0];

      var demographicInfo = d3.select("#sample-metadata");
      
      //empty the panel and populate with the info
      demographicInfo.html("");
      Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
      });
  });
}
metadata(id);
 
//call the functions to display the data and the plots to the page

function optionChanged(id) {
  fetchData(id);
  metaData(id);
}
