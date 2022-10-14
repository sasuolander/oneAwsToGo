import "../styles/mainPage.css"
import CreateEnvironment from "../components/createEnvironment";
import InfoCard from "../components/infoCard";

export default function MainPage() {
    return (
            <div id="main-page" className="mainPage">
                <CreateEnvironment/>
                <InfoCard/>
            </div>
    );
}