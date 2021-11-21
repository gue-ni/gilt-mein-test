import React, { useState } from "react";
import Status from "./Status";

export default function Calculator() {
	const tests = [
		{
			name: "PCR-Test in Gurgelbox",
			validFor: 48,
		},
		{
			name: "Antigen-Test in Gurgelbox",
			validFor: 24,
		},

		{
			name: "Wien Gurgelt PCR-Test",
			validFor: 48,
		},
	];

	const options = tests.map((test, index) => (
		<option key={index} value={index}>
			{test.name}
		</option>
	));

	function dateInput(value) {
		const date = new Date(value);

		if (new Date().getTime() - date.getTime() < 0) {
			return;
		}

		window.localStorage.setItem("testDate_12345", date);
		setTestDate(date);
	}

	function typeInput(event) {
		window.localStorage.setItem("testType_12345", event.target.value);
		setTestType(tests[event.target.value]);
	}

	function calcHourDiff(t1, t2) {
		return Math.floor(Math.abs(t1.getTime() - t2.getTime()) / 36e5);
	}

	function formatDate(date) {
		let [month, day, year] = date
			.toLocaleDateString("en-US", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.split("/");

		let [hour, minute] = date
			.toLocaleTimeString("en-US", {
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
			})
			.split(/:| /);

		return `${year}-${month}-${day}T${hour}:${minute}`;
	}

	let storedDate = window.localStorage.getItem("testDate_12345");
	let tmp = storedDate ? new Date(storedDate) : new Date();
	const [testDate, setTestDate] = useState(tmp);

	let storedIndex = window.localStorage.getItem("testType_12345");
	const [testType, setTestType] = useState(tests[storedIndex || 0]);

	return (
		<div>
			<div className="box">
				<h1>Gilt mein Test?</h1>
			</div>

			<div className="box">
				Wann war der Test?
				<input
					type="datetime-local"
					id="test-time"
					name="test-time"
					value={formatDate(testDate)}
					min="2020-03-07T00:00"
					max={formatDate(new Date())}
					onChange={(event) => dateInput(event.target.value)}
				></input>
				<button onClick={() => dateInput(new Date())}>Jetzt</button>
			</div>

			<div className="box">
				Was für ein Test war es?
				<select id="testType" onChange={(event) => typeInput(event)} defaultValue={storedIndex || 0}>
					{options}
				</select>
				<span>
					gültig für <b>{testType.validFor || "?"}</b> Stunden.
				</span>
			</div>
			<div className="box">
				<Status
					valid={calcHourDiff(new Date(), testDate) <= testType.validFor - 1}
					validFor={testType.validFor - calcHourDiff(new Date(), testDate)}
				/>
			</div>
		</div>
	);
}
