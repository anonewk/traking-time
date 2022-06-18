import { useState, useEffect } from 'react';
// material
import {Button, Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import CountdownTimer from "../components/CountdownTimer";
// mock

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [start, setStart] = useState(false)
  const [pause, setPause] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    if(start){
      const token = setInterval(() => {
        updateTime()
        updateTimeMinutes()
        updateTimeHours()
      }, 1000)
      if(pause){
        clearInterval(token);
      }
      if(reset){
        clearInterval(token);
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setStart(false)
        setReset(false)
      }
      return function cleanUp() {
        clearInterval(token);
      }
    }
  }, [start, pause, reset, seconds, hours])

  const updateTime = () => {
    setSeconds(seconds =>  seconds !== 59 ? seconds + 1 : 0)
  }
  const updateTimeMinutes = () => {
    if(seconds === 59) {
      setMinutes(minutes =>  minutes + 1 )
    }
  }
  const updateTimeHours = () => {
    if(minutes === 59) {
      setHours(hours =>  hours + 1 )
    }
  }
  const onTimer = () => {
    setStart(true);
  }
  const onPause = () => {
    setPause(true)
  }
  const onReset = () => {
    setReset(true)
  }

  return (
      <Page title="Dashboard: Products">
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Count timer
          </Typography>
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <Button variant="contained" onClick={onTimer}>
                Start
              </Button>
              <Button variant="contained" onClick={onPause}>
                Pause
              </Button>
              <div>
                <p> time: {minutes}:{seconds}</p>
              </div>
              <Button variant="contained"  onClick={onReset}>
                end
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Page>
  );
}
