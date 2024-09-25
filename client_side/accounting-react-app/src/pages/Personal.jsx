import {useEffect, useState} from 'react'
import AddEntry from '../components/AddEntry.jsx'
import EntryTable from '../components/EntryTable.jsx'
function Personal() {

	const getAllEntriesUrl = "http://127.0.0.1:8000/get_all_entries/"
	const [entries, setEntries] = useState([]);

	function addNewEntryToClient(newEntry) {
		setEntries((entries) => {
			const updatedEntries = [newEntry,...entries];
			return updatedEntries;
		});	
	}

	/**
	* Fetch entries after render. 
	*/
	useEffect(() => {
		const sessionToken = localStorage.getItem('token');

		const fetchEntries = async () => {
			try {
				const response = await fetch(getAllEntriesUrl, {
					method: 'GET',
					headers: {
						'Authorization': `Token ${sessionToken}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error(response.status)
				}
				const entries = await response.json(); 
				setEntries(entries); 
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchEntries(); 
	}, []); 
	// Add sessionToken as dependencies because when token change if user logout and login with
	// account it will change sessionToken, hence fetch another time.

	return (
		<>
			<EntryTable entries={entries} setEntries={setEntries}/>
		</>
	);
}

export default Personal

