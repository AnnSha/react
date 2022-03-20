import {useState, useEffect} from 'react';

import personService from './services/services'

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

const Search = ({setFilteredData}) => {


    return (
        <div>
            <p>filter shown with:</p>
            <input type='search'
                   placeholder='search...'
                   onChange={(event) => {
                       setFilteredData(event.target.value)
                   }}
            />

        </div>
    )
}

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [someMessage, setMessage] = useState('Add name and number')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newPhone,

        }
        if (persons.filter(e => e.name === newName).length) {
            alert(`${newName} is already added to phonebook`)
        } else

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setMessage(
                        `Added '${newName} ${newPhone}'`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)

                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewPhone('')

                })
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }


    return (
        <div>
            <Notification message={someMessage}/>
            <form onSubmit={addPerson}>
                <div>
                    <p>name:</p>
                    <input value={newName}
                           onChange={handleNameChange}
                    />
                </div>
                <div>
                    <p>number:</p>
                    <input value={newPhone}
                           onChange={handlePhoneChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}
const Persons = ({persons, filteredData, setPersons}) => {


    const deletePerson = (id) => {

        if (window.confirm(`Are you sure? Delete '${id}'?`)) {
            // setPersons(persons.filter(n => n.id !== id))
            fetch(`http://localhost:3001/persons/${id}`,
                {
                    method: 'DELETE'
                })
                .then(res => {
                    console.log(res, 'res');

                })
                .catch(error => {
                    alert(
                        `the person '${persons.id}' was already deleted from server`
                    )
                    setPersons(persons.filter(p => p.id !== id));
                })
        }
    }


    return (
        <ul>
            {persons.filter(person => {
                if (filteredData === '') {
                    return person
                } else if (person.name.toLowerCase()
                    .includes(filteredData.toLowerCase())) {
                    return person
                } else return false
            })
                .map(person => (
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </li>)
                )}


        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredData, setFilteredData] = useState('')


    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])


    return (
        <div>
            <h2>Phonebook</h2>

            <Search setFilteredData={setFilteredData}/>
            <h2>Add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filteredData={filteredData}/>
        </div>
    )
}

export default App
