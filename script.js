		   		function runSpeechRecognition() {
		        // get output div reference
		        var output = document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("action");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
				recognition.lang = "de-DE";
				//recognition.continuous = 'true';
            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    action.innerHTML = "<small>Ich höre zu, bitte sprechen...</small>";
                };
                
                recognition.onspeechend = function() {
                    action.innerHTML = "<small>Aufnahme abgeschlossen. Ich hoffe, dass du zurieden bist.</small>";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript; 
                    var confidence = event.results[0][0].confidence;
					
                    //output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
                    //output.classList.remove("hide");
					if (transcript  == "Firma" | transcript == "Unternehmen")  {
						window.location.href = "https://www.perfact.de";
					}
					if (transcript == "wie spät ist es" | transcript == "Uhrzeit" | transcript == "Zeit") {
						speakUhrzeit();
					}
					if (transcript == "test") {
						runTest();
					}
						
					console.log(transcript);
                };
				
				recognition.onerror = function() {
					output.innerHTML = "<b>Ich habe nichts verstanden. Bitte erneut versuchen!</b>";
				}
				
              	document.getElementById('cancel').onclick = function() {
					console.log("Aufnahme abgebrochen");
					recognition.stop();
					action.innerHTML = "<small>Aufnahme abgebrochen!</small>";
					
				};
                 // start recognition
                recognition.start();
			
					}
	
				function speakUhrzeit(){
				date = new Date();
				stunde = date.getHours();
				minute = date.getMinutes();
				var speaker = new SpeechSynthesisUtterance();
				speaker.text = 'Es ist' + stunde + 'Uhr und' + minute + 'Minuten';
				speaker.lang = 'de-DE';
				if (minute < 10) {
					time.innerHTML = 'Es ist' + " " +  stunde + ":" + "0" + minute + " " + "Uhr";}
				else {
					time.innerHTML = 'Es ist' + " " +  stunde + ":" + minute + " " + "Uhr";}
				speechSynthesis.speak(speaker);
				}

				function searchURL() {
					
				}

				function runAbschicken() {
					var text = document.getElementById("data").value;
					if (text  == "Firma" | text == "Unternehmen")  {
						window.location.href = "https://www.perfact.de";
					}
					
					
					if (text == "wie spät ist es" | text == "Uhrzeit" | text == "Zeit") {
						speakUhrzeit();
					}
					
					if (text == "test") {
						runTest();
					}
					
				}
				

				function understanding_error() {
				action.innerHTML = "Ich habe dich leider nicht verstanden!"
				}

				function runTest() {
					speaker = new SpeechSynthesisUtterance();
					speaker.text = 'Alle Systeme funktionieren einwandfrei.'
					speechSynthesis.speak(speaker);
					time.innerHTML = "Alle Systeme funktionieren einwandfrei."
				}