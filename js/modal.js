
const modalToggle = document.querySelector('.modal__btn-more');
modalToggle.addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.modal__form-more').classList.toggle('modal__form-more--open');
});

const SE_NAME = "ModalDisplayed";

let showModal = function() {
  if (sessionStorage.getItem(SE_NAME) != 'true') {
    openModal.classList.add('is-open');
    sessionStorage.setItem(SE_NAME, "true");
  }
};

setTimeout(showModal, 8000);

const open = document.querySelector('.js-open');
const modalContainer = document.querySelector('.modal__container');
const close = document.querySelector('.js-close');

open.addEventListener('click', () => {
  modalContainer.classList.add('is-open');
});

close.addEventListener('click', () => {
  modalContainer.classList.remove('is-open');
});


// Walidacja Modal

const toggleErrorField = function(field, show) {
  const errorText = field.nextElementSibling;
  if (errorText !== null) {
    if (errorText.classList.contains("form-error-text")) {
      errorText.style.display = show ? "block" : "none";
      errorText.setAttribute('aria-hidden', show);
    }
  }
};

const markFieldAsError = function(field, show) {
  if (show) {
    field.classList.add("field-error");
  } else {
    field.classList.remove("field-error");
    toggleErrorField(field, false);
  }
};


const form = document.querySelector('#modalForm');

const inputs = form.querySelectorAll('input,textarea');
const required = form.querySelectorAll("[required]");

form.setAttribute('novalidate', true);

for (const el of required) {
  el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}

form.addEventListener("submit", e => {
  var captcha_API = '6Ldzev8UAAAAAAdD0sz6NHLXbaSZXzQZTezniI2I';
  e.preventDefault();

  let formErrors = false;

  // 2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
  for (const el of required) {
    markFieldAsError(el, false);
    toggleErrorField(el, false);

    if (!el.checkValidity()) {
      markFieldAsError(el, true);
      toggleErrorField(el, true);
      formErrors = true;
    }
  }

  if (!formErrors) {
    const submit = form.querySelector("[type=submit]");
    submit.disabled = true;
    submit.classList.add("element-is-busy");

    const formData = new FormData();
    for (const el of inputs) {
      formData.append(el.name, el.value)
    }

    const url = form.getAttribute("action");
    const method = form.getAttribute("method");

    grecaptcha.ready(function() {
      grecaptcha.execute(captcha_API, {action: 'login'})
          .then(function(token) {
            formData.append('token', token);
            return fetch(url, {
              method: method.toUpperCase(),
              body: formData
            });
          }).then(res => res.json())
          .then(res => {
            if (res.errors) {
              const selectors = res.errors.map(el => `[name="${el}"]`);
              const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
              for (const el of fieldsWithErrors) {
                markFieldAsError(el, true);
                toggleErrorField(el, true);
              }
            } else {
              if (res.success) {
                const div = document.createElement("div");
                div.classList.add("modal__form-send-success");
                div.innerText = "Wysłanie wiadomości się nie powiodło";
                form.parentElement.insertBefore(div, form);
                div.innerHTML = `
                        <strong>Wiadomość została wysłana</strong>
                        <span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>
                    `;
                form.remove();
              } else {
                //jeżeli istnieje komunikat o błędzie wysyłki
                //np. generowany przy poprzednim wysyłaniu formularza
                //usuwamy go, by nie duplikować tych komunikatów
                const statusError = document.querySelector(".send-error");
                if (statusError) {
                  statusError.remove();
                }

                const div = document.createElement("div");
                div.classList.add("send-error");
                div.innerText = "Wysłanie wiadomości się nie powiodło";
                submit.parentElement.appendChild(div);
              }
            }
            submit.disabled = false;
            submit.classList.remove("element-is-busy");
          });
    });
  }
});
