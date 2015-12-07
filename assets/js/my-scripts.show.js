$(function () {
	// canvas
	var ctx = $("#graph").get(0).getContext("2d");
	var cW = $("#graph").width();
	var cH = $("#graph").height();	
	
	var dataBar = {
		labels: ["Odpowiedź 1", "Odpowiedź 2", "Odpowiedź 3", "Odpowiedź 4"],
		datasets: [
			{
				label: "przykładowy wykres",
				fillColor: "rgba(0,92,150,0.7)",
				strokeColor: "rgba(0,92,150,0.9)",
				highlightFill: "rgba(0,92,150,0.8)",
				highlightStroke: "rgba(0,92,150,1)",
				data: [65, 59, 80, 281]
			}
		]
	};
	
	var dataLine = {
		labels: ["Odpowiedź 1", "Odpowiedź 2", "Odpowiedź 3", "Odpowiedź 4"],
		datasets: [
			{
				label: "przykładowy wykres",
				fillColor: "rgba(0,92,150,0.1)",
				strokeColor: "rgba(0,92,150,0.9)",
				pointColor: "rgba(0,92,150,0.8)",
				pointStrokeColor: "rgba(0,92,150,0.8)",
				pointHighlightFill: "rgba(0,92,150,1)",
				pointHighlightStroke: "rgba(0,92,150,1)",
				data: [65, 59, 80, 281]
			}
		]
	};
	
	var dataPie = [
		{
			value: 65,
			color:"#F7464A",
			highlight: "#FF5A5E",
			label: "Odpowiedź 1"
		},
		{
			value: 59,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Odpowiedź 2"
		},
		{
			value: 80,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Odpowiedź 3"
		},
		{
			value: 281,
			color: "#FD1F5C",
			highlight: "#FF1F70",
			label: "Odpowiedź 4"
		}
	]
	var chart = new Chart(ctx).Bar(dataBar, {
		barValueSpacing: 50
	});
	
	// change chart type
	$('#chart-type').change(function(){
		if($(this).val() === "bar"){
			chart.destroy();
			chart = new Chart(ctx).Bar(dataBar, {
				barValueSpacing: 50
			});
		} else if($(this).val() === "line"){
			chart.destroy();
			chart = new Chart(ctx).Line(dataLine, {
				
			});
		} else if($(this).val() === "pie"){
			chart.destroy();
			chart = new Chart(ctx).Pie(dataPie, {
				
			});
		}
	});
	
});

