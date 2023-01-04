import React from 'react';
import Typography from '@mui/material/Typography';
import {Formik, Form} from "formik";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import {Select} from "@mui/material";
import {PALLETE_OPTIONS} from "../constants/appConstants";

const Settings = ({
                    settings, drawCanvas
                  }) => {
  return (<Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
    <Typography variant="h5" component="h5">
      Settings
    </Typography>

    <Formik
      initialValues={settings}
      onSubmit={(values) => {
        drawCanvas(values)
      }}
      enableReinitialize
    >
      {(formikProps) => {
        return (<Form>
          <div>
            <FormGroup>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField label="Pallet"
                             variant="outlined"
                             name={'pallet'}
                             margin="normal"
                             value={formikProps.values.pallet}
                             onChange={formikProps.handleChange}
                             xs={8}
                             fullWidth
                  />

                  <Select
                    name={'palletSelect'}
                    label="Pallet Select"
                    value={formikProps.values.palletSelect}
                    onChange={(e) => {
                      formikProps.setFieldValue('pallet', JSON.parse(e.target.value).join(','))
                      formikProps.handleChange(e)
                    }}
                    className={'palleteSelect'}
                  >
                    {PALLETE_OPTIONS.map(pallete => {
                      return (<MenuItem value={JSON.stringify(pallete)} key={JSON.stringify(pallete)}>
                        <div className={'palleteSelect__wrapper'}>
                          {pallete.map(color => {
                            return (<div style={{
                              background: `#${color}`
                            }}
                                         className={'palleteSelect__item'}
                                         key={`${JSON.stringify(pallete)}-${color}`}
                            >
                            </div>)
                          })}
                        </div>
                      </MenuItem>)
                    })}
                  </Select>
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField label="countBlockLoops"
                             variant="outlined"
                             name={'countBlockLoops'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.countBlockLoops}
                             onChange={formikProps.handleChange}
                             fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField label="Width"
                             variant="outlined"
                             name={'canvasWidth'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.canvasWidth}
                             onChange={formikProps.handleChange}
                             fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField label="Height"
                             variant="outlined"
                             name={'canvasHeight'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.canvasHeight}
                             onChange={formikProps.handleChange}
                             fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel control={<Checkbox checked={formikProps.values.palletGradient}/>}
                                    value={formikProps.values.palletGradient}
                                    label="Pallet Gradient"
                                    name={'palletGradient'}
                                    onChange={formikProps.handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel control={<Checkbox checked={formikProps.values.shadows}/>}
                                    value={formikProps.values.shadows}
                                    label="Shadows"
                                    name={'shadows'}
                                    onChange={formikProps.handleChange}
                  />
                </Grid>
              </Grid>

              {/*<Grid container spacing={3}>*/}

              {/*  /!*<Grid item xs={6} md={4}>*!/*/}
              {/*  /!*  <FormControlLabel control={<Checkbox checked={formikProps.values.animation}/>}*!/*/}
              {/*  /!*                    value={formikProps.values.animation}*!/*/}
              {/*  /!*                    label="animation"*!/*/}
              {/*  /!*                    name={'animation'}*!/*/}
              {/*  /!*                    onChange={formikProps.handleChange}*!/*/}
              {/*  /!*  />*!/*/}

              {/*  /!*  <TextField label="frameRate"*!/*/}
              {/*  /!*             variant="outlined"*!/*/}
              {/*  /!*             name={'frameRate'}*!/*/}
              {/*  /!*             margin="normal"*!/*/}
              {/*  /!*             type={'number'}*!/*/}
              {/*  /!*             max={30}*!/*/}
              {/*  /!*             value={formikProps.values.frameRate}*!/*/}
              {/*  /!*             onChange={formikProps.handleChange}*!/*/}
              {/*  /!*             fullWidth*!/*/}
              {/*  /!*  />*!/*/}
              {/*  /!*</Grid>*!/*/}

              {/*  /!*<Grid item xs={6}>*!/*/}
              {/*  /!*  <FormControlLabel control={<Checkbox checked={formikProps.values.blockGradient}/>}*!/*/}
              {/*  /!*                    value={formikProps.values.blockGradient}*!/*/}
              {/*  /!*                    label="Block Gradient"*!/*/}
              {/*  /!*                    name={'blockGradient'}*!/*/}
              {/*  /!*                    onChange={formikProps.handleChange}*!/*/}
              {/*  /!*  />*!/*/}
              {/*  /!*</Grid>*!/*/}
              {/*  /!*<Grid item xs={6}>*!/*/}
              {/*  /!*  <FormControlLabel control={<Checkbox checked={formikProps.values.anaglyph}/>}*!/*/}
              {/*  /!*                    value={formikProps.values.anaglyph}*!/*/}
              {/*  /!*                    label="Anaglyph"*!/*/}
              {/*  /!*                    name={'anaglyph'}*!/*/}
              {/*  /!*                    onChange={formikProps.handleChange}*!/*/}
              {/*  /!*  />*!/*/}
              {/*  /!*</Grid>*!/*/}

              {/*</Grid>*/}
              <Grid container spacing={3}>

                <Grid item xs={6}>

                  <FormControlLabel control={<Checkbox checked={formikProps.values.finalVerticalLines}/>}
                                    value={formikProps.values.finalVerticalLines}
                                    label="Vertical Lines"
                                    name={'finalVerticalLines'}
                                    onChange={formikProps.handleChange}
                  />
                  <TextField label="Vertical Lines Number"
                             variant="outlined"
                             name={'finalVerticalLinesCount'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.finalVerticalLinesCount}
                             onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel control={<Checkbox checked={formikProps.values.finalHorizontalLines}/>}
                                    value={formikProps.values.finalHorizontalLines}
                                    label="Horizontal Lines"
                                    name={'finalHorizontalLines'}
                                    onChange={formikProps.handleChange}
                  />

                  <TextField label="Horizontal Lines Number"
                             variant="outlined"
                             name={'finalHorizontalLinesCount'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.finalHorizontalLinesCount}
                             onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel control={<Checkbox checked={formikProps.values.drawFinalCircles}/>}
                                    value={formikProps.values.drawFinalCircles}
                                    label="Draw Circles"
                                    name={'drawFinalCircles'}
                                    onChange={formikProps.handleChange}
                  />

                  <TextField label="Circles Number"
                             variant="outlined"
                             name={'countFinalCircles'}
                             margin="normal"
                             type={'number'}
                             value={formikProps.values.countFinalCircles}
                             disabled={!formikProps.values.drawFinalCircles}
                             onChange={formikProps.handleChange}
                  />
                  <Grid/>
                </Grid>
              </Grid>
            </FormGroup>

            <FormGroup>
              <Button variant="outlined" type="submit">Generate 🚀</Button>
            </FormGroup>
          </div>
        </Form>)
      }}
    </Formik>
  </Paper>);
}
  ;

  Settings.propTypes = {
    settings: PropTypes.object, drawCanvas: PropTypes.func
  };

  export default Settings;
