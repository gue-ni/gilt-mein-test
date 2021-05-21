import React, { useState } from "react";
import Status from "./Status";
import "./Test.css";

function Test() {
    const tests = [
        {
            name: "Schnelltest in Teststraße",
            validFor: 48,
        },
        {
            name: "PCR-Test in Gurgelbox",
            validFor: 72,
        },
        {
            name: "PCR-Test zu Hause",
            validFor: 72,
        },
        {
            name: "Antigen-Selbst-Test",
            validFor: 24,
        },
    ];

    const options = tests.map((test, index) => (
        <option key={index} value={index}>
            {test.name}
        </option>
    ));

    function dateInput(event) {
        const date = new Date(event.target.value);

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
        //console.log(date);
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
        <div className="Test">
            <div>
                <h3>Wann war der Test?</h3>
                <input
                    type="datetime-local"
                    id="test-time"
                    name="test-time"
                    value={formatDate(testDate)}
                    min="2020-03-07T00:00"
                    max={formatDate(new Date())}
                    onChange={(event) => dateInput(event)}
                ></input>
                <p>
                    Der Test war am<b> {testDate.toLocaleString("de-AT")}</b>, vor
                    <b> {calcHourDiff(new Date(), testDate)} </b> Stunden.
                </p>
            </div>

            <br />

            <div>
                <h3>Was für ein Test war es?</h3>
                <select id="testType" onChange={(event) => typeInput(event)} defaultValue={storedIndex || 0}>
                    {options}
                </select>
            </div>

            <div>
                <p>
                    <b> {testType.name || "?"} </b> ist gültig für <b>{testType.validFor || "?"}</b> Stunden.
                </p>
                <Status
                    valid={calcHourDiff(new Date(), testDate) <= testType.validFor - 1}
                    validFor={testType.validFor - calcHourDiff(new Date(), testDate)}
                />
            </div>
        </div>
    );
}

export default Test;
