document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем перезагрузку страницы

        // Сброс старых ошибок
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // 1. Проверка ФИО
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        if (fullnameValue === '' || fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя (минимум 2 слова)');
            isValid = false;
        }

        // 2. Проверка Телефона
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        if (phoneValue === '' || phoneDigits.length < 10) {
            showError(phone, 'Введите минимум 10 цифр номера');
            isValid = false;
        }

        // 3. Проверка Email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        if (emailValue === '' || !emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        // 4. Проверка согласия
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            alert('Необходимо согласие на обработку данных');
            isValid = false;
        }

        // Если всё ок
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                topic: document.getElementById('topic').value,
                message: document.getElementById('message').value.trim()
            };
            // Отправляем событие для логгера
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            alert('Форма успешно отправлена! Проверьте консоль.');
            form.reset();
        }
    });

    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        // В Bulma help обычно лежит внутри field, добавляем после input/control
        input.parentNode.appendChild(help);
    }

    // Убираем ошибку при вводе
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('is-danger');
            const parent = this.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    });
});