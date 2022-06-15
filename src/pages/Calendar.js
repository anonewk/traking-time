import {useEffect, useState} from "react";
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography } from '@mui/material';

import Scheduler from "react-mui-scheduler"
// components
import {useDispatch, useSelector} from "react-redux";
import Page from '../components/Page';
import Iconify from "../components/Iconify";
import FormDialogCalendar from "../components/FormDialogCalendar";
// ----------------------------------------------------------------------
export default function Calendar(props) {
    const dispatch = useDispatch()
    const eventsReducer = useSelector(state => state.eventsReducer);


    const [state, setState] = useState({
        options: {
            transitionMode: "zoom", // or fade
            startWeekOn: "mon",     // or sun
            defaultMode: "month",    // or week | day | timeline
            minWidth: 540,
            maxWidth: 540,
            minHeight: 540,
            maxHeight: 540
        },
        alertProps: {
            open: true,
            color: "info",          // info | success | warning | error
            severity: "info",       // info | success | warning | error
            message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥" ,
            showActionButton: true,
            showNotification: true,
            delay: 1500
        },
        toolbarProps: {
            showSearchBar: true,
            showSwitchModeButtons: true,
            showDatePicker: true
        }
    })
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [eventEditSelected, setEventEditSelected] = useState({});
    useEffect(() => {
        setEventEditSelected(eventEditSelected)
    }, [eventEditSelected])
    const events = [
        {
            id: "event-1",
            label: "Medical consultation",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "04:00 AM",
            endHour: "05:00 AM",
            date: "2022-06-14",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-2",
            label: "Medical consultation",
            groupLabel: "Dr Claire Brown",
            user: "Dr Claire Brown",
            color: "#099ce5",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2022-05-09",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-3",
            label: "Medical consultation",
            groupLabel: "Dr Menlendez Hary",
            user: "Dr Menlendez Hary",
            color: "#263686",
            startHour: "13 PM",
            endHour: "14 PM",
            date: "2022-05-10",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-4",
            label: "Consultation prénatale",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "08:00 AM",
            endHour: "09:00 AM",
            date: "2022-05-11",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        /* setTaskEditSelected({}) */
    };
    const handleSendDataModal = (data) => {
        setEventEditSelected(data)
        handleClickOpenEdit()
    };
    const handleCellClick = (event, row, day) => {
        // Do something...
    }

    const handleEventClick = (event, item) => {
        // Do something...
    }

    const handleEventsChange = (item) => {
        // Do something...
    }

    const handleAlertCloseButtonClicked = (item) => {
        // Do something...
    }
    return (
        <Page title="Dashboard: Calendar">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Calendar
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpen(!open)}>
                        New event
                    </Button>
                </Stack>
                <Scheduler
                    locale="fr"
                    events={eventsReducer}
                    legacyStyle={false}
                    options={state?.options}
                    alertProps={state?.alertProps}
                    toolbarProps={state?.toolbarProps}
                    onEventsChange={handleEventsChange}
                    onCellClick={handleCellClick}
                    onTaskClick={handleEventClick}
                    onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
                />
            </Container>
            <FormDialogCalendar
                user={props.authReducer.user}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                dispatch={dispatch}
                applicationReducer={props.applicationReducer}
            />
        </Page>
    );
}
