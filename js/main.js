import StackedAreaChart from './StackedAreaChart.js';
import Timeline from './Timeline.js';

// Will be used to the save the loaded JSON data
let yearData, categoryData;
var dataCategories;

// Date parser to convert strings to date objects
let parseDate = d3.timeParse("%Y");

// Variables for the visualization instances
// Activity I - Create a stacked area chart
let stackChart = StackedAreaChart()
	.on('selectCategory', onSelectCategory);

// Activity V - register for the category selection event


// Activity III - Create a timeline chart
let timeline = Timeline()
	.on('brushed', onBrushRange); // register your custom callback, brushed


// Will be used to the save filter variables
let filterCategory, filterRange;
let color = d3.scaleOrdinal(d3.schemeCategory10);

// Start application by loading the data
Promise.all([ // load multiple files
	d3.csv('data/per_year.csv', d=>{
		d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
		d.Year = parseDate(d.Year.toString());
		return d;
	}),
	d3.csv('data/per_category.csv', d=>{
		Object.keys(d).forEach(key=>{
			if (key != "Year") {
				d[key] = parseFloat(d[key]) * 1.481105 / 100;
			} else if(key == "Year") {
				d[key] = parseDate(d[key].toString());
			}
		})
		return d; 
	})
]).then(data=>{
	yearData = data[0];
	categoryData = data[1];

	dataCategories = data.length>0?Object.keys(data[0]).filter(d=>d!=="Year"):[];
	color.domain(dataCategories);
	// Activity I - Call the stacked area chart
	d3.select('#stacked-area-chart')
	.datum(categoryData)// only single item, so datum not data
	.call(stackChart)
	
	// Activity III - Call the timeline chart
	d3.select('#timeline')
		.datum(yearData) // per year data
		.call(timeline);

})

function donothing(){
	console.log('doing nought');
}
// callback for selecting a category in the stack area chart
let ret =0;
let recent =0;
function onSelectCategory(d,i){
	if (ret==0){
		// if (recent ==1){
		// 	filterCategory = filterCategory===d?null:d;
		// 	recent =0;
		// }
		// filterCategory = filterCategory===d?null:d; // toggle the filter to go back to all categories
		let filtered = filterCategoryData(d, filterRange);
		d3.select('#stacked-area-chart')
			.datum(filtered)
			.call(stackChart)
			.style("fill", color(i)) // assign color

		d3.selectAll(".area").style("fill", color(i)) // assign color
		ret =1;
	}
	else{
		let filtered = filterCategoryData(null, filterRange);
		d3.select('#stacked-area-chart')
		.datum(filtered)// only single item, so datum not data
		.call(stackChart)
		.style("fill", "black") // assign color

		d3.selectAll(".area") .style("fill", (d,i)=>color(dataCategories[i])) // assign color
		ret =0;
		recent=1;
	}
}


// callback for brushing on the timeline
function onBrushRange(yearRange) {
		// d3.select('#stacked-area-chart')
		// .datum(categoryData)// only single item, so datum not data
		// .call(stackChart)
		// .style("fill", "black") // assign color

		// d3.selectAll(".area") .style("fill", (d,i)=>color(dataCategories[i])) // assign color
		
		filterRange = yearRange;
		// filter data based on the brush range
		let filtered = filterCategoryData(null, filterRange); 
	
		// // Redraw Stacked Area Chart
		d3.select('#stacked-area-chart')
			.datum(filtered)
			.call(stackChart);
		// d3.selectAll(".area") .style("fill", (d,i)=>color(dataCategories[i]))

	// }
	
}

// check if a year is within the year range
function within(d, range){
	return d.getTime()>=range[0].getTime()&&d.getTime()<=range[1].getTime();
}

// filter category data based on a specific category (if any) and year range
function filterCategoryData(category, dateRange){
	let filtered = dateRange?categoryData.filter(d=>within(d.Year, dateRange)): categoryData;
	filtered = filtered.map(row=>{
		return category?{
			Year:row.Year,
			[category]:row[category]
		}:row;
	});
	return filtered;
}
