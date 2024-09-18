import {useEffect, useState} from 'react'
import AddEntry from '../components/AddEntry.jsx'
import EntryTable from '../components/EntryTable.jsx'
function Personal() {

	const getAllEntriesUrl = "http://127.0.0.1:8000/get_all_entries/"
	const sessionToken = localStorage.getItem('token');
	const [entries, setEntries] = useState([]);
	const [nextEntryID, setNextEntryID] = useState(0);

	function addNewEntryToClient(newEntry) {
		setEntries((entries) => {
			const updatedEntries = [newEntry,...entries];
			return updatedEntries;
		});
		
		setNextEntryID((currentNextEntryID) => currentNextEntryID + 1)
	}

	/**
		* Fetch entries after render. 
		*/
	useEffect(() => {

		const fetchEntries = async () => {
		  try {
			const res = await fetch(getAllEntriesUrl, {
				method: 'GET',
				headers: {
					'Authorization': `Token ${sessionToken}`,
					'Content-Type': 'application/json',
				},
			});
	
			await statusCheck(res);
			const entries = await res.json(); 
			setEntries(entries); 
		  } catch (error) {
			console.log(error);
		  }
	};
	
		fetchEntries(); 
	  }, [sessionToken]); 
	  // Add sessionToken as dependencies because when token change if user logout and login with
	  // account it will change sessionToken, hence fetch another time.

	async function statusCheck(res) {
		if (!res.ok) {
			throw new Error(await res.text());
		}
		return res;
	}

	return (
		<>
			<AddEntry entries={entries} addNewEntryToClient={addNewEntryToClient} nextEntryID={nextEntryID}/>
			<EntryTable entries={entries} setEntries={setEntries}/>
		</>
	);
}

export default Personal
