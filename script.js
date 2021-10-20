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
                    output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
                    output.classList.remove("hide");
					if (transcript == "Firma") {
						window.location.href = "https://www.perfact.de";
					}
					if (transcript == "wie spät ist es" | transcript == "Uhrzeit") {
						speakUhrzeit();
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
				output.innerHTML = 'Es ist' + " " +  stunde + " " + 'Uhr und' + " " + minute + " " + 'Minuten.';
				speechSynthesis.speak(speaker);
				}