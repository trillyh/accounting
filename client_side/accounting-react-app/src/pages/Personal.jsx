import {useState} from 'react'
import AddEntry from '../components/AddEntry.jsx'
import EntryTable from '../components/EntryTable.jsx'
function Personal() {
	const [entries, setEntries] = useState([])
	const [nextEntryID, setNextEntryID] = useState(0)
	
	function addNewEntryToClient(newEntry) {
		setEntries((entries) => {
			const updatedEntries = [newEntry,...entries];
			return updatedEntries;
		});
		
		setNextEntryID((currentNextEntryID) => currentNextEntryID + 1)
	}

	return (
		<>
			<AddEntry entries={entries} addNewEntryToClient={addNewEntryToClient} nextEntryID={nextEntryID}/>
			<EntryTable entries={entries}/>
		</>
	);
}

export default Personal
