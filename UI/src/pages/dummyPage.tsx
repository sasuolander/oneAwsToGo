import "../styles/dummyPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import ShowEnvironment from "../components/showEnvironment";
export default function DummyPage() {
    return (
        <div id="dummy-page" className="dummyPage">
            <ShowEnvironment />
        </div>
    );
}