function createNewElement(name, desc)
{
	var container = document.getElementById("container");
	var child = container.lastElementChild;
	var idx = container.children.length-1;

	var clone = child.cloneNode(true);
	clone.id = "question_" + idx;

	container.appendChild(clone);

	setQuestion(idx, name, desc);
}

function setQuestion(idx, name, desc)
{
	var question = document.getElementById("question_" + idx);

	question.querySelector(".create_question_name").innerText = name;
	question.querySelector(".description").innerText = desc;

	question.querySelector("select").setAttribute("onchange", "changeOptionType("+idx+")");
	question.querySelector(".addOption").setAttribute("onclick", "addOption("+idx+")");
	question.querySelector(".addEtc").setAttribute("onclick", "addEtc("+idx+")");
	question.querySelector(".addEtc").setAttribute("value", "기타 추가");
	question.querySelector(".etc").style.display = "none";

	var rmv = question.querySelector(".removeQuestion");
	if(idx == 0) rmv.style.display = "none";
	else rmv.setAttribute("onclick", "removeQuestion("+idx+")");	

	changeOptionType(idx);
}

function changeOptionType(idx)
{
	var question = document.getElementById("question_" + idx);

	var type = question.querySelector("select").selectedIndex;

	var options = question.querySelector(".options");
	var etc = question.querySelector(".etc");
	var addButtons = question.querySelector(".addButtons");
	var answer = question.querySelector(".answer");
	var longAnswer = question.querySelector(".long_answer");
	var star = question.querySelector(".star-rating");

	options.style.display = addButtons.style.display =
	answer.style.display = longAnswer.style.display =
	star.style.display = "none";
	if(type < 2)
	{
		options.style.display = "block";
		addButtons.style.display = "block";

		if(question.querySelector(".addEtc").getAttribute("value") == "기타 제거")
			etc.style.display = "block";

		var inputType = type == 1 ? "checkbox" : "radio";		
		var inputs = question.querySelectorAll(".optionBtn");
		inputs.forEach(input => { input.type = inputType; });
	}
	else
	{
		etc.style.display = "none";

		if(type == 2) answer.style.display = "block";
		else if(type == 3) longAnswer.style.display = "block";
		else star.style.display = "block";
	}
}

function addOption(idx)
{
	var question = document.getElementById("question_" + idx);

	var options = question.querySelector(".options");
	var length = options.children.length-1;
	if(length > 3)
	{
		alert("5개");
		return;
	}
	var lastOption = options.lastElementChild;
	
	var newNode = lastOption.cloneNode(true);
	newNode.children[1].placeholder = "옵션 " + (length+2);
	lastOption.after(newNode);
}

function addEtc(idx)
{
	var question = document.getElementById("question_" + idx);
	var etc = question.querySelector(".etc");

	var isBlock = etc.style.display == "block";
	etc.style.display = isBlock ? "none" : "block";
	question.querySelector(".addEtc").setAttribute("value", isBlock ? "기타 추가" : "기타 제거");
}

function removeQuestion(idx)
{
	var q = document.getElementById("question_" + idx);
	q.remove();
}

function showSidebar()
{
	document.querySelector(".small_menu").style.display = "block";
	document.getElementById("showSidebar").style.display = "none";
}

function hideSidebar()
{
	document.querySelector(".small_menu").style.display = "none";
	document.getElementById("showSidebar").style.display = "block";
}

function showSection(idx)
{
	var sections = document.querySelectorAll(".menu_section");
	for(var i=0; i<sections.length; i++)
		sections[i].style.display = idx == i ? "block" : "none";
}