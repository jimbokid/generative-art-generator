import React, {useRef, useState} from 'react';
import Sketch from "react-p5";
import Settings from "./components/Settings";
import {draw} from "./utils/draw";
import './styles/appStyles.scss'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {PALLETE_OPTIONS} from "./constants/appConstants";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';

const App = () => {
  const [settings, setSettings] = useState({
    pallet: '003049,d62828,f77f00,fcbf49,eae2b7',
    palletSelect: JSON.stringify(PALLETE_OPTIONS[0]),
    countBlockLoops: 120,
    blockGradient: false,
    drawFinalCircles: true,
    countFinalCircles: 10,
    canvasWidth: window.screen.width,
    canvasHeight: window.screen.height,
    finalVerticalLines: true,
    finalVerticalLinesCount: 20,
    finalHorizontalLines: true,
    finalHorizontalLinesCount: 10,
    anaglyph: false,
    shadows: false,
    palletGradient: true,
    animation: false,
    frameRate: 25
  });

  const p5ref = useRef();

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(settings.canvasWidth, settings.canvasHeight).parent(canvasParentRef);
    p5.noLoop();
  };

  const drawCanvas = (settings) => {
    setSettings(settings)
    p5ref.current.sketch.draw()
  }

  const saveCanvas = () => {
    p5ref.current.sketch.saveCanvas('Generated Canvas', 'png')
  }

  return (<Paper variant="outlined" sx={{p: {xs: 2, md: 3}}}>
    <Typography variant="h3" gutterBottom >
      <a href="https://github.com/jimbokid" target={'_blank'}>
        <GitHubIcon fontSize="large" color="primary"/>
      </a>

      Generative Art Generator
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Settings
          settings={settings}
          setSettings={setSettings}
          drawCanvas={drawCanvas}
        />

      </Grid>
      <Grid item xs={12} md={8}>
        <div className={'canvasWrapper'}>
          <Button variant="outlined" type="button" onClick={() => {
            saveCanvas()
          }}
                  style={{
                    marginBottom: 10
                  }}
          >Download </Button>
          <Sketch setup={setup} draw={(p5) => draw(p5, settings)} ref={p5ref} style={{
            width: '100%', height: '100%'
          }}/>
        </div>
      </Grid>
    </Grid>


  </Paper>);
};

export default App;
