// set menu on mobile
const wrapperHeader = document.querySelector('.wrapper_header');
const btnMenu = document.querySelector('.menu_btn-menu');
const overlay = document.querySelector('.overlay');

btnMenu.addEventListener('click', function(e) {
    const classNameBtn = e.target;
    if(classNameBtn.classList.contains('fa-xmark')) {
       closeMenuHeader();
    } else {
       activeMenuHeader();
    }
});

overlay.addEventListener('click', function() {
    closeMenuHeader();
});

function closeMenuHeader() {
    wrapperHeader.classList.remove('active');
    wrapperHeader.querySelector('.menu_btn-menu i').setAttribute('class', 'fa-solid fa-bars');
}

function activeMenuHeader() {
    wrapperHeader.classList.add('active');
    wrapperHeader.querySelector('.menu_btn-menu i').setAttribute('class', 'fa-solid fa-xmark');
}

// validation form
const firstName = document.getElementById('first_name'),
    lastName = document.getElementById('last_name'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    inputCheckBox = document.querySelectorAll('.input_select input'),
    comment = document.getElementById('comment'),
    submitBtn = document.querySelector('.submit button');
const messageFirstName = "First name must be from 3 to 30 character",
    messageLastName = "Last name must be from 3 to 30 character",
    messageEmail = "Email is mandatory and valid.",
    messagePhone = "Phone number of 10 digits with no comma, no spaces.",
    messageComment = "Comment cannot be blank and has at least 20 characters.",
    messageInputCheckbox = "Interest at least one checkbox checked.";
// array to save all input to check, message show error of each and a string regex to check 
const inputsToValidate = [
    { element: firstName, message: messageFirstName, regex: /^.{3,30}$/ },
    { element: lastName, message: messageLastName, regex: /^.{3,30}$/ },
    { element: phone, message: messagePhone, regex: /^(0|\+84)[0-9]{9}$/ },
    { element: email, message: messageEmail, regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/ },
    { element: comment, message: messageComment, regex: /^.{20,}$/ }
];

// for each item in array input check when blur and when enter in input again clear show error
inputsToValidate.forEach(function(item) {
    item.element.addEventListener('blur', function() {
        checkInput(item.element, item.message, item.regex);
    })
    item.element.addEventListener('input', function() {
        const parentNode = item.element.parentElement.parentElement;
        parentNode.querySelector('.message_error').innerHTML = "";
    })
})

// check error of element if no match with regex call function show error and return false
// else return true and call function show success
function checkInput(ele, message, regex) {
    let messageError = '';
    if(ele.value.trim() == "") {
        messageError = `${ele.name} is required`;
    } else if(!ele.value.match(regex)) {
        messageError = message;
    } else {
        messageError = "";
    }

    if(messageError.trim().length != 0) {
        showErrorMessage(ele,messageError);
        return false;
    } else {
        handleSuccess(ele);
        return true;
    }
}

inputCheckBox.forEach(function(item) {
    item.addEventListener("click", function(){
        checkInputCheckbox(inputCheckBox);
    })
})

function checkInputCheckbox(elements) {
    let count = 0;
    elements.forEach(function(item) {
        if(item.checked) {
            count++;
        }
    });
    if(count == 0) {
        showErrorMessage(elements[0], messageInputCheckbox);
        return false;
    } else {
        showErrorMessage(elements[0], "");
        return true;
    }
}

function showErrorMessage(element, message) {
    const parentNode = element.parentElement.parentElement;
    parentNode.querySelector('.message_error').innerHTML = message;
    if(parentNode.querySelector('.input') && parentNode.querySelector('.input').classList.contains('success')) {
        parentNode.querySelector('.input').classList.remove('success');
    }
}

function handleSuccess(element) {
    const parentNode = element.parentElement.parentElement;
    parentNode.querySelector('.message_error').innerHTML = "";
    parentNode.querySelector('.input').classList.add('success');
}

submitBtn.addEventListener('click', function(e) {
    let isValid = true;
    inputsToValidate.forEach(function(item) {
        if(!checkInput(item.element, item.message, item.regex)){
            isValid = false;
        }
    })
    if(!isValid) {
        e.preventDefault();
    }
    if(!checkInputCheckbox(inputCheckBox)) {
        e.preventDefault();
    }
})