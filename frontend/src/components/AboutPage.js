import React from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"
import "./styles/AboutPageStyles.css"

export default function AboutPage() {
    return (
        <div className="AboutPage">
            <NavBar/>
            <div className="main">
                <h2>AIR-BAGEL: An Interactive Root cause-Based
                    Anomaly Generator for Event Logs</h2>
                    <p>Abstract—We describe AIR-BAGEL, a tool12 to generate
pseudo-real trace-level anomalies in event logs. Anomalies to be
injected are defined by their root cause, i.e., resource behaviour
or system malfunctioning. For each root cause, several anomaly
types can be specified, e.g., deleting, replacing or moving events in
a trace. Root causes and anomalies have been modelled based on
existing literature on event log cleaning and data quality analysis.
AIR-BAGEL addresses the issue of unavailability of labelled real
world event logs for developing and evaluating event log cleaning
and reconstruction techniques and it represents a step forward
compared to current approaches in the literature that simply
inject different types of anomalies randomly in event logs.
Index Terms—event log, data quality, anomaly, process mining,
event log cleaning.</p>

                    <h3>To read the whole paper: <a href="http://ceur-ws.org/Vol-2703/paperTD5.pdf">here</a></h3>
                    <h3>Check out the Intelligent Enterprises Lab website for <a href="https://iel.unist.ac.kr/">more</a> </h3>
            </div>
            <Footer/>
        </div>
    )
}