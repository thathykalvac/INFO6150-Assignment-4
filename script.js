
    const form = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const dynamicCheckboxes = document.getElementById('dynamicCheckboxes');

    const fields = {
        title: document.getElementsByName('title'),
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        emailId: document.getElementById('emailId'),
        phoneNumber: document.getElementById('phoneNumber'),
        zipcode: document.getElementById('zipcode'),
        source: document.getElementsByName('source'),
        comments: document.getElementById('comments'),
        category: document.getElementById('category'),
        streetAddress1: document.getElementById('streetAddress1'),  
        streetAddress2: document.getElementById('streetAddress2')
    };

    const errors = {
        titleError: document.getElementById('titleError'),
        firstNameError: document.getElementById('firstNameError'),
        lastNameError: document.getElementById('lastNameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError'),
        zipcodeError: document.getElementById('zipcodeError'),
        sourceError: document.getElementById('sourceError'),
        commentsError: document.getElementById('commentsError'),
        streetAddress1Error: document.getElementById('streetAddress1Error'),  
        categoryError: document.getElementById('categoryError')
    };

    const validateField = (field, errorElement, regex, minLength, maxLength, errorMessage) => {
        const value = field.value.trim();
        if (value === '') {
            errorElement.textContent = 'This field is required.';
            return false;
        }
        if (minLength && value.length < minLength) {
            errorElement.textContent = `Minimum length is ${minLength} characters.`;
            return false;
        }
        if (maxLength && value.length > maxLength) {
            errorElement.textContent = `Maximum length is ${maxLength} characters.`;
            return false;
        }
        if (regex && !regex.test(value)) {
            errorElement.textContent = errorMessage;
            return false;
        }
        errorElement.textContent = '';
        return true;
    };

    const validateRadio = (radioGroup, errorElement) => {
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        errorElement.textContent = isChecked ? '' : 'Please select a title.';
        return isChecked;
    };

    const validateCheckbox = (checkboxGroup, errorElement) => {
        const isChecked = Array.from(checkboxGroup).some(checkbox => checkbox.checked);
        errorElement.textContent = isChecked ? '' : 'Please select at least one option.';
        return isChecked;
    };

    const validateForm = () => {
        const isValidTitle = validateRadio(fields.title, errors.titleError);
        const isValidFirstName = validateField(fields.firstName, errors.firstNameError, /^[a-zA-Z]+$/, 2, 50, 'Please enter a valid first name.');
        const isValidLastName = validateField(fields.lastName, errors.lastNameError, /^[a-zA-Z]+$/, 2, 50, 'Please enter a valid last name.');
        const isValidEmail = validateField(fields.emailId, errors.emailError, /^[^\s@]+@northeastern\.edu$/, null, null, 'Please enter a valid Northeastern email address.');
        const isValidPhone = validateField(fields.phoneNumber, errors.phoneError, /^\d{3}\d{3}\d{4}$/, null, null, 'Please enter a valid phone number (xxx-xxx-xxxx).');
        const isValidZipcode = validateField(fields.zipcode, errors.zipcodeError, /^\d{5}$/, null, null, 'Please enter a valid zipcode.');
        const isValidSource = validateCheckbox(fields.source, errors.sourceError);
        const isValidComments = validateField(fields.comments, errors.commentsError, null, 10, 200, 'Comments must be between 10 and 200 characters.');
        const isValidStreetAddress1 = validateField(fields.streetAddress1, errors.streetAddress1Error, null, 2, 100, 'Please enter a valid street address.');
        const isValidCategory = validateField(fields.category, errors.categoryError, null, null, null, 'Please select a category.');

        submitBtn.disabled = !(isValidTitle && isValidFirstName && isValidLastName && isValidEmail && isValidPhone &&
            isValidZipcode && isValidSource && isValidComments && isValidStreetAddress1 && isValidCategory);
    };

    Object.values(fields).forEach(field => {
        if (field.length) {  
            Array.from(field).forEach(radioCheckbox => {
                radioCheckbox.addEventListener('change', validateForm);
            });
        } else {
            field.addEventListener('input', validateForm);
        }
    });

    const handleCategoryChange = () => {
        dynamicCheckboxes.innerHTML = '';  
        const selectedCategory = fields.category.value;

        
        dynamicCheckboxes.innerHTML = `
            <label>Would you like to add extra feedback*?</label>
            <input type="checkbox" id="extraFeedback" onchange="toggleExtraFeedback()"/> Yes
            <br><br>
            <div id="extraFeedbackField"></div>`;
        

        validateForm();
    };

    const toggleExtraFeedback = () => {
        const extraFeedbackField = document.getElementById('extraFeedbackField');
        const extraFeedbackCheckbox = document.getElementById('extraFeedback');
        if (extraFeedbackCheckbox.checked) {
            extraFeedbackField.innerHTML = `
                <label for="extraFeedbackComments">Please provide additional feedback*:</label>
                <textarea name="extraFeedbackComments" id="extraFeedbackComments" rows="4" cols="25" required></textarea>
                <br>
                <span id="extraFeedbackError" class="error"></span>
                <br><br>
            `;
        } else {
            extraFeedbackField.innerHTML = '';  
        }

        validateForm();
    };

form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);


        let table = `<h3>Submitted Data:</h3><table border="1"><tr><th>Field</th><th>Value</th></tr>`;
        for (let [name, value] of formData) {
            table += `<tr><td>${name}</td><td>${value}</td></tr>`;
        }
        table += '</table>';
        document.getElementById('formDataTable').innerHTML = table;
        form.reset();
    });

