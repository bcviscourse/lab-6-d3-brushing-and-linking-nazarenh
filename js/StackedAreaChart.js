
// Activity IV - Import tooltip text abbreviation method

export default function StackedAreaChart(){ // does not need to have a name
	// init size
	let margin ={
		top: 40,
		left: 60,
		right: 0,
		bottom: 60
	};
	let width = 800;
	let height = 400;
	
	// init axes variables to be updated in real time
	let x = d3.scaleTime();
	let y = d3.scaleLinear();
	let color = d3.scaleOrdinal(d3.schemeCategory10);
	let yAxis = d3.axisLeft().scale(y);
	let xAxis = d3.axisBottom().scale(x);
	// Activity V - Create a dispatch for the category selection

	let stack, stackedData, area, tooltip;
	
	// define reusable chart update function
	function chart(selection){
		selection.each(function(data){// this: contains a currently selected container element (e.g., div)
			let innerWidth = width  - margin.left - margin.right; // margin convention
			let innerHeight =  height - margin.top - margin.bottom;
			  
			// ---- Init the internal structure only once -----
			let svg = d3.select(this).selectAll('svg')
				.data([data]);

			
			let svgEnter = svg.enter().append('svg');
			let gEnter = svgEnter.append('g');
			
			gEnter.append("g")
				.attr("class", "x-axis axis")
					
			gEnter.append("g")
				.attr("class", "y-axis axis");
			
			// Activity IV - Add a tooltip placeholder

			// ------------------------------------------------
			
			// Activity II - Create a stacked area chart
			
			// Activity V - add a click listener for area layers

			// Activity IV - Add tooltip events on the area paths
		
			categories.exit().remove();
			
			// Call axis functions with the new domain 
			g.select(".x-axis").call(xAxis);
			g.select(".y-axis").call(yAxis);
			
		});
	}
	chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
	};

	// Activity V - allow users to register for your custom events 

	function handleClick(d,i){
		// Activity V - call registered callbacks and pass the category info
	}
	return chart;
	
}
