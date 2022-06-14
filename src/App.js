// routes
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as React from "react";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ColorAlerts from "./components/ColorAlerts";
import {hideError} from "./store/actions/application.action";
// ----------------------------------------------------------------------

export default function App() {
    const dispatch = useDispatch()
    const applicationReducer = useSelector(state => state.applicationReducer);
    const authReducer = useSelector(state => state.authReducer);
    useEffect(() => {
        if(applicationReducer.error){
            setTimeout(() => dispatch(hideError()), 3000)
        }
    }, [applicationReducer.error])
    return (
    <ThemeProvider>

      <ScrollToTop />
      <BaseOptionChartStyle />

        <Router authReducer={authReducer} applicationReducer={applicationReducer} />
        {
            applicationReducer.error && <ColorAlerts msg={applicationReducer.msg} error={applicationReducer.error} dispatch={dispatch}/>
        }

    </ThemeProvider>
  );
}
