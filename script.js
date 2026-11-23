/* ================================
   CinemaGo — script.js
================================ */


/* ---------- ИЗБРАННОЕ ---------- */

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("cinemaGoFavorites")) || [];
    } catch (error) {
        return [];
    }
}


function saveFavorites(favorites) {
    localStorage.setItem(
        "cinemaGoFavorites",
        JSON.stringify(favorites)
    );
}


function toggleFavorite(button) {

    const card = button.closest(".movie-card");

    if (!card) return;

    const titleElement = card.querySelector("h3");

    if (!titleElement) return;

    const title = titleElement.textContent.trim();

    const imageElement = card.querySelector("img");

    const image = imageElement
        ? imageElement.src
        : "";

    let favorites = getFavorites();

    const index = favorites.findIndex(function(movie) {
        return movie.title === title;
    });


    if (index !== -1) {

        favorites.splice(index, 1);

        button.textContent = "♡";
        button.classList.remove("favorite-active");

    } else {

        favorites.push({
            title: title,
            image: image
        });

        button.textContent = "♥";
        button.classList.add("favorite-active");
    }


    saveFavorites(favorites);
}


/* ---------- ПОКАЗ ИЗБРАННОГО ---------- */

function showFavorites() {

    const grid = document.getElementById("favoritesGrid");

    if (!grid) return;

    const empty = document.getElementById("emptyFavorites");

    const favorites = getFavorites();

    grid.innerHTML = "";


    if (favorites.length === 0) {

        if (empty) {
            empty.style.display = "block";
        }

        return;
    }


    if (empty) {
        empty.style.display = "none";
    }


    favorites.forEach(function(movie) {

        const card = document.createElement("div");

        card.className = "movie-card";


        const image = movie.image
            ? `<img src="${movie.image}" alt="${movie.title}">`
            : "";


        const trailer =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent(movie.title + " трейлер");


        card.innerHTML = `

            ${image}

            <h3>${movie.title}</h3>

            <a
                href="${trailer}"
                target="_blank"
                rel="noopener noreferrer"
                class="trailer-btn"
            >
                ▶ Трейлер
            </a>

            <button
                class="remove-favorite-btn"
            >
                Удалить из избранного
            </button>
        `;


        const removeButton =
            card.querySelector(".remove-favorite-btn");


        removeButton.addEventListener(
            "click",
            function() {

                let favorites = getFavorites();

                favorites = favorites.filter(
                    function(item) {
                        return item.title !== movie.title;
                    }
                );

                saveFavorites(favorites);

                showFavorites();
            }
        );


        grid.appendChild(card);

    });
}


/* ---------- ТРЕЙЛЕРЫ В КАТАЛОГЕ ---------- */

function addTrailerButtons() {

    const cards =
        document.querySelectorAll(
            ".movies-grid .movie-card"
        );


    cards.forEach(function(card) {

        const titleElement =
            card.querySelector("h3");


        if (!titleElement) return;


        const title =
            titleElement.textContent.trim();


        if (!title) return;


        /* Не добавляем вторую кнопку */

        if (
            card.querySelector(".trailer-btn")
        ) {
            return;
        }


        const button =
            document.createElement("a");


        button.className =
            "trailer-btn";


        button.textContent =
            "▶ Трейлер";


        button.href =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent(
                title + " трейлер"
            );


        button.target =
            "_blank";


        button.rel =
            "noopener noreferrer";


        card.appendChild(button);

    });
}


/* ---------- ПОИСК ---------- */

function searchMovies() {

    const input =
        document.getElementById("movieSearch");


    if (!input) return;


    const search =
        input.value.toLowerCase().trim();


    const cards =
        document.querySelectorAll(
            ".movies-grid .movie-card"
        );


    cards.forEach(function(card) {

        const title =
            card.querySelector("h3");


        if (!title) return;


        const name =
            title.textContent.toLowerCase();


        if (name.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


/* ---------- ФИЛЬТР ЖАНРОВ ---------- */

function filterMovies(genre) {

    const cards =
        document.querySelectorAll(
            ".movies-grid .movie-card"
        );


    cards.forEach(function(card) {

        const genres =
            (
                card.getAttribute("data-genre") || ""
            ).toLowerCase();


        if (
            genre === "all" ||
            genres.includes(genre.toLowerCase())
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


/* ---------- БРОНИРОВАНИЕ ---------- */

function selectSeat(button) {

    if (!button) return;

    button.classList.toggle("selected");
}


function showKaspiInfo() {

    const payment =
        document.getElementById("paymentMethod");


    const kaspi =
        document.getElementById("kaspiInfo");


    if (!payment || !kaspi) return;


    if (payment.value === "kaspi") {

        kaspi.style.display = "block";

    } else {

        kaspi.style.display = "none";

    }
}


function bookMovie(event) {

    event.preventDefault();

    alert(
        "Бронирование успешно создано!"
    );
}


/* ---------- ОТЗЫВЫ ---------- */

function addReview(event) {

    event.preventDefault();

    alert(
        "Спасибо! Ваш отзыв отправлен."
    );
}


/* ---------- АККАУНТ ---------- */

function loginAccount(event) {

    event.preventDefault();

    alert(
        "Добро пожаловать в CinemaGo!"
    );
}


/* ---------- ЗАПУСК ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Избранное */

        showFavorites();


        /* Трейлеры */

        addTrailerButtons();


        /* Восстановление сердечек */

        const favorites =
            getFavorites();


        const cards =
            document.querySelectorAll(
                ".movies-grid .movie-card"
            );


        cards.forEach(function(card) {

            const titleElement =
                card.querySelector("h3");


            const button =
                card.querySelector(
                    ".favorite-btn"
                );


            if (!titleElement || !button) {
                return;
            }


            const title =
                titleElement.textContent.trim();


            const saved =
                favorites.some(
                    function(movie) {
                        return movie.title === title;
                    }
                );


            if (saved) {

                button.textContent = "♥";

                button.classList.add(
                    "favorite-active"
                );

            } else {

                button.textContent = "♡";

            }

        });

    }
);