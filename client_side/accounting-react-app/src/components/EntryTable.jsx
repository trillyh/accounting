import {useState} from 'react';
import './EntryTable.css';

function EntryTable({entries}) {
	const [showSubEntriesRow, setShowSubEntriesRow] = useState([])

	function shortenDate(inputDate) {
		const date = new Date(inputDate);

		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}

		// Shorten the date using toLocaleDateString
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',  // Jan, Feb
			day: 'numeric'  // 1 2 3
		});
	}

	const listEntries = entries.map((entry) =>
		<tr key={entry.id}>
			<td>{shortenDate(entry.date)}</td>
			<td>{entry.description}</td>
		</tr>
	)

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th>Entry Type</th>
						<th>Entry Description</th>
					</tr>
				</thead>
				<tbody>
					{listEntries}
				</tbody>
			</table>	


		</div>
	)
}

export default EntryTable
