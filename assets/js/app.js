function CallHassan(){
    const phoneNumber = '+256769643744'
    const phoneLink = document.querySelector('.phone')


    phoneLink.addEventListener('click', async() => {
        window.location.href = `tel:${phoneNumber}`;
    })
}

// function SendMessage(e) {
//     e.preventDefault();

//     const name = document.querySelector('#contact-name').value;
//     const subject = document.querySelector('#contact-subject').value;
//     const phoneNumber = document.querySelector('#contact-phone').value;
//     const email = document.querySelector('#contact-email').value;
//     const message = document.querySelector('#contact-message').value;

//     console.log({ name, phoneNumber, email, subject, message });

//     // EmailJS (initialize with your public key first)
//     emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
//         from_name: name,
//         subject: subject,
//         phone: phoneNumber,
//         reply_to: email,
//         message: message,
//     })
//     .then(() => {
//         alert('Message sent successfully!');
//         document.querySelector('#contact-form').reset();
//     })
//     .catch((error) => {
//         console.error('EmailJS Error:', error);
//         alert('Failed to send message.');
//     });
// }

function SendMessage(e) {
    e.preventDefault();

    const name = document.querySelector('#contact-name').value;
    const subject = document.querySelector('#contact-subject').value;
    const phoneNumber = document.querySelector('#contact-phone').value;
    const email = document.querySelector('#contact-email').value;
    const message = document.querySelector('#contact-message').value;

    console.log({ name, phoneNumber, email, subject, message });

    // Submit to FormSubmit
    const form = document.querySelector('#contact-form');
    form.action = 'https://formsubmit.co/hassanprogrammer256@gmail.com';
    form.method = 'POST';
    form.submit();
}




// Global validation state
let formValid = {
    name: false,
    email: false,
    message: false,
    phone: true,  // optional field
    subject: true  // optional field
};

// Validate Name
function validateName() {
    const nameInput = document.querySelector('#contact-name');
    const nameError = document.querySelector('#name-error');
    const nameCount = document.querySelector('#name-count');
    const nameValue = nameInput.value.trim();
    
    // Character counter
    const length = nameValue.length;
    nameCount.textContent = `${length}/50 characters`;
    
    if (length > 50) {
        nameInput.value = nameValue.slice(0, 50);
        nameCount.textContent = `50/50 characters`;
    }
    
    // Validation
    if (nameValue === '') {
        nameError.style.display = 'block';
        nameInput.classList.add('error');
        nameInput.classList.remove('valid');
        formValid.name = false;
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.style.display = 'block';
        nameInput.classList.add('error');
        nameInput.classList.remove('valid');
        formValid.name = false;
        return false;
    } else {
        nameError.style.display = 'none';
        nameInput.classList.remove('error');
        nameInput.classList.add('valid');
        formValid.name = true;
        return true;
    }
}

// Validate Email
function validateEmail() {
    const emailInput = document.querySelector('#contact-email');
    const emailError = document.querySelector('#email-error');
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    
    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        formValid.email = false;
        return false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Enter a valid email (e.g., name@example.com)';
        emailError.style.display = 'block';
        emailInput.classList.add('error');
        emailInput.classList.remove('valid');
        formValid.email = false;
        return false;
    } else {
        emailError.style.display = 'none';
        emailInput.classList.remove('error');
        emailInput.classList.add('valid');
        formValid.email = true;
        return true;
    }
}

