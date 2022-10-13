import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../styles/infoCard.css"


export function InfoCard() {
    return (
        <Card id="info-card" className="infoCard" variant="outlined">
            <CardContent className="cardContent">
                <Typography className="statusText"></Typography>
            </CardContent>
        </Card>
    )

}

export default InfoCard;