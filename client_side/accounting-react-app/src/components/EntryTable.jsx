import React, { useState } from 'react';
import './EntryTable.css';

function EntryTable({ entries, setEntries }) {
	const deleteEntryUrl = 'http://localhost:8000/delete_entry/';
    const [expandedRows, setExpandedRows] = useState([]); // Store id of row being expanded

  // This function takes a date, shortens it, then returns it
    function shortenDate(inputDate) {
        console.log(inputDate)
        const dateOnly = inputDate != null ?  inputDate.split(' ')[0]: null;
        const date = new Date(dateOnly); 
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',  // Jan, Feb
            day: 'numeric'   // 1 2 3
        });
    }

    // Function to toggle row expanding/collapsing
	function toggleRowExpanding(clickedRowID) {
		if (expandedRows.includes(clickedRowID)) {
			// Filter out the clicked row from the expanded rows
			setExpandedRows(expandedRows.filter((expandingRowID) => expandingRowID !== clickedRowID));
		} else {
			setExpandedRows([...expandedRows, clickedRowID]); }
	};

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
    };

	async function deleteEntry(entryID) {
		const data = {
			entry_id: entryID
		};

		const sessionToken = localStorage.getItem('token');

		try {
			const res = await fetch(deleteEntryUrl, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${sessionToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			await statusCheck(res);
			setEntries(entries.filter(entry => entry.id !== entryID))
			
		} catch (error){
			console.log(error);
		}
	}

	async function statusCheck(res) {
		if (!res.ok) {
			throw new Error(await res.text());
		}
		return res;
	}

    const listEntries = entries.map((entry) => (
        <React.Fragment key={entry.id}>
            <tr onClick={() => toggleRowExpanding(entry.id)}>
                <td>{shortenDate(entry.entry_date)}</td>
                <td>{entry.description}</td>
				<td>
					<button className="delete-btn" onClick={(e) => 
						{
						e.stopPropagation(); // Prevent row expand when click
						deleteEntry(entry.id);
						}
					}>Delete</button>

				</td>
            </tr>
            {expandedRow(entry)}
        </React.Fragment>
    ));

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
						<th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listEntries}
                </tbody>
            </table>
        </div>
    );
}

export default EntryTable;
