
const pokemonList = document.getElementById('pokemonList')
const loadMoreBUtton = document.getElementById('loadMoreButton')
const maxRecords = 1015
const limit = 9
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">

                    ${pokemon.types.map((type) =>  `<li class="type ${type}">${type}</li>`).join('')}

                </ol>

            <img src="${pokemon.sprite}" 
                alt="${pokemon.name}">
        </div>
    </li>
`
}


function loadPokemonItens(offset, limit) {
    // Usamos a função fetch e solicitamos que ele execute uma resposta.
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // Criaremos um for para iterar entre a lista.
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
})
}

loadPokemonItens(offset, limit)

loadMoreBUtton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit;
    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
    loadPokemonItens(offset, limit)
    loadMoreBUtton.parentElement.removeChild(loadMoreBUtton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
