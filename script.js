// 'https://restcountries.com/v3.1/name/'

// async function getCapital(){
//     // Лише в тому випадку коли будемо працювати з даними всередині функції
//     try {
//         const URL = 'https://restcountries.com/v3.1/name/';
//         const resp = await fetch(`${URL}Ukraine`)
//         if(!resp.ok){
//             throw new Error(resp.statusText)
//         }
//         const data = await resp.json();  
//         console.log(data);
//     } catch (error) {
//        console.log(error); 
//     }
    

    
// }
// getCapital()

// async function getCapital(){
//     // У випадку коли працюємо з диними за межами функції
   
//         const URL = 'https://restcountries.com/v3.1/name/';
//         const resp = await fetch(`${URL}Ukraine`)
//         if(!resp.ok){
//             throw new Error(resp.statusText)
//         }
//         return resp.json();     
//     }
// getCapital()
// .then(data => console.log(data))
// .catch(e => console.log(e))

// const arrow = async() => {};
// const exp = async function() {};

// ------------------------------------------

// async function getCapital(){
    
    
//         const URL = 'https://restcountries.com/v3.1/name/';
//         const arr = ['Ukraine', 'France', 'Germany']

//         const responses = arr. map(async (ctr) =>{
//         const resp =  await fetch(`${URL}${ctr}`)
//         if (!resp.ok){
//             throw new Error('Not found')
//             Promise.reject('Not found')
//         }
//         return resp.json
//         })

//         const prom = await Promise.allSettled(responses)
//         return prom;
        
//         // const data = await resp.json();  
//         // const data1 = await resp1.json();  
//         // const data2 = await resp2.json();  
//         // console.log(data);
//         // console.log(data1);
//         // console.log(data2);
    
//     }
// getCapital()
// .then(data => {
//     const resp = data.filter(({status}) => status === 'fulfilled')
//     console.log(resp);
// }
//     )
// .catch(e => console.log(e))


// --------------------------------------------------------

const searchForm = document.querySelector('.js-search');
const addCountry = document.querySelector('.js-add');
const list = document.querySelector('.js-list');
const formContainer = document.querySelector('.js-form-container')

addCountry.addEventListener('click', handlerAddInput);

function handlerAddInput(){
    const markup = '<input type="text" name="country">'
    formContainer.insertAdjacentHTML('beforeend', markup)
}

searchForm.addEventListener('submit', handlerForm)

function handlerForm(evt){
    evt.preventDefault()
    const data = new FormData(evt.currentTarget);
    const arr = data.getAll('country').filter(item => item).map(item => item.trim());
     
    getCountries(arr)
    .then( async resp => {
        const capitals = resp.map(({capital}) => capital[0]);
        const weatherService = await getWeather(capitals);
        console.log(weatherService);
    })
    .catch(e => console.log(e))

}

async function getCountries(arr){
const resps = arr.map(async item => {
    const resp = await fetch(`https://restcountries.com/v3.1/name/${item}`)
    if (!resp.ok){
        throw new Error()
    }

    return  resp.json()
})
const data = await Promise.allSettled(resps)
const countryObj = data.filter(({status}) => status === "fulfilled").map(({value}) => value[0]);

return countryObj 
}

async function getWeather(arr){
    const BASE_URL = "http://api.weatherapi.com/v1"
    const API_KEY = "8a70a5aab8774d7a956153108232308"

    const resps = arr.map(async city =>{
        const params = new URLSearchParams({
            key: API_KEY,
            q: city,
            lang: 'uk'
        })
        
        const resp = await fetch(`${BASE_URL}/current.json?${params}`)
    
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
    
    const data = await Promise.allSettled(resps)
    const objs = data.filter(({status}) => status === "fulfilled").map(({value}) => value.current);
    return objs
}