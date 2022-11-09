import "../styles/myEnvsPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import ShowEnvironment from "../components/showEnvironment";
export default function EnvsPage() {
    return (
        <div id="myenvs-page" className="myEnvsPage">
            <ShowEnvironment />
        </div>
    );
}