import { useState, useEffect } from 'react'
import axios from "axios";

const Search =({countries}) =>{
    const [filteredData, setFilteredData] =useState('')

    const handleSearch =(event)=> {
        console.log(event.target.value)
        setFilteredData(event.target.value)

    }

    return (
        <div>

            <p>filter shown with:</p>
            <input type='search'
                   placeholder='search...'
                   onChange={handleSearch}
            />
            { countries.filter((country) => {
                if (filteredData === '') {
                    return country
                }
                else if(country.name.common.toLowerCase()
                    .includes(filteredData.toLowerCase())){
                    return country
                }
                else return false
            })
                .map((country, index) => {
                        if ( countries.length > 5)
                            return(
                                <li key={index}>{country.name.common} </li>)
                        else return (
                            <li key={index}>{country.name.common },
                                { country.capital}
                            </li>
                        )
                    }
                )
            }


        </div>
    )
}
const Country =({countries})=> {
    return (
        <ul>
            { countries.map((country, index) => (
                <li key={index} >
                    {country.name.common} , {country.capital}</li>)
            )}
        </ul>
    )
}


const App = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    console.log('render', countries.length, 'all')


    return (
        <div>
            <h2>Find countries</h2>
            <Search countries={countries} />
            <h2>All counties</h2>
            <Country countries={countries} />
        </div>
    )
}

export default App