// Format Phone Number (onchange)
function formatPhoneNumber() {
    const phoneInput = document.querySelector('#contact-phone');
    let phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove non-digits
    
    if (phoneValue.length > 0) {
        // Format as +XXX XXX XXX XXX
        if (phoneValue.length === 12 && phoneValue.startsWith('256')) {
            phoneValue = phoneValue.replace(/(256)(\d{2})(\d{2})(\d{3})/, '+$1 $2 $3 $4');
        } else if (phoneValue.length === 10) {
            phoneValue = phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        phoneInput.value = phoneValue;
    }
}

// Validate Phone
function validatePhone() {
    const phoneInput = document.querySelector('#contact-phone');
    const phoneError = document.querySelector('#phone-error');
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    console.log({phoneValue})
    
    if (phoneValue.length > 0 && phoneValue.length < 10) {
        
        phoneError.style.display = 'block';
        phoneInput.classList.add('error');
        phoneInput.classList.remove('valid');
        formValid.phone = false;
        return false;
    } else {
        phoneError.style.display = 'none';
        phoneInput.classList.remove('error');
        if (phoneValue.length > 0) phoneInput.classList.add('valid');
        formValid.phone = true;
        return true;
    }
}

// Validate Subject
function validateSubject() {
    updateSubjectCount();
    return true;
}

function updateSubjectCount() {
    const subjectInput = document.querySelector('#subject');
    const subjectCount = document.querySelector('#subject-count');
    let subjectValue = subjectInput.value;
    
    if (subjectValue.length > 100) {
        subjectInput.value = subjectValue.slice(0, 100);
        subjectValue = subjectInput.value;
    }
    
    subjectCount.textContent = `${subjectValue.length}/100 characters`;
}

// Validate Message
function validateMessage() {
    const messageInput = document.querySelector('#contact-message');
    const messageError = document.querySelector('#message-error');
    const messageValue = messageInput.value.trim();
    
    if (messageValue === '') {
        messageError.style.display = 'block';
        messageInput.classList.add('error');
        messageInput.classList.remove('valid');
        formValid.message = false;
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageError.style.display = 'block';
        messageInput.classList.add('error');
        messageInput.classList.remove('valid');
        formValid.message = false;
        return false;
    } else {
        messageError.style.display = 'none';
        messageInput.classList.remove('error');
        messageInput.classList.add('valid');
        formValid.message = true;
        return true;
    }
}

function updateMessageCount() {
    const messageInput = document.querySelector('#contact-message');
    const messageCount = document.querySelector('#message-count');
    let messageValue = messageInput.value;
    
    if (messageValue.length > 500) {
        messageInput.value = messageValue.slice(0, 500);
        messageValue = messageInput.value;
    }
    
    messageCount.textContent = `${messageValue.length}/500 characters`;
    validateMessage(); // Re-validate on input
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.querySelector('#submit');
    if (formValid.name && formValid.email && formValid.message && formValid.phone && formValid.subject) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Call this after each validation
function checkFormValidity() {
    updateSubmitButton();
}

// Override validation functions to check overall form
const originalValidateName = validateName;
const originalValidateEmail = validateEmail;
const originalValidateMessage = validateMessage;
const originalValidatePhone = validatePhone;

validateName = function() {
    const result = originalValidateName();
    checkFormValidity();
    return result;
};

validateEmail = function() {
    const result = originalValidateEmail();
    checkFormValidity();
    return result;
};

validateMessage = function() {
    const result = originalValidateMessage();
    checkFormValidity();
    return result;
};

validatePhone = function() {
    const result = originalValidatePhone();
    checkFormValidity();
    return result;
};

// Send Message Function with EmailJS
function SendMessage(e) {
    e.preventDefault();
    
    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    const isPhoneValid = validatePhone();
    
    if (!isNameValid || !isEmailValid || !isMessageValid || !isPhoneValid) {
        alert('Please fix the errors before submitting.');
        return false;
    }
    
    // Get values
    const name = document.querySelector('#contact-name').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const phoneNumber = document.querySelector('#contact-phone').value.trim();
    const email = document.querySelector('#contact-email').value.trim();
    const message = document.querySelector('#contact-message').value.trim();
    
    console.log({ name, phoneNumber, email, subject, message });
    
    // Disable button and show loading
    const submitBtn = document.querySelector('#submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>SENDING...</span><i data-feather="loader"></i>';
    
    // Reinitialize feather icons for the loader
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    
    const serviceID = 'service_i1s8pwo';     
    const templateID = 'template_g7wcfmk';  
    const publicKey = 'hCFRg_pOhTKGZQze5';     
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phoneNumber,
        subject: subject,
        message: message,
        reply_to: email
    };
    
  
    emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('✓ Message sent successfully!');
            
            // Reset the form
            document.querySelector('#contact-form').reset();
            
            // Reset validation styles
            document.querySelectorAll('.form-control, textarea').forEach(field => {
                field.classList.remove('valid', 'error');
            });
            
            // Reset character counters
            const nameCount = document.querySelector('#name-count');
            const subjectCount = document.querySelector('#subject-count');
            const messageCount = document.querySelector('#message-count');
            if (nameCount) nameCount.textContent = '0/50 characters';
            if (subjectCount) subjectCount.textContent = '0/100 characters';
            if (messageCount) messageCount.textContent = '0/500 characters';
            
            // Reset form validation state
            formValid = { 
                name: false, 
                email: false, 
                message: false, 
                phone: true, 
                subject: true 
            };
            updateSubmitButton();
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('✗ Failed to send message. Error: ' + (error.text || 'Please try again.'));
        })
        .finally(function() {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Reinitialize feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    
    return true;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateSubmitButton();

});