// Exercise 6

// Listener for validation button
document.getElementById("validate").addEventListener("click", validate);

// Export using Module
export function validate() {
  let error = 0;
  // Get the input fields
  const fName = document.getElementById("fName");
  const fLastN = document.getElementById("fLastN");
  const fEmail = document.getElementById("fEmail");
  const fPassword = document.getElementById("fPassword");
  const fPhone = document.getElementById("fPhone");

  // Get the error elements
  const errorName = document.getElementById("errorName");
  const errorLastN = document.getElementById("errorLastN");
  const errorEmail = document.getElementById("errorEmail");
  const errorPassword = document.getElementById("errorPassword");
  const errorPhone = document.getElementById("errorPhone");

  validate3characters();
  validateNameAndLastN();
  validatePhone();
  validatePassword();
  validateEmail();
  // Validate fields entered by the user: name, phone, password, and email
  // Validate at least 3 characters
  function validate3characters() {
    const userInputs = document.querySelectorAll('[id^="f"]');
    userInputs.forEach((input) => {
      if (input.value.match(/^([a-z0-9]*[a-z]){3}[a-z0-9]*$/i)) {
      } else {
        input.classList.add("is-invalid");
        error++;
      }
    });
  }

  // Validate only letters
  function validateNameAndLastN() {
    if (fName.value.match(/^[A-Za-z\s]*$/)) {
    } else {
      fName.classList.add("is-invalid");
      error++;
    }
    if (fLastN.value.match(/^[A-Za-z\s]*$/)) {
    } else {
      fLastN.classList.add("is-invalid");
      error++;
    }
  }

  // Validate only numbers (9 digits)
  function validatePhone() {
    if (fPhone.value.match(/^\d{9}$/)) {
    } else {
      fPhone.classList.add("is-invalid");
      error++;
    }
  }

  // Validate only numbers AND letters
  function validatePassword() {
    if (fPassword.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
    } else {
      fPassword.classList.add("is-invalid");
      error++;
    }
  }

  // Validate Email is fully compliant with the RFC-2822 spec.
  function validateEmail() {
    if (
      fEmail.value.match(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
      )
    ) {
    } else {
      fEmail.classList.add("is-invalid");
      error++;
    }
  }

  if (error > 0) {
    alert("Error");
  } else {
    alert("OK");
  }
}
