const pokemonImage = document.querySelector('.pokemon_image')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonId = document.querySelector('.pokemon_id')
const form = document.querySelector('.form')
const input = document.querySelector('.pokemon_input')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
const pokemonSpan = document.querySelectorAll('.pokemon_span')

let pokemonNumber = 1



const fetchPokemon = async (pokemon) => {
    const apiResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (apiResponse.status == 200) {
        const data = await apiResponse.json()
        return data
      

    }
}


const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonId.innerHTML = ''

 const data = await fetchPokemon(pokemon)

 if (data) {
     pokemonImage.style.display = 'block'
     pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
     pokemonName.innerHTML = `${data.name}.`
     pokemonId.innerHTML =`${data.id}`
     input.value = ""
     pokemonNumber = data.id;
     
 } else {    
    pokemonName.innerHTML = 'Not Found'
    pokemonId.innerHTML = 'Try Again'    
    pokemonImage.style.display = 'none'
    
   

 }
 
 console.log(data)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev?.addEventListener('click', () => {
    if (pokemonNumber > 1) {
        pokemonNumber -= 1
        renderPokemon(pokemonNumber)
    }

})

buttonNext?.addEventListener('click', () => {
    pokemonNumber += 1
    renderPokemon(pokemonNumber)
    

})


renderPokemon(pokemonNumber)