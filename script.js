const addBtn = document.querySelector(".add-btn");
const container = document.querySelector(".container");

// Function to add a new note
function appendTextArea(
  noteData = {title: "", text: "", isBold: false, isUpperCase: false, isItalic: false}
) {
  // Create a wrapper for the textarea and delete icon
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");

  // Create the title input element
  const title = document.createElement("input");
  title.classList.add("title");
  title.type = "text"; // Make it a text input for titles
  title.value = noteData.title; // Set the title if provided
  title.placeholder = "Title"; // Set the placeholder for the title

  // Create the textarea element
  const textArea = document.createElement("textarea");
  textArea.placeholder = "Text Goes Here"; // Set the placeholder for the textarea
  textArea.value = noteData.text; // Set the text if provided

  // Apply bold, uppercase, and italic states if saved as such
  if (noteData.isBold) {
    textArea.classList.add("bold-active"); // Apply bold styling if previously saved as bold
  }
  if (noteData.isUpperCase) {
    textArea.value = textArea.value.toUpperCase(); // Apply uppercase if saved as uppercase
  }
  if (noteData.isItalic) {
    textArea.classList.add("italic-active"); // Apply italic styling if previously saved as italic
  }

  // Create the delete icon element
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");

  // Create the bold button element
  const boldbtn = document.createElement("i");
  boldbtn.classList.add("fa-solid", "fa-bold", "bold-icon");

  // Create the uppercase toggle button
  const upperCase = document.createElement("i");
  upperCase.classList.add("fa-solid", "fa-u", "upper-icon");

  // Create the italic button element
  const italicbtn = document.createElement("i");
  italicbtn.classList.add("fa-solid", "fa-italic", "italic-icon");

  // Append title, textarea, delete icon, bold button, uppercase button, and italic button to note container
  noteContainer.appendChild(title);
  noteContainer.appendChild(textArea);
  noteContainer.appendChild(deleteIcon);
  noteContainer.appendChild(boldbtn);
  noteContainer.appendChild(upperCase);
  noteContainer.appendChild(italicbtn);

  // Append the note container to the main container
  container.appendChild(noteContainer);

  // Add event listener to delete the note with an animation
  deleteIcon.addEventListener("click", () => {
    // Add the fade-out class to trigger the animation
    noteContainer.classList.add("fade-out");

    // Wait for the animation to complete before removing the note
    setTimeout(() => {
      noteContainer.remove();
      saveNotes(); // Update localStorage when a note is deleted
    }, 300); // Match the timeout with the CSS transition duration (0.3s)
  });

  // Toggle bold class on the textarea when bold button is clicked
  boldbtn.addEventListener("click", () => {
    textArea.classList.toggle("bold-active");
    saveNotes();
  });

  // Toggle between uppercase and normal case
  let isUppercase = noteData.isUpperCase || false; // Track the current case
  upperCase.addEventListener("click", () => {
    if (isUppercase) {
      textArea.value = textArea.value.toLowerCase(); // Convert to lowercase
    } else {
      textArea.value = textArea.value.toUpperCase(); // Convert to uppercase
    }
    isUppercase = !isUppercase; // Toggle the case state
    saveNotes(); // Save the updated case
  });

  // Toggle italic class on the textarea when italic button is clicked
  italicbtn.addEventListener("click", () => {
    textArea.classList.toggle("italic-active");
    saveNotes();
  });

  // Save notes when title or text area content changes
  title.addEventListener("input", saveNotes);
  textArea.addEventListener("input", saveNotes);
}

// Function to save all note data (title, text, bold, uppercase, and italic states) to localStorage
function saveNotes() {
  const allNotes = document.querySelectorAll(".note-container");
  const notes = Array.from(allNotes).map((noteContainer) => {
    return {
      title: noteContainer.querySelector(".title").value,
      text: noteContainer.querySelector("textarea").value,
      isBold: noteContainer.querySelector("textarea").classList.contains("bold-active"),
      isUpperCase:
        noteContainer.querySelector("textarea").value ===
        noteContainer.querySelector("textarea").value.toUpperCase(),
      isItalic: noteContainer.querySelector("textarea").classList.contains("italic-active"),
    };
  });
  localStorage.setItem("notes", JSON.stringify(notes)); // Save the array of objects
}

// Function to load notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  if (savedNotes) {
    savedNotes.forEach((noteData) => appendTextArea(noteData)); // Add each saved note with title, bold, uppercase, and italic states
  }
}

// Load notes on page load
loadNotes();

// Event listener for the add button
addBtn.addEventListener("click", () => {
  appendTextArea(); // Add a new empty note with title
});
