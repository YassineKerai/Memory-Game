aboutButton = document.querySelector('.AboutButton');
about = document.querySelector('.about');

aboutButton.addEventListener('click', () => {
    if (!aboutButton.classList.contains("AboutButtonClicked")) {
        aboutButton.classList.add("AboutButtonClicked");
        about.classList.add("aboutActive");
    }
    else {
        aboutButton.classList.remove("AboutButtonClicked");
        about.classList.remove("aboutActive");
    }
})
