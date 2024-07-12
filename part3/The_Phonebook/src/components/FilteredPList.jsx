import PListDetail from './PListDetail'

const FilteredPList = ({filteredPersons,buttonFunction}) =>{
    return (
        <>
        <h2>Numbers</h2>
        {filteredPersons.map(person => 
        <PListDetail key = {person.id} 
        name = {person.name} number={person.number} 
        buttonFunction = {()=>buttonFunction(person.id, person.name)}/>)}
        </>
    )
}
export default FilteredPList