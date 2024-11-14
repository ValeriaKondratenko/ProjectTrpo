document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.toggle');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed'); // Переключаем класс collapsed
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация прокрутки
    const scrollAmount = 400;

    // Функция прокрутки
    function scrollContent(container, direction) {
        const scrollValue = direction === 'left' ? -scrollAmount : scrollAmount;
        container.scrollBy({
            left: scrollValue,
            behavior: 'smooth'
        });
    }

    // Обработка для каждого прокручиваемого контейнера
    document.querySelectorAll('.scroll-container').forEach(container => {
        const leftBtn = container.closest('.container').querySelector('.scroll-btn.left');
        const rightBtn = container.closest('.container').querySelector('.scroll-btn.right');

        // Обработчики кнопок
        leftBtn.addEventListener('click', function() {
            scrollContent(container, 'left');
        });
        rightBtn.addEventListener('click', function() {
            scrollContent(container, 'right');
        });

        // Прокрутка колесиком мыши
        container.addEventListener('wheel', function(event) {
            event.preventDefault();
            const newScrollLeft = container.scrollLeft + event.deltaY;
            if (newScrollLeft >= 0 && newScrollLeft <= (container.scrollWidth - container.clientWidth)) {
                container.scrollLeft = newScrollLeft;
            }
        });

        // Прокрутка перетаскиванием мыши
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', function(e) {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            const newScrollLeft = scrollLeft - walk;
            if (newScrollLeft >= 0 && newScrollLeft <= (container.scrollWidth - container.clientWidth)) {
                container.scrollLeft = newScrollLeft;
            }
        });

        // Функция обновления состояния кнопок
        function updateButtonsState() {
            const isAtStart = container.scrollLeft <= 0;
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;

            leftBtn.style.opacity = isAtStart ? '0.5' : '1';
            leftBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
            leftBtn.disabled = isAtStart;

            rightBtn.style.opacity = isAtEnd ? '0.5' : '1';
            rightBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
            rightBtn.disabled = isAtEnd;
        }

        // События для обновления кнопок
        container.addEventListener('scroll', updateButtonsState);
        window.addEventListener('resize', updateButtonsState);

        // Начальное обновление состояния кнопок
        updateButtonsState();
    });
});

document.querySelector('.go-back').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.querySelector('.go-back-registr').addEventListener('click', function() {
    window.location.href = 'index.html';
});


