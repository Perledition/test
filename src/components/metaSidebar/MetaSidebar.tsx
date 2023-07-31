
/* eslint-disable */
import Grid from '@mui/material/Grid';
import CountChart, {ChartElement} from '../countChart/CountChart';

import './MetaSidebar.css';


export interface MetaData {
    PER: ChartElement[];
    LOC: ChartElement[];
    ELSE: ChartElement[];
}

/*                <Grid item xs={12} className="meta-sectionTitle">
                    <h4>Sentiment</h4>
                </Grid>
                <Grid item xs={12} className="meta-grid">
                    <Paper className="meta-paper">
                        <div className="sentiment-box">
                            <img src="https://em-content.zobj.net/thumbs/72/apple/354/smiling-face-with-smiling-eyes_1f60a.png" height="40px" width="40px"/>
                        </div>
                        <div className="sentiment-box">
                            <p>Positive</p>
                            <h2 id="positive">80%</h2>
                        </div>
                    </Paper>
                </Grid>
                -->
*/

export default function MetaSidebar({PER, LOC, ELSE}: MetaData) {
    return (
        <div className="meta-root">
            <Grid container>
            </Grid>
                <Grid item xs={12} className="meta-sectionTitle">
                    <h4>Personen</h4>
                    <Grid className="chart-container" item xs={12}>
                        <CountChart entity={'PER'}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="meta-sectionTitle">
                    <h4>Orte</h4>
                    <Grid className="chart-container" item xs={12}>
                        <CountChart  entity={"LOC"}/>
                    </Grid>
                </Grid>
        </div>
    );
}