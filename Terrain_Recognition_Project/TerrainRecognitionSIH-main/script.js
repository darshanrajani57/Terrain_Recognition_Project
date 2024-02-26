document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const selectedImage = document.getElementById('selectedImage');

    // Handle the selected file and update the img src
    const fileInput = formData.get('file');
    const fileURL = URL.createObjectURL(fileInput);
    selectedImage.src = fileURL;
    selectedImage.classList.remove('hidden');

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = '85%'; // Set the width to the final value
        });

        // Update progress bar widths based on confidence scores
        document.getElementById('predictedClass').textContent = data.class;
        document.getElementById('percentageGrassy').textContent = data.percentages.Grassy;
        document.getElementById('percentageMarshy').textContent = data.percentages.Marshy;
        document.getElementById('percentageRocky').textContent = data.percentages.Rocky;
        document.getElementById('percentageSandy').textContent = data.percentages.Sandy;

        // Calculate progress bar widths based on confidence scores (adjust the widths as needed)
        const grassyWidth = data.percentages.Grassy;
        const marshyWidth = data.percentages.Marshy;
        const rockyWidth = data.percentages.Rocky;
        const sandyWidth = data.percentages.Sandy;

        document.getElementById('progressGrassy').style.width = grassyWidth + '%';
        document.getElementById('progressMarshy').style.width = marshyWidth + '%';
        document.getElementById('progressRocky').style.width = rockyWidth + '%';
        document.getElementById('progressSandy').style.width = sandyWidth + '%';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const imageInput = document.getElementById('imageInput');
const selectedImage = document.getElementById('selectedImage');
const contentContainer = document.querySelector('.content-container');

imageInput.addEventListener('change', function (e) {
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            selectedImage.classList.remove('hidden');

            // Create an image element to get the naturalWidth of the selected image
            const img = new Image();
            img.src = selectedImage.src;

            // Wait for the image to load to get its natural width
            img.onload = function () {
                const imgWidth = img.naturalWidth;
                if (imgWidth <= 500) {
                    contentContainer.style.width = '500px';
                } else {
                    // Add 40px to the image width and set it as the container width
                    contentContainer.style.width = imgWidth + 40 + 'px';
                }
            };
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
});

// JavaScript code to cycle through footer messages

const messages = [
    "Made with ❤️ in India 🇮🇳",
    "Made with ❤️ for the world 🌍",
    "Made with ❤️ by PDEU Students",
    "Made with ❤️ by Team Tech Turtles",
    "Made with ❤️ under the guidance of Prof. Vipul Mishra",
    "Made with ❤️ by Darshan Rajani",
    "Made with ❤️ by Swayam Desai",
    "Made with ❤️ by Heet Savaliya",
    "Made with ❤️ by Dishita Chudasama",
    "Made with ❤️ by Prince Koladiya",
    "Made with ❤️ by Tirth Shah"
];

const footerMessages = document.getElementById('footer-messages');
let currentIndex = 0;

function updateFooterMessage() {
    footerMessages.textContent = messages[currentIndex];
    currentIndex = (currentIndex + 1) % messages.length;
}

setInterval(updateFooterMessage, 2000);