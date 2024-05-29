var COLOR = ["#3d7cb1", "#ff4500", "#32ff01", "#1f4f0f", ""];

function createNewElement(data, isBar)
{
	var container = document.getElementById("container");
	var child = container.lastElementChild;
	var idx = container.children.length-1;

	var clone = child.cloneNode(true);
	clone.id = "question_" + idx;

	container.appendChild(clone);

	drawBarGraph(idx, data);
	drawPieChart(idx, data);

	changeType(idx, isBar);
}

function changeType(idx, isBar)
{
	var question = document.getElementById("question_" + idx);
	var bar = question.querySelector(".barGraph");
	var pie = question.querySelector(".pieChart");

	if(isBar == true)
	{
		bar.style.display = "block";
		pie.style.display = "none";
	}
	else
	{
		bar.style.display = "none";
		pie.style.display = "block";
	}
}

function drawBarGraph(idx, data)
{
	var length = data.length;

	var total = 0;
	for(var i=0; i<length; i++)
		total += data[i];

	var question = document.getElementById("question_" + idx);
	var barGraph = question.querySelector(".barGraph");
	for(var i=0; i<length; i++)
	{
		if(barGraph.children.length == i)
		{
			var barContainer = barGraph.lastElementChild;

			var clone = barContainer.cloneNode(true);
			barGraph.appendChild(clone);
		}

		var option = barGraph.lastElementChild;

		var canvas = option.querySelector(".bar_body");
		var context = canvas.getContext("2d");
		var percentage = data[i] / total * 100;

		context.fillStyle = COLOR[i];
		context.fillRect(0, 0, 5 * percentage, 70);

		var pp = option.querySelector(".bar_percentage");
		pp.innerText = data[i] + "(" + percentage.toFixed(1) + "%)";
	}
}

function drawPieChart(idx, data) {
	var length = data.length;
	
	var total = 0;
	for(var i=0; i<length; i++)
		total += data[i];

	var question = document.getElementById("question_" + idx);
	var pieChart = question.querySelector(".pieChart");
	var options = pieChart.querySelector(".chart_options");

	var canvas = pieChart.querySelector(".pieChart_canvas");
	var context = canvas.getContext("2d");

	var startAngle = 0;
	var sliceAngle = 0;
	for(var i=0; i<length; i++)
	{
		sliceAngle = (data[i] / total) * 2 * Math.PI;
        
        context.beginPath();
        context.moveTo(250, 180); // 중심점
        context.arc(250, 180, 140, startAngle, startAngle + sliceAngle);
        context.closePath();

		context.fillStyle = COLOR[i];
        context.fill();

		startAngle += sliceAngle;

		if(options.children.length == i)
		{
			var pieOption = options.lastElementChild;

			var clone = pieOption.cloneNode(true);
			options.appendChild(clone);
		}

		var option = options.lastElementChild;

		var circle = option.querySelector(".option_circle");
		circle.style = "background-color: " + COLOR[i] + ";";

		var pp = option.querySelector(".chart_percentage");
		pp.innerText = data[i] + "(" + (data[i] / total * 100).toFixed(1) + "%)";
	}
}