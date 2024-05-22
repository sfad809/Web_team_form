createQuestion();

function createQuestion() {
	var container = document.getElementById("container");
	var length = container.children.length-1;
	if(length > 5)
	{
		alert("6개");
		return;
	}

	var clone = document.createElement("iframe");
	clone.id = "question_" + length;
	clone.className = "question_frame";
	clone.src = "element_question.html";

	container.appendChild(clone);
}