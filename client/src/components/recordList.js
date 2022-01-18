import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
	<tr>
	<td>{props.record.person_name}</td>
	<td>{props.record.person_position}</td>
	<td>{props.record.person_level}</td>
	<td>
		<Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | 
		<button className="btn btn-link" onClick={() => {
			props.deleteRecord(props.record._id);
		}}>Delete</button>
	</td>
	</tr>
);

export default function RecordList() {
	const [records, setRecords] = useState([]);

	// this fetches the records from the db
	useEffect(() => {
		async function getRecords() {
			const response = await fetch(`http://localhost:5000/record`);
			if (!response.ok) {
				const message = `An error occured: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const resJson = await response.json();
			setRecords(resJson);
		}

		getRecords();
		return;
	}, [records.length]);

	// this will delete a record
	async function deleteRecord(id) {
		await fetch(`http://localhost:5000/${id}`, {
			method: "DELETE"
		});

		const newRecords = records.filter((el) => el._id !== id);
		setRecords(newRecords);
	}

	// this will map out the records on the table
	function recordList() {
		return records.map((record) => {
			return (
				<Record record={record} deleteRecord={() => deleteRecord(record._id)} key={record._id} />
			);
		});
	}

	// this will display rhe table with the records of individuals
	return (
		<div className="container py-5">
		<h3>Record List</h3>
	     <table className="table table-striped" style={{ marginTop: 20 }}>
	       <thead>
	         <tr>
	           <th>Name</th>
	           <th>Position</th>
	           <th>Level</th>
	           <th>Action</th>
	         </tr>
	       </thead>
	       <tbody>{recordList()}</tbody>
	     </table>
		</div>
	)
}