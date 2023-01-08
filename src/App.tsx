import { useState } from 'react'
import reactLogo from './assets/react-query.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'

function App() {
  // create some pagination for query
  const [limit, setLimit] = useState<undefined | number>(10)

  // create async fucntion that return promise
  async function fetchPokemon(limit?: number) {
    const url = new URL('https://pokeapi.co/api/v2/pokemon')
    if (limit !== undefined) {
      url.searchParams.append('limit', limit + '')
    }
    const fetchData = await fetch(url.toString()).then(res => res.ok ? res.json() : res)
    console.log(fetchData)
    return fetchData
  }

  // start react query here
  // by 'useQuery'
  const { isLoading, isError, data, error, isFetched, refetch } = useQuery({
    queryKey: ['pokemonList', limit],
    queryFn: () => fetchPokemon(limit),
  })

  function refreshData() {
    refetch()
  }


  return (
    <div className="App">
      <img src={reactLogo} alt="reactLogo" />
      <h2>Click on Previous , Next </h2>
      <h2>Try Slow network to see what happend 😃</h2>
      <h3>  Dev Tool {` -> network -> change 'No throttling' -> 'Slow 3G'`}</h3>
      <div>limit : { limit }</div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        {
          isLoading && <span>Loading...</span>
        }
        {
          isError && <span>Error fetch</span>
        }
        {
          isFetched &&
          <ol style={{ maxWidth: '200px' }}>
            {data.results.map((item: any) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ol>
        }
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button onClick={() => setLimit((limit) => limit ? limit - 1 : 1)}>{'<'} Previous</button>
        <button onClick={() => setLimit((limit) => limit ? limit + 1 : 1)}>Next {'>'}</button>
        <button onClick={()=> refreshData()}>refresh</button>
      </div>
    </div>
  )
}

export default App
