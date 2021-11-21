import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js").then(function () {
		console.log("Service Worker Registered");
	});
} else {
	console.log("Service Worker not supported");
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
