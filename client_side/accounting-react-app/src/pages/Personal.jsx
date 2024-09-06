import {useState} from 'react'
import AddEntry from '../components/AddEntry.jsx'
import EntryTable from '../components/EntryTable.jsx'
function Personal() {
	const [entries, setEntries] = useState([])
	const [nextEntryID, setNextEntryID] = useState(0)
	
	function addNewEntry(newEntry) {
		setEntries((entries) => {
			console.log("hello")
			const updatedEntries = [newEntry,...entries];
			console.log(updatedEntries);
			return updatedEntries;
		});
		
		setNextEntryID((currentNextEntryID) => currentNextEntryID + 1)
	}

	return (
		<>
			<AddEntry entries={entries} addNewEntry={addNewEntry} nextEntryID={nextEntryID}/>
			<EntryTable entries={entries}/>
		</>
	);
}

export default Personal
