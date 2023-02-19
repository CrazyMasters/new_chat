import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SnackbarProvider} from "notistack";
import {store} from './components/store/store'
import {Provider} from 'react-redux'
import {SnackbarCloseButton} from "./components/hooks/snackbar/useEnqueueSnackbar";
import {ThemeProvider} from "@mui/material";
import {theme} from "./components/theme/theme";

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3} autoHideDuration={10000}
                          action={(key) => <SnackbarCloseButton snackbarKey={key}/>}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
)
;

reportWebVitals();
