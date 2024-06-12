var COLOR = ["#3d7cb1", "#ff4500", "#32ff01", "#1f4f0f", ""];

function createNewElement(name, desc, type, data, optNames)
{
	var container = document.getElementById("container");
	var child = container.lastElementChild;
	var idx = container.children.length-1;

	var clone = child.cloneNode(true);
	clone.id = "question_" + idx;

	container.appendChild(clone);

	setQuestion(idx, name, desc, type, data, optNames);
}

function setQuestion(idx, name, desc, type, data, optNames)
{
	var question = document.getElementById("question_" + idx);

	question.querySelector(".question_name").innerText = name;
	question.querySelector(".description").innerText = desc;
	question.querySelector("select").setAttribute("onchange", "changeType(" + idx + ", -1)");

	changeType(idx, type);

	var isGraph = type < 2;
	if(isGraph) drawGraphs(idx, data, optNames);
	else setAnswers(idx, data);
}

function changeType(idx, type)
{
	var question = document.getElementById("question_" + idx);
	var change = question.querySelector(".result_change_type");
	var select = question.querySelector("select");
	var bar = question.querySelector(".barGraph");
	var pie = question.querySelector(".pieChart");
	var ans = question.querySelector(".answers");
	
	if(type < 0)
	{
		var selected = select.selectedIndex;

		bar.style.display = selected == 0 ? "block" : "none";
		pie.style.display = selected == 1 ? "block" : "none";
	}
	else
	{
		var isGraph = type < 2;
		if(isGraph)
		{
			select.selectedIndex = type;
		}

		change.style.display = isGraph ? "block" : "none";
		bar.style.display = type == 0 ? "block" : "none";
		pie.style.display = type == 1 ? "block" : "none";
		ans.style.display = type == 2 ? "block" : "none";
	}
}

function drawGraphs(idx, data, optNames)
{
	drawBarGraph(idx, data, optNames);
	drawPieChart(idx, data, optNames);
}

function setAnswers(idx, data)
{
	var question = document.getElementById("question_" + idx);
	var answers = question.querySelectorAll(".answer");

	var length = data.length;
	for(var i=0; i<length; i++)
	{
		if(answers.length == i)
		{
			var child = answers[i-1];
			var clone = child.cloneNode(true);

			child.after(clone);
			answers = question.querySelectorAll(".answer");
		}
		answers[i].innerText = data[i];
	}
}

function drawBarGraph(idx, data, optNames)
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
		var containers = barGraph.querySelectorAll(".bar-container");
		var optionContainer = containers[i];

		var option = optionContainer.querySelector(".bar_option");
		option.innerText = optNames[i];

		var canvas = optionContainer.querySelector(".bar_body");
		var context = canvas.getContext("2d");
		var percentage = data[i] / total * 100;

		context.clearRect(0, 0, 500, 70);

		context.fillStyle = COLOR[i];
		context.fillRect(0, 0, 5 * percentage, 70);

		var pp = optionContainer.querySelector(".bar_percentage");
		pp.innerText = data[i] + "(" + (data[i]==0 ? "0" : percentage.toFixed(1)) + "%)";
	}
}

function drawPieChart(idx, data, optNames) {
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
		var pies = pieChart.querySelectorAll(".chart_option");
		var option = pies[i];

		var optionCircle = option.querySelector(".option_circle");
		optionCircle.innerText = optNames[i];

		var circle = option.querySelector(".option_circle");
		circle.style = "background-color: " + COLOR[i] + ";";

		var pp = option.querySelector(".chart_percentage");
		pp.innerText = data[i] + "(" + (data[i] / total * 100).toFixed(1) + "%)";
	}
}