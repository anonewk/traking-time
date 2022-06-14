import {useState} from "react";
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';

import Scheduler from "react-mui-scheduler"
// components
import Page from '../components/Page';
import Iconify from "../components/Iconify";
// ----------------------------------------------------------------------
export default function Calendar() {
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
              <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
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
      </Page>
  );
}
