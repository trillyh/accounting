import React, { useState } from 'react';
import './EntryTable.css';

function EntryTable({ entries }) {
    const [expandedRows, setExpandedRows] = useState([]); // Store id of row being expanded

	// This function takes a date, shortens it, then returns it
    function shortenDate(inputDate) {
        const date = new Date(inputDate);
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
    const toggleRowExpanding = (clickedRowID) => {
        if (expandedRows.includes(clickedRowID)) {
            // Filter out the clicked row from the expanded rows
            setExpandedRows(expandedRows.filter((expandingRowID) => expandingRowID !== clickedRowID));
        } else {
            setExpandedRows([...expandedRows, clickedRowID]);
        }
    };

    // Function to render the expanded rows if the row is expanded
    const expandedRow = (entry) => {
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

    const listEntries = entries.map((entry) => (
        <React.Fragment key={entry.id}>
            <tr onClick={() => toggleRowExpanding(entry.id)}>
                <td>{shortenDate(entry.date)}</td>
                <td>{entry.description}</td>
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



