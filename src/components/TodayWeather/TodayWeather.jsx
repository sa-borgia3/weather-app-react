import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import { CardContent, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import TodaySpecs from '../TodaySpecs/TodaySpecs';
import DaysWeather from '../DaysWeather/DaysWeather';


const useStyles = makeStyles ({
   root: {
    minWidth: 275,
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
  },
  box:{textAlign:'center'}
});

export default function TodayWeather({data}) {
  const classes = useStyles();

  if(!data.weather){
      return 'Loading...'
  }

    return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={8} md={6} lg={6}>
            <Card className={classes.root}>

            <CardContent className={classes.box} item xs>
                <Typography variant="h1" component="h2" className={classes.title}>{data.city}, {data.country}</Typography>
                <Typography className={classes.title}>{new Date(data.ts * 1000).toLocaleDateString(
              "it-IT"
            )}</Typography>
                <Typography className={classes.title}>{Math.round(data.temp)} °C</Typography>
                <img src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt=""/>
                <Typography className={classes.title}>{data.weather.description}</Typography>
            </CardContent>

            </Card>
        </Grid>
            <TodaySpecs data={data}/>           
        
      </Grid>
       <DaysWeather />             
    </div>
    );
}


