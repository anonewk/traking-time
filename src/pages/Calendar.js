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
import FormDialogEditCalendar from "../components/FormDialogEditCalendar";
import {UserMoreMenu} from "../sections/@dashboard/user";
import {DeleteEvent} from "../services/EventsService";
import {showError} from "../store/actions/application.action";
import {DELETE_EVENT_SUCCESS, ERROR} from "../constants/Constants";
// ----------------------------------------------------------------------
export default function Calendar(props) {
    const dispatch = useDispatch()
    const eventsReducer = useSelector(state => state.eventsReducer);

    const [reload, setReload] = useState(false);
    useEffect(() => {
        setReload(reload)
    }, [reload])

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
            open: false,
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
    useEffect(() => {
        setState(state)
    }, [state, reload])

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [eventEditSelected, setEventEditSelected] = useState({
        id: '',
        label: '',
        groupLabel: '',
        user: '',
        color: '',
        startHour: '',
        endHour: '',
        date: '',
        createdAt: '',
        createdBy: ''
    });
    useEffect(() => {
        setEventEditSelected(eventEditSelected)
    }, [openEdit, eventEditSelected])

    const [events, setEvents] = useState(useSelector(state => state.eventsReducer));
    useEffect(() => {
        setEvents(eventsReducer);
        console.log('ee', eventsReducer)
        console.log('events, events', events)
    }, [reload, events, eventsReducer, state]);


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
    const handleDelete = (data) => {
        const delEvent = DeleteEvent({id: data.id, dispatch})
        const stateNNew = {
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
                message: "Deleted success" ,
                showActionButton: true,
                showNotification: true,
                delay: 1500
            },
            toolbarProps: {
                showSearchBar: true,
                showSwitchModeButtons: true,
                showDatePicker: true
            }
        }
        setState(stateNNew)
        console.log('s', state)
        setReload(!reload)
        setOpenEdit(false);

    };
    console.log('xx', state)

    const handleSendDataModal = (data) => {
        setEventEditSelected(data)
        handleClickOpenEdit()
    };
    const handleCellClick = (event, row, day) => {
        // Do something...

    }

    const handleEventClick = (event, item) => {
        handleSendDataModal(item)
    }

    const handleEventsChange = (item) => {
        console.log('item handleEventsChange', item)
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
                    events={events}
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
                reload={reload}
                setReload={setReload}
                handleClose={handleClose}
                dispatch={dispatch}
                applicationReducer={props.applicationReducer}
            />
            <FormDialogEditCalendar
                user={props.authReducer.user}
                openEdit={openEdit}
                eventEditSelected={eventEditSelected}
                setOpenEdit={setOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleDelete={handleDelete}
                dispatch={dispatch}
                applicationReducer={props.applicationReducer}
            />
        </Page>
    );
}
