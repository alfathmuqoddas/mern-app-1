import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {baseUrl} from "../config";

export default function View() {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
		records: [],
	});
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${baseUrl}/record/${params.id.toString()}`);

			if (!response.ok) {
				const message = `An error has occured: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const record = await response.json();
			if (!record) {
				window.alert(`Record not found`);
				navigate("/");
				return;
			}

			setForm(record);
		}

		fetchData();
		return;
	}, [params.id, navigate]);

	return (
		<>
		<div className="container py-5">
		<h2>{form.name}</h2>
		<br/>
		{form.position}
		<br/>
		{form.level}
		</div>
		</>
	)
}