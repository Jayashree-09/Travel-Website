document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    // Slider functionality
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slider && slides.length > 0) {
        const totalSlides = slides.length;
        const slideWidth = slides[0].clientWidth;

        function nextSlide() {
            index++;
            if (index >= totalSlides) {
                slider.style.transition = "none";
                index = 0;
                slider.style.transform = `translateX(${-slideWidth * index}px)`;
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out";
                }, 50);
            } else {
                slider.style.transition = "transform 0.5s ease-in-out";
                slider.style.transform = `translateX(${-slideWidth * index}px)`;
            }
        }
        setInterval(nextSlide, 3000);
        
    } else {
        console.error("Slider elements not found!");
    }

    // Explore function
    window.explorePlace = function (place) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(place)}`, "_blank");
    };

    // Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function (event) {
            navMenu.classList.toggle("active");
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll("a").forEach(item => {
            item.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    } else {
        console.error("Menu elements not found!");
    }

    // Authentication Pop-up
    const authButton = document.getElementById("authButton");
    const popupModal = document.getElementById("popupModal");
    const signInForm = document.getElementById("signInForm");
    const signOutMessage = document.getElementById("signOutMessage");
    const signInBtn = document.getElementById("signInBtn");
    const signOutBtn = document.getElementById("signOutBtn");
    const closeBtn = document.querySelector(".close");

    let isSignedIn = false; // Track sign-in state

    if (authButton && popupModal) {
        authButton.addEventListener("click", function (event) {
            event.preventDefault();
            popupModal.style.display = "flex";

            if (!isSignedIn) {
                signInForm.style.display = "block";
                signOutMessage.style.display = "none";
            } else {
                signInForm.style.display = "none";
                signOutMessage.style.display = "block";
            }
        });

        signInBtn.addEventListener("click", function () {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username && password) {
                isSignedIn = true;
                authButton.textContent = "Sign Out";
                signInForm.style.display = "none";
                signOutMessage.style.display = "block";
            } else {
                alert("Please enter a valid username and password!");
            }
        });

        signOutBtn.addEventListener("click", function () {
            isSignedIn = false;
            authButton.textContent = "Sign In";
            signOutMessage.style.display = "none";
            signInForm.style.display = "block";
            popupModal.style.display = "none"; // Hide pop-up on sign out
        });

        closeBtn.addEventListener("click", function () {
            popupModal.style.display = "none"; // Close pop-up when clicking 'X'
        });

        window.addEventListener("click", function (event) {
            if (event.target === popupModal) {
                popupModal.style.display = "none";
            }
        });
    }
});
