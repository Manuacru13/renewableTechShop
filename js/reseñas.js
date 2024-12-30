
fetch('https://randomuser.me/api/?results=3')
.then(response => response.json())
.then(data => {
    // Asigna imágenes aleatorias
    document.getElementById('review-img-1').src = data.results[0].picture.medium;
    document.getElementById('review-img-2').src = data.results[1].picture.medium;
    document.getElementById('review-img-3').src = data.results[2].picture.medium;

    document.querySelectorAll('.card-body em')[0].textContent = `- ${data.results[0].name.first} ${data.results[0].name.last}`;
    document.querySelectorAll('.card-body em')[1].textContent = `- ${data.results[1].name.first} ${data.results[1].name.last}`;
    document.querySelectorAll('.card-body em')[2].textContent = `- ${data.results[2].name.first} ${data.results[2].name.last}`;
})
.catch(error => console.error('Error al obtener datos:', error));

// Cambia imágenes cada de 5 segundos (5000 milisegundos)
setTimeout(updateReviewImages, 5000);

