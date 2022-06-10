function serialGenV1ByTheJoker(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET','db-action.php?action=serialGen');
	xhr.send(null);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == xhr.DONE){
			var rep = xhr.responseText;
			rep = JSON.parse(rep);
			serial = complete4digit(rep[0]);
			serial += "." + complete4digit(rep[1]);
			serial += "." + complete4digit(rep[2]);
			serial += "." + complete4digit(rep[3]);
			serial += "." + complete4digit(rep[4]);

			$('#serial').val(serial);
		}
	}
}

function complete4digit(number){
	n = "";
	n += number;
	while(n.length < 4){
		n = "0" + n;
	}
	return n;
}

function verifySerialGenV1ByTheJoker(){
	var xhr = new XMLHttpRequest();
	serial = $('#serial-verify').val();
	xhr.open('GET','db-action.php?action=serialVerify&serial='+serial);
	xhr.send(null);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == xhr.DONE){
			var rep = xhr.responseText;
			console.log(rep);
			rep = JSON.parse(rep);
			if(rep == true)
				alert("ok");
			else
				alert("wrong");
		}
	}
}