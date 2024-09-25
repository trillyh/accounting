import {useState} from 'react'
function AddEntry({addNewEntryToClient: addNewEntryToClient}) {
	const createEntryUrl = 'http://127.0.0.1:8000/create_journal_entry/'

	const [dateTime, setDateTime] = useState(() => {
		const current = new Date();
		return current.toISOString().slice(0, 10); //YYYY-MM-DD
	});

	const [inputEntryDescription, setInputEntryDescription] = useState('');

	const handleSubmitingNewEntry = async (e) => {
		e.preventDefault();
		let newEntry = {
			entry_date: dateTime,
			description: inputEntryDescription
		}

		const sessionToken = localStorage.getItem('token');

		try {
			const res = await fetch(createEntryUrl, {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Token ${sessionToken}`
				},
				body: JSON.stringify(newEntry)
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}
			

			console.log("added new entry");

			// Take the entry from client, add ID from API response
			const resData = await res.json();
			newEntry["id"] = resData["id"]
			addNewEntryToClient(newEntry);
		} catch (error) {
			console.log(error.message);
		} 	
	}

	return (
		<form onSubmit={handleSubmitingNewEntry}>
			<label htmlFor="date">Select Date:</label>
			<input
				type="date-local"
				id="date"
				value={dateTime} 
				onChange={(e) => setDateTime(e.target.value)} 
			/>
			<input
				type="text"
				value={inputEntryDescription}
				onChange={(e) => setInputEntryDescription(e.target.value)}
				placeholder="Enter Entry Description"
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
export default AddEntry
