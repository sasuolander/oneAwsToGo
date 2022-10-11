import "../styles/dummyPage1.css"
import CreateEnvironment from "../components/createEnvironment";

export default function MainPage() {
    return (
        <body>
            <div id="dummy-page1" className="dummyPage1">
                <CreateEnvironment/>
            </div>
        </body>
    );
}