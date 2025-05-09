document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileMenuTabs = document.getElementById('mobile-menu-tabs');
    const body = document.body;

    burgerMenu.addEventListener('click', function () {
        const isActive = mobileMenuTabs.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        
        // Блокировка скролла
        if(isActive) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = mobileMenuTabs.contains(event.target) || burgerMenu.contains(event.target);

        if (!isClickInsideMenu && mobileMenuTabs.classList.contains('active')) {
            mobileMenuTabs.classList.remove('active');
            burgerMenu.classList.remove('active');
            
            // Разблокировка скролла
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.left-arrow');
    const nextArrow = document.querySelector('.right-arrow');

    // Клонируем первый и последний слайды
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Добавляем клоны в слайдер
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    let currentIndex = 1; // Начинаем с первого оригинального слайда
    let slidesToShow = 3; // По умолчанию показываем 3 слайда

    // Функция для обновления количества видимых слайдов
    function updateSlidesToShow() {
        if (window.innerWidth >= 1440) {
            slidesToShow = 3; // Десктоп
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2; // Планшет
        } else {
            slidesToShow = 1; // Мобильные
        }
    }

    // Функция для прокрутки слайдов
    function moveSlides(direction) {
        updateSlidesToShow(); // Обновляем количество видимых слайдов

        if (direction === 'next') {
            currentIndex++;
        } else if (direction === 'prev') {
            currentIndex--;
        }

        // Рассчитываем ширину слайда с учётом gap
        const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slider).gap);
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        slider.style.transition = 'transform 0.5s ease-in-out';

        // Переход к клонированным слайдам
        if (currentIndex === slides.length + 1) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 1;
                slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }, 500); // Задержка для завершения анимации
        } else if (currentIndex === 0) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = slides.length;
                slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }, 500); // Задержка для завершения анимации
        }
    }

    // Обработчики для стрелок
    prevArrow.addEventListener('click', () => moveSlides('prev'));
    nextArrow.addEventListener('click', () => moveSlides('next'));



    // Обновляем количество слайдов при изменении размера окна
    window.addEventListener('resize', () => {
        updateSlidesToShow();
        moveSlides('next'); // Пересчитываем позицию слайдов
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const priceContent = this.closest('.price-block').querySelector('.price-content');

            // Закрываем все открытые блоки, кроме текущего
            document.querySelectorAll('.price-content').forEach(content => {
                if (content !== priceContent && content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.previousElementSibling.querySelector('.toggle-btn').classList.remove('active');
                }
            });

            // Открываем/закрываем текущий блок
            if (priceContent.style.maxHeight) {
                priceContent.style.maxHeight = null;
                this.classList.remove('active');
            } else {
                priceContent.style.maxHeight = priceContent.scrollHeight + 'px';
                this.classList.add('active');
            }
        });
    });
});



const services = [
    { name: 'Женская стрижка', price: 1500 },
    { name: 'Мужская стрижка', price: 1000 },
    { name: 'Окрашивание волос', price: 3000 },
    { name: 'Укладка', price: 1200 },
    { name: 'Маникюр', price: 1200 },
    { name: 'Педикюр', price: 1500 },
    { name: 'Покрытие гель-лаком', price: 800 },
    { name: 'Наращивание ногтей', price: 2500 },
    { name: 'Ламинирование ресниц', price: 2000 },
    { name: 'Ламинирование бровей', price: 1500 },
    { name: 'Комплекс (ресницы + брови)', price: 3000 },
    { name: 'Обёртывание', price: 2500 },
    { name: 'Массаж тела', price: 3000 },
    { name: 'Пилинг', price: 2000 },
    { name: 'SPA-программа', price: 5000 }
];
const optionsContainer = document.querySelector('.options-container');
const totalElement = document.getElementById('total');

// Создание чекбоксов
optionsContainer.innerHTML = services.map(service => `
    <label class="option">
    <input type="checkbox" value="${service.price}">
    ${service.name} (${service.price} ₽)
  </label>
`).join('');


document.querySelector('.custom-select').onclick = e => {
  if(e.target.closest('.select-box')) {
    optionsContainer.classList.toggle('show');
  }
}

document.onclick = e => {
  if(!e.target.closest('.custom-select')) {
    optionsContainer.classList.remove('show');
  }
}

// Подсчет суммы
optionsContainer.onchange = e => {
  if(e.target.type === 'checkbox') {
    totalElement.textContent = Array.from(
      optionsContainer.querySelectorAll('input:checked')
    ).reduce((sum, checkbox) => sum + +checkbox.value, 0);
  }
}