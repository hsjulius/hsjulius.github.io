
document.addEventListener('DOMContentLoaded', function () {
    const projectDescContainer = document.querySelectorAll('.card-container');

    for (let i = 0; i < projectDescContainer.length; i++) {
        const element = projectDescContainer[i];
        console.log(element); 
        element.addEventListener('mouseover', function (event) {
            element.style.backgroundColor = "#bebebe";
            element.style.boxShadow = '5px 5px #328ea5';
        })
        element.addEventListener('mouseout', function (event) {
            console.log('yosuifdsaiuduasi', event.childNodes);
            element.style.backgroundColor = "#dedede";
            element.style.boxShadow = '5px 5px #3fb1cd';
        })
        const pageToOpen = element.getAttribute('data-page');
        
        element.addEventListener('click', function () {
            window.location.href = pageToOpen;
        });
    }
    
})
