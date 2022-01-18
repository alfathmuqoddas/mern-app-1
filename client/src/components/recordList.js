import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {baseUrl} from "../config";

export default function RecordList() {
	const [records, setRecords] = useState([]);

	// this fetches the records from the db
	useEffect(() => {
		async function getRecords() {
			const response = await fetch(`${baseUrl}/record`);
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
		await fetch(`${baseUrl}/${id}`, {
			method: "DELETE",
		}).then(window.location.reload());
		
		const newRecords = records.filter((el) => el._id !== id);
		setRecords(newRecords);
	}

	// this will display rhe table with the records of individuals
	return (
		<div className="container py-5">
		<h3>Record List</h3>
		<table class="table align-middle">
		<thead>
		    <tr>
		    <th scope="col">Name</th>
		    <th scope="col">Position</th>
		    <th scope="col">Level</th>
		    <th scope="col">Option</th>
		    </tr>
		</thead>
		<tbody>
	    {records.map((record) => 
	    	<tr key={record._id}>
	    	<td><Link to={`/view/${record._id}`} className="text-dark text-decoration-none">{record.name}</Link></td>
	    	<td>{record.position}</td>
	    	<td>{record.level}</td>
	    	<td><Link className="btn btn-sm btn-success me-2" to={`/edit/${record._id}`}>Edit</Link>  
		<button className="btn btn-sm btn-danger" onClick={() => {
			deleteRecord(`${record._id}`);
		}}>Delete</button></td>
	    	</tr>
	    )}
	    </tbody>
	    </table>
		</div>
	)
}