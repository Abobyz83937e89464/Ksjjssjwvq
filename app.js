// app.js - базовый функционал для сайта morpheusov.com

// 1. ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СЕКЦИЯМИ (кнопка "Био")
const bioButton = document.getElementById('bioButton');
const bioSection = document.getElementById('bioSection');
const homeSection = document.getElementById('home');

if (bioButton && bioSection) {
    bioButton.addEventListener('click', function() {
        // Скрываем домашнюю секцию, показываем секцию "Био"
        homeSection.classList.add('hidden');
        bioSection.classList.remove('hidden');
        // Прокрутка к началу секции "Био"
        bioSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// 2. СОХРАНЕНИЕ БИО-ОПИСАНИЯ В LocalStorage браузера
const bioTextArea = document.getElementById('bioText');
const saveBioButton = document.getElementById('saveBio');
const clearBioButton = document.getElementById('clearBio');
const bioDisplay = document.getElementById('bioDisplay');

// Загружаем сохранённое описание при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const savedBio = localStorage.getItem('morpheusov_bio');
    if (savedBio) {
        bioDisplay.innerHTML = `<p><strong>Ваше сохранённое описание:</strong></p><p>${savedBio}</p>`;
        bioTextArea.value = savedBio;
    }
});

// Обработчик кнопки "Сохранить описание"
if (saveBioButton && bioTextArea) {
    saveBioButton.addEventListener('click', function() {
        const text = bioTextArea.value.trim();
        if (text) {
            // Сохраняем в LocalStorage
            localStorage.setItem('morpheusov_bio', text);
            // Выводим на экран
            bioDisplay.innerHTML = `<p><strong>Ваше сохранённое описание:</strong></p><p>${text}</p>`;
            alert('Описание сохранено!');
        } else {
            alert('Введите текст описания.');
        }
    });
}

// Обработчик кнопки "Очистить"
if (clearBioButton && bioTextArea) {
    clearBioButton.addEventListener('click', function() {
        if (confirm('Очистить описание?')) {
            bioTextArea.value = '';
            localStorage.removeItem('morpheusov_bio');
            bioDisplay.innerHTML = '<p>Ваше описание появится здесь после сохранения.</p>';
        }
    });
}

// 3. ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЙ ПО URL (имитация загрузки)
const imageUrlInput = document.getElementById('imageUrl');
const addImageBtn = document.getElementById('addImageBtn');
const imageGallery = document.getElementById('imageGallery');

if (addImageBtn && imageGallery) {
    addImageBtn.addEventListener('click', function() {
        const url = imageUrlInput.value.trim();
        if (!url) {
            alert('Введите URL изображения.');
            return;
        }

        // Создаем элемент изображения
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Загруженное изображение';
        imgElement.style.maxWidth = '300px';
        imgElement.style.margin = '15px';
        imgElement.style.borderRadius = '10px';
        imgElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';

        // Очищаем placeholder-текст при первой загрузке
        if (imageGallery.querySelector('p')) {
            imageGallery.innerHTML = '';
        }

        // Добавляем изображение в галерею
        imageGallery.appendChild(imgElement);

        // Очищаем поле ввода
        imageUrlInput.value = '';

        // Сохраняем URL в массив (в будущем можно сохранять в localStorage)
        let galleryArray = JSON.parse(localStorage.getItem('morpheusov_gallery')) || [];
        galleryArray.push(url);
        localStorage.setItem('morpheusov_gallery', JSON.stringify(galleryArray));
    });
}

// При загрузке страницы пробуем загрузить ранее сохранённые изображения
window.addEventListener('DOMContentLoaded', () => {
    const savedGallery = JSON.parse(localStorage.getItem('morpheusov_gallery')) || [];
    if (savedGallery.length > 0) {
        imageGallery.innerHTML = ''; // Очищаем placeholder
        savedGallery.forEach(url => {
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = 'Загруженное изображение';
            imgElement.style.maxWidth = '300px';
            imgElement.style.margin = '15px';
            imgElement.style.borderRadius = '10px';
            imgElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            imageGallery.appendChild(imgElement);
        });
    }
});

// 4. Базовый консольный лог для отладки
console.log('Скрипт morpheusov.com загружен. Домен: morpheusov.com');
