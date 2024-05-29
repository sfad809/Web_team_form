function createNewElement()
{
	var container = document.getElementById("container");
	var child = container.lastElementChild;
	var idx = container.children.length-1;

	var clone = child.cloneNode(true);
	clone.id = "question_" + idx;

	container.appendChild(clone);

	clone.querySelector("select").setAttribute("onchange", "changeOptionType("+idx+")");
	clone.querySelector(".addOption").setAttribute("onclick", "addOption("+idx+")");

	changeOptionType(idx);
}

function addOption(idx) {
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

function changeOptionType(idx) {
	var question = document.getElementById("question_" + idx);

	var select = question.querySelector("select");
	var options = question.querySelector(".options");
	var answer = question.querySelector(".answer");
	var addButton = question.querySelector(".addOption");
	
	if(select.selectedIndex < 3)
	{
		if(answer.style.display != "none")
		{
			answer.style.display = "none";
			options.style.display = "block";
			addButton.style.display = "block";
		}
		var newType = select.selectedIndex == 1 ? "checkbox" : "radio";
		
		var inputs = options.querySelectorAll(".optionBtn");
		inputs.forEach(input => { input.type = newType; });
	}
	else
	{
		options.style.display = "none";
		addButton.style.display = "none";
		answer.style.display = "block";
	}
}