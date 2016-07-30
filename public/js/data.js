var socket;
var randomgraph;
window.onload = function() {
	socket = io();
	console.log(socket);

	//Distance travelled 
	var distanceGraphCanvas = document.getElementById('distanceGraph').getContext('2d');
		type = 'bar',
    	data = {
		labels: ["<2m", "2-4m", "4-6m", "6-8m", ">8m"],
		datasets: [{
			label: "Total Distance Travelled",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            data: [0, 0, 0, 0, 0],
        }]
    };

    distanceGraph = new Chart(distanceGraphCanvas).Bar(data, {animationSteps: 15});
 
    socket.on('random', function (data) {
		var distancetobargraph = (Math.max(0, Math.round((data/2))-1));
		distanceGraph.datasets[0].bars[distancetobargraph].value += 1;
		//console.log(distanceGraph.datasets);
		distanceGraph.update();
	});

    // Recent deaths in the past second
    var recentdeathsGraphCanvas = document.getElementById('recentdeathsGraph').getContext('2d');
		type = 'line',
    	data = {
		labels: [ 0],
		datasets: [{
		    label: '# of deaths',
		    data: [1],
		    fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
		}]
	    },
	    options = {
		scales: {
		    yAxes: [{
			ticks: {
			    beginAtZero:true
			}
		    }]
		}
	    };
	
	recentdeathsGraph = new Chart(recentdeathsGraphCanvas).Line(data, {animationSteps:15});

	var timepassedfordeaths = 0;

	socket.on('random', function (data) {
//		console.log(data)
	
		timepassedfordeaths += 1;
		recentdeathsGraph.addData([data], timepassedfordeaths);
		console.log(recentdeathsGraph.datasets[0].points.length);
		if (recentdeathsGraph.datasets[0].points.length == 6)
		{
		recentdeathsGraph.removeData();
		}
		else
		{

		}
	});
	// Team composition pie chart
	var teamcompGraphCanvas = document.getElementById('teamcompGraph');
		type = 'pie',
    	data = {
		labels: ["Red", "Blue", "Yellow"],
		datasets: [
        {
        	// Change the data for this - should be assigned a team each person
            data: [100, 100, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    };

    teamcompGraph = new Chart(teamcompGraphCanvas).Pie(data, {animationSteps: 15});
 
    socket.on('random', function (data) {
		var teammemberslost = (Math.round(data));
		console.log(teamcompGraph.datasets[0]);
		/*
		teamcompGraph.datasets[0].bars[distancetobargraph].value += 1;
		//console.log(distanceGraph.datasets);
		distanceGraph.update();
		*/
	});
}
