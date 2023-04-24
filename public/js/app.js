const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message_1 = document.querySelector('#message_1');
const message_2 = document.querySelector('#message_2');

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();


    message_1.textContent = 'Loading...';
    message_2.textContent = '';
    
    fetch("http://localhost:3000/weather?address="+search.value).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                message_1.textContent = data.error;
            }
            else{
                message_1.textContent = data.location;
                message_2.textContent = data.forecast;
            }
        })
    })
});