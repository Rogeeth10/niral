// Vocabulary data (without "Pernicious")
const vocabularyData = {
    'Eloquent': 'Eloquent means fluent or persuasive in speaking or writing. Example: "Her eloquent speech moved everyone."',
    'Serendipity': 'Serendipity means the occurrence of events by chance in a happy or beneficial way. Example: "It was pure serendipity that we met at the same café."',
    'Ephemeral': 'Ephemeral means lasting for a very short time. Example: "The beauty of the sunset was ephemeral."',
    'Lugubrious': 'Lugubrious means looking or sounding sad and dismal. Example: "His lugubrious expression suggested trouble."',
    'Quixotic': 'Quixotic means extremely idealistic, unrealistic, and impractical. Example: "His quixotic plans to change the world were unrealistic."'
  };
  
  // Get the DOM elements for chat, user input field, and record button
  let chatContent = document.getElementById('chat-content');
  let userInputField = document.getElementById('user-text');
  let recordBtn = document.getElementById('record-btn');
  
  let selectedTopic = ''; // Track the selected topic
  let step = 0; // Track current step in the conversation
  
  // Audio recording variables
  let isRecording = false;
  let mediaRecorder;
  let audioChunks = [];
  let audioUrl;
  let audio;
  
  // Start the chat with a greeting
  function startChat() {
    chatContent.innerHTML = `
      <div class="message bot-message">
        <span>Hello, How can I assist you?</span>
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
  
      // If user types "No", stop the conversation and show the thank you message
      if (userInput === 'no') {
        stopProcess();
      } else {
        // Handle different steps based on the user's input
        setTimeout(() => {
          if (step === 0) {
            botMessage('Great! Let me show you some vocabulary. Please wait...');
            displayVocabularyTopics();
            step = 1;
          } else if (step === 1 && (userInput === 'yes' || userInput === 'no')) {
            handleExplanationChoice(userInput);
            step = 2;
          } else if (step === 2 && userInput === 'yes') {
            displayVocabularyTopics(); // Show vocabulary topics again if user wants to learn more
            step = 1;
          } else {
            botMessage('Please type "I need to learn" to begin.');
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
  
  // Display rotating cube loading animation before showing vocabulary topics
  function displayVocabularyTopics() {
    let loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    chatContent.appendChild(loadingSpinner);
  
    setTimeout(() => {
      chatContent.removeChild(loadingSpinner);
      let topics = Object.keys(vocabularyData);
      botMessage('Here are some vocabulary topics: Click a topic to start learning.');
  
      let topicGrid = document.createElement('div');
      topicGrid.classList.add('topic-grid');
  
      topics.forEach(topic => {
        let topicButton = document.createElement('button');
        topicButton.textContent = topic;
        topicButton.onclick = () => selectVocabulary(topic);
        topicGrid.appendChild(topicButton);
      });
  
      chatContent.appendChild(topicGrid);
    }, 3000); // Increased delay before displaying topics
  }
  
  // Select and display the chosen vocabulary with delay
  function selectVocabulary(topic) {
    selectedTopic = topic; // Store the selected topic
    let selectedMessage = document.createElement('div');
    selectedMessage.classList.add('message', 'user-message');
    selectedMessage.innerHTML = `<span>${topic}</span>`;
    chatContent.appendChild(selectedMessage);
  
    setTimeout(() => {
      botMessage(vocabularyData[topic]);
      botMessage('Would you like to learn more? (Type Yes or No)');
    }, 2000); // Increased delay before showing the "learn more" question
  }
  
  // Handle the explanation choice ("Yes" or "No")
  function handleExplanationChoice(choice) {
    if (choice === 'yes') {
      // Only display vocabulary without extra text
      botMessage(vocabularyData[selectedTopic]);
    } else {
      botMessage('Ok, thanks for your reply. When you need assistance, feel free to ask.');
      stopProcess(); // End conversation if user doesn't want to learn more
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
  
  // Audio recording functionality
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
  
        let chunks = [];
        mediaRecorder.ondataavailable = function(event) {
          chunks.push(event.data);
        };
  
        mediaRecorder.onstop = function() {
          let blob = new Blob(chunks, { type: 'audio/wav' });
          audioUrl = URL.createObjectURL(blob);
          audio = new Audio(audioUrl);
          playRecording();
        };
      })
      .catch(error => {
        console.error('Error accessing microphone: ', error);
      });
  }
  
  function playRecording() {
    audio.play();
  
    audio.onended = function() {
      botMessage('There were some errors in your speech.');
    };
  
    let userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<span>Audio Message</span>`;
    chatContent.appendChild(userMessage);
  }
  
  // Initialize chat on page load
  window.onload = startChat;
  