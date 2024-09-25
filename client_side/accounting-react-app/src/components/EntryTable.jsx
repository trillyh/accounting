import React, { useState } from 'react';
import './EntryTable.css';
import AddEntry from './AddEntry';

function EntryTable({ entries, setEntries }) {
	const createEntryUrl = 'http://127.0.0.1:8000/create_journal_entry/';
	const deleteEntryUrl = 'http://localhost:8000/delete_entry/';
	const [expandedRows, setExpandedRows] = useState([]); // Store id of row being expanded

	// This function takes a date, shortens it, then returns it
	function shortenDate(inputDate) {
		const dateOnly = inputDate != null ? inputDate.split(' ')[0] : null;
		const date = new Date(dateOnly);
		if (isNaN(date.getTime())) {
			return 'Invalid Date';
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short', // Jan, Feb
			day: 'numeric', // 1 2 3
		});
	}

	// Function to toggle row expanding/collapsing
	function toggleRowExpandingOnClick(clickedRowID) {
		if (expandedRows.includes(clickedRowID)) {
			// Filter out the clicked row from the expanded rows
			setExpandedRows(expandedRows.filter((expandingRowID) => expandingRowID !== clickedRowID));
		} else {
			setExpandedRows([...expandedRows, clickedRowID]);
		}
	}

	// Function to render the expanded rows if the row is expanded
	function expandedRow(entry) {
		if (expandedRows.includes(entry.id)) {
			return (
				<>
					<tr className="subentry">
						<td colSpan="2">
							<label>Debit Account: </label>
							<input type="text" placeholder="Enter debit account" />
							<label>Amount: </label>
							<input type="number" placeholder="Enter debit amount" />
						</td>
					</tr>
					<tr className="subentry">
						<td colSpan="2">
							<label>Credit Account: </label>
							<input type="text" placeholder="Enter credit account" />
							<label>Amount: </label>
							<input type="number" placeholder="Enter credit amount" />
						</td>
					</tr>
				</>
			);
		} else {
			return null;
		}
	}

	async function requestDeleteEntry(entryID) {
		const data = {
			entry_id: entryID,
		};

		const sessionToken = localStorage.getItem('token');

		try {
			const res = await fetch(deleteEntryUrl, {
				method: 'POST',
				headers: {
					Authorization: `Token ${sessionToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				throw new Error(await res.text());
			}
			setEntries(entries.filter((entry) => entry.id !== entryID));
		} catch (error) {
			console.log(error.message);
		}
	}

	function addNewEntryToClient(newEntry) {
		setEntries((entries) => {
			const updatedEntries = [newEntry, ...entries];
			return updatedEntries;
		});
	}

	const [dateTime, setDateTime] = useState(() => {
		const current = new Date();
		return current.toISOString().slice(0, 10); // YYYY-MM-DD
	});

	const [inputEntryDescription, setInputEntryDescription] = useState('');

	const requestAddNewEntry = async () => {
		let newEntry = {
			entry_date: dateTime,
			description: inputEntryDescription,
		};

		const sessionToken = localStorage.getItem('token');

		try {
			const res = await fetch(createEntryUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${sessionToken}`,
				},
				body: JSON.stringify(newEntry),
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}

			console.log('added new entry');

			// Take the entry from client, add ID from API response
			const resData = await res.json();
			newEntry['id'] = resData['id'];
			addNewEntryToClient(newEntry);
		} catch (error) {
			console.log(error.message);
		}
	};

	function handleSubmit(e, action, entryID = null) {
		e.preventDefault();

		switch (action) {
			case "submit":
				requestAddNewEntry();
				break;
			case "delete":
				requestDeleteEntry(entryID);
				break;
		}
	}

	// Populate listEntries with all entries, and add them to the body
	const listEntries = entries.map((entry) => (
		<React.Fragment key={entry.id}>
			<tr onClick={() => toggleRowExpandingOnClick(entry.id)}>
				<td>{shortenDate(entry.entry_date)}</td>
				<td>{entry.description}</td>
				<td>
					<button
						className="delete-btn"
						onClick={(e) => {
							e.stopPropagation(); // Prevent row expand when clicked
							handleSubmit(e, 'delete', entry.id); // Call handleSubmit with delete action
						}}
					>
						Delete
					</button>
				</td>
			</tr>
			{expandedRow(entry)}
		</React.Fragment>
	));

	return (
		<div className="table-container">
			<form
				onSubmit={(e) => handleSubmit(e, 'submit')}
			>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>
								<input
									type="date"
									id="date"
									value={dateTime}
									onChange={(e) => setDateTime(e.target.value)}
								/>
							</td>
							<td>
								<input
									type="text"
									value={inputEntryDescription}
									onChange={(e) => setInputEntryDescription(e.target.value)}
									placeholder="Enter Entry Description"
								/>
							</td>
							<td>
								<button type="submit">Submit</button>
							</td>
						</tr>
						{listEntries}
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default EntryTable;

