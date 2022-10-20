import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "../styles/progressBar.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function ProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {

  }, []);

  return (
    <Box>
      <Box>
        <LinearProgress id="progress-bar" className="progressBar" variant="determinate" value={progress}/>
      </Box>
      <Box>
        <Typography id="status-message" className="statusMessage"></Typography>
      </Box>
    </Box>
  );
}