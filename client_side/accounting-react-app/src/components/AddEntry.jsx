import {useState} from 'react'
function AddEntry({entries, addNewEntry, nextEntryID}) {

	const [dateTime, setDateTime] = useState(() => {
		const current = new Date();
		return current.toISOString().slice(0, 16); //YYYY-MM-DDTHH:mm
	});

	const [inputEntryDescription, setInputEntryDescription] = useState('');

	const handleSubmitingNewEntry = (event) => {
		event.preventDefault();
		let newEntry = {
			id: nextEntryID,
			date: dateTime,
			description: inputEntryDescription
		}
		addNewEntry(newEntry);
	}

	return (
		<form onSubmit={handleSubmitingNewEntry}>
			<label htmlFor="datetime">Select Date and Time:</label>
			<input
				type="datetime-local"
				id="datetime"
				value={dateTime} 
				onChange={(e) => setDateTime(e.target.value)} 
			/>
			<input
				type="text"
				value={inputEntryDescription}
				onChange={(event) => setInputEntryDescription(event.target.value)}
				placeholder="Enter Entry Description"
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
export default AddEntry
