(function(t){

	var form = document.forms[0];

	form.onsubmit = function(e){

		var id = form.revealid.value,
			link = form.reveallink.value,
			selected_text = t.getWindowArg('selected_text'),
			output = '';


		if(!id){
			alert("An ID is required.");
			e.preventDefault();
			return;
		}

		// Build new output string
		output = '[reveal id="' + id + '"';

		if (link) output += ' link="' + link + '" ';

		output += ']' + selected_text + '[/reveal]';

		// Insert the contents from the input into the document
		t.editor.execCommand('mceInsertContent', false, output);
		t.close();
	};

	form.onreset = function(e){
		t.close();
		e.preventDefault;
	};

})(tinyMCEPopup);
