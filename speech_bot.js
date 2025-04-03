// Get the DOM elements for chat, user input field, and record button
let chatContent = document.getElementById('chat-content');
let userInputField = document.getElementById('user-text');
let recordBtn = document.getElementById('record-btn');

let step = 0; // Track current step in the conversation
let selectedStatement = ''; // Track the selected speech statement

// Audio recording variables
let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let audioUrl;
let audio;
let recordingStartTime = 0;

// Start the chat with a greeting
function startChat() {
  chatContent.innerHTML = `
    <div class="message bot-message">
      <span>Hello, How can I assist you today with a speech test?</span>
    </div>`;
}

// Handle user input with a delay
function handleUserInput() {
  let userInput = userInputField.value.trim().toLowerCase();

  if (userInput) {
    // Display user's message inline
    let userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<span>${userInput}</span>`;
    chatContent.appendChild(userMessage);

    userInputField.value = ''; // Clear input field

    if (userInput === 'no') {
      stopProcess();
    } else {
      setTimeout(() => {
        if (step === 0) {
          botMessage('Great! Let me show you some speech test statements. Please wait...');
          displaySpeechTestStatements();
          step = 1;
        } else if (step === 1 && (userInput === 'yes' || userInput === 'no')) {
          handleExplanationChoice(userInput);
          step = 2;
        } else if (step === 2 && userInput === 'yes') {
          displaySpeechTestStatements(); // Show 5 statements again
          step = 1; // Reset the step for a new session
        }
      }, 1500); // Increased delay time between interactions
    }
  }
}

// Stop the entire process and show the final message
function stopProcess() {
  botMessage('Ok, thanks for your reply. When you need assistance, feel free to ask.');
  step = 0; // Reset the step to stop further interaction
}

// Display rotating cube loading animation before showing speech test statements
function displaySpeechTestStatements() {
  let loadingSpinner = document.createElement('div');
  loadingSpinner.classList.add('loading-spinner');
  chatContent.appendChild(loadingSpinner);

  setTimeout(() => {
    chatContent.removeChild(loadingSpinner);
    botMessage('Here are some speech test statements:');

    let statements = [
      "Speech clarity is crucial for effective communication and understanding.",
      "Your accent or dialect should never hinder your ability to convey your message.",
      "Practicing speech rhythm and tone can improve your fluency in any language.",
      "Pronunciation is important, but overall speech clarity plays a significant role in comprehension.",
      "Engaging in speech exercises can significantly improve your confidence in communication."
    ];

    statements.forEach(statement => {
      let statementButton = document.createElement('button');
      statementButton.classList.add('button');
      statementButton.textContent = statement;
      statementButton.onclick = () => selectStatement(statement);
      chatContent.appendChild(statementButton);
    });
  }, 3000); // Increased delay before displaying the tips
}

// Select a speech test statement
function selectStatement(statement) {
  selectedStatement = statement;
  let selectedMessage = document.createElement('div');
  selectedMessage.classList.add('message', 'user-message');
  selectedMessage.innerHTML = `<span>${statement}</span>`;
  chatContent.appendChild(selectedMessage);

  setTimeout(() => {
    botMessage('Now, please read the statement and click "Record" to record your voice.');
  }, 1500); // Slight delay before instructing to record
}

// Handle recording functionality
function toggleRecording() {
  if (isRecording) {
    mediaRecorder.stop();
    recordBtn.innerText = 'Record'; // Reset button text
  } else {
    startRecording();
    recordBtn.innerText = 'Stop'; // Change button text
  }
  isRecording = !isRecording;
}

function startRecording() {
  // Get permission to access the microphone
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      recordingStartTime = Date.now(); // Track the start time

      let chunks = [];
      mediaRecorder.ondataavailable = function(event) {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = function() {
        let blob = new Blob(chunks, { type: 'audio/wav' });
        audioUrl = URL.createObjectURL(blob);
        audio = new Audio(audioUrl);
        evaluateRecording();
      };
    })
    .catch(error => {
      console.error('Error accessing microphone: ', error);
    });
}

// Evaluate the recording based on duration
function evaluateRecording() {
  let recordingDuration = (Date.now() - recordingStartTime) / 1000; // Convert to seconds

  // Automatically evaluate the recording duration, without showing intermediate messages
  if (recordingDuration < 5) {
    botMessage('Your speech needs improvement. Keep practicing!');
  } else if (recordingDuration >= 6) {
    botMessage('Excellent speech! Keep it up.');
  }

  setTimeout(() => {
    botMessage('Would you like to do another speech test? (Type Yes or No)');
  }, 2000); // Wait before asking to continue
}

// Handle user choice after recording
function handleExplanationChoice(choice) {
  if (choice === 'yes') {
    displaySpeechTestStatements(); // Restart the process by showing the 5 statements again
    step = 1; // Reset step for new session
  } else {
    stopProcess(); // End the session if the user says "No"
  }
}

// Display bot's message with a delay
function botMessage(message) {
  let botMessageDiv = document.createElement('div');
  botMessageDiv.classList.add('message', 'bot-message');
  botMessageDiv.innerHTML = `<span>${message}</span>`;
  chatContent.appendChild(botMessageDiv);
  chatContent.scrollTop = chatContent.scrollHeight; // Auto scroll to the latest message
}

// Add event listener for "Enter" key press on input field
userInputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default action (form submission, etc.)
    handleUserInput(); // Trigger the function when Enter is pressed
  }
});

// Initialize chat on page load
window.onload = startChat;
