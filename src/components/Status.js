import "./Status.css";

function Status(props) {
    if (props.valid) {
        return (
            <div className="ValidTest">
                <h1 className="status valid">Ja</h1>
                <p>Dein COVID-19 Test gilt noch {props.validFor} Stunden.</p>
            </div>
        );
    } else {
        return (
            <div className="ValidTest">
                <h1 className="status invalid">Nein</h1>
                <p>Dein COVID-19 Test ist nicht mehr gültig.</p>
                <p>
                    <a href="https://coronavirus.wien.gv.at/testangebote/">Hier</a> kannst du einen neuen Termin
                    ausmachen.
                </p>
            </div>
        );
    }
}

export default Status;
