const searchForm = document.querySelector('.js-search');
const addCountry = document.querySelector('.js-add');
const list = document.querySelector('.js-list');
const formContainer = document.querySelector('.js-form-container')

addCountry.addEventListener('click', handlerAddInput);

function handlerAddInput(){
    const markup = '<input type="text name="country">'
    formContainer.insertAdjacentHTML('beforeend', markup)
}

searchForm.addEventListener('submit', handlerForm)

function handlerForm(evt){
    evt.preventDefault()
    const data = new FormData(evt.currentTarget);
    console.log(data.getAll('country')); 

}