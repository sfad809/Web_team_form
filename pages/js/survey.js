function createNewElement(name, desc, type, optNames)
{
	var form = document.querySelector("form");
	var idx = form.children.length-1;
	var child = form.children[idx-1];

	var clone = child.cloneNode(true);
	clone.id = "question_" + idx;

	child.after(clone);

	setQuestion(idx, name, desc, type, optNames);
}

function setQuestion(idx, name, desc, type, optNames)
{
	var questionID = "question_" + idx;
	var question = document.getElementById(questionID);

	question.querySelector(".question_name").innerText = name;
	question.querySelector(".description").innerText = desc;

	var options = question.querySelector(".options");
	var answer = question.querySelector(".answer");
	var area = question.querySelector(".long_answer");
	var star = question.querySelector(".star_rating");

	options.style.display =
	answer.style.display =
	area.style.display =
	star.style.display = "none";
	switch(type)
	{
	case 0: case 1:
		setOptions(idx, optNames, type==0);
		options.style.display = "block";
	break;
	case 2: case 3:
		if(type == 2)
		{
			answer.style.display = "block";
			answer.placeholder = optNames;
		}
		else
		{
			area.style.display = "block";
			area.placeholder = optNames;
		}
	break;
	default: star.style.display = "block"; break;
	}
}

function setOptions(idx, optNames, isCheckbox)
{
	var questionID = "question_" + idx;
	var question = document.getElementById(questionID);
	var options = question.querySelector(".options");

	var length = optNames.length;
	for(var i=0; i<length; i++)
	{
		var optionNames = options.querySelectorAll(".optionName");

		if(optionNames.length == i)
		{
			var opt = options.lastElementChild;

			var clone = opt.cloneNode(true);
			options.appendChild(clone);

			optionNames = options.querySelectorAll(".optionName");
		}
		optionNames[i].innerText = optNames[i];
	}
	
	options.querySelectorAll("input").forEach(
		input => { input.type = isCheckbox ? "checkbox" : "radio" });
}

function star(idx, value)
{
	var question = document.getElementById("question_" + idx);

	var stars = question.querySelectorAll(".star");
	for(var i=0; i<value; i++)
	{
		if(i >= stars.length) break;
		stars[i].checked = i < value;
	}
}