let header = document.querySelector('.header');
let rocket = document.getElementById('rocket');
let menuButton = document.getElementById('menu-btn');
let navbarMenu = document.querySelector('.header .navbar');

// Show/Hide Navbar
menuButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
})

window.onscroll = () => {
  // Hide Navbar List When scrolling
    navbarMenu.classList.remove('active');
    // Show/Hide Header When scroll down Or Up
    scrollY > 900 ? header.classList.add('active') : header.classList.remove('active');
    scrollY > 30 ? rocket.classList.add('active') : rocket.classList.remove('active');

    let value = window.scrollY / 20;
    document.querySelector('.cloud-1').style.right = `${-value}%`;
    document.querySelector('.cloud-2').style.left = `${-value}%`;
    document.querySelector('.moon').style.marginTop = `${-value}%`;
}

// Services Slider
var swiper = new Swiper(".services-slider", {
    loop:true,
    spaceBetween:20,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
});

// Contact Form
let form = document.querySelector('.form'),
    fullName = document.getElementById('full-name'),
    phoneNumber = document.getElementById('phone-number'),
    emailAddress = document.getElementById('email'),
    subject = document.getElementById('subject'),
    message = document.getElementById('message'),
    fullNameError = false,
    phoneNumberError = false,
    emailAddressError = false,
    subjectError = false,
    messageError = false;

let composeEmailBody = (name, phone, email, sub, msg) => {
  let emailBody;
  name = fullName.value;
  phone = phoneNumber.value;
  email = emailAddress.value;
  sub = subject.value;
  msg = message.value;
  emailBody = `Full Name : ${name} <br /> Phone Number : ${phone} <br /> Email Address : ${email} <br /> Subject : ${sub} <br /> Message : ${msg}`;
  return emailBody;
}

let verifyEmail = () => {
  let emailError = document.querySelector('.form .input-box .email-error');
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailAddress.value.match(emailRegex)) {
    emailAddress.classList.add('red-border');
    emailAddress.parentElement.classList.add('error');
    if(emailAddress.value !== "") {
      emailError.innerHTML = "please enter a valid email address";
      emailAddressError = true;
    } else {
      emailError.innerHTML = "this field is required";
      emailAddressError = true;
    }
  }
}

let verifyInputs = () => {
  let inputs = document.querySelectorAll('.form .input-box .input');
  for (const input of inputs) {
    if (input.value == "") {
      input.classList.add('red-border');
      input.parentElement.classList.add('error');
      fullNameError = true;
      phoneNumberError = true;
      emailAddressError = true;
      subjectError = true;
      messageError = true;
    }

    if (emailAddress.value !== "") verifyEmail();
    emailAddress.addEventListener('keyup', () => {
      verifyEmail();
    });

    input.addEventListener('keyup', () => {
      if (input.value !== "") {
        input.classList.remove('red-border');
        input.parentElement.classList.remove('error');
        fullNameError = false;
        phoneNumberError = false;
        emailAddressError = false;
        subjectError = false;
        messageError = false;
      } else {
        input.classList.add('red-border');
        input.parentElement.classList.add('error');
        fullNameError = true;
        phoneNumberError = true;
        emailAddressError = true;
        subjectError = true;
        messageError = true;
      }
    });
  }
}

let formReset = () => {
  fullName.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  subject.value = "";
  message.value = "";
}

let sendEmail = () => {
  Email.send({
      SecureToken : "edbfd8f6-c033-44ae-a680-8d6489c4f391",
      To : 'mouaadsadik54@gmail.com',
      From : 'mouaadsadik54@gmail.com',
      Subject : subject.value,
      Body : composeEmailBody()
  }).then(
    message => {
      let successMessage = document.querySelector('.success-message');
      let closeSuccessMessage = successMessage.querySelector('.fa-times');
      successMessage.classList.add('active');
      closeSuccessMessage.onclick = () => { successMessage.classList.remove('active'); }
    }
  );
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  verifyInputs();
  if(fullNameError == false && phoneNumberError == false && emailAddressError == false && subjectError == false && messageError == false) {
    sendEmail();
    formReset();
  }
});
