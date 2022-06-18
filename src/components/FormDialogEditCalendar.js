import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    Stack,
    TextField,
    InputLabel,
    Select, MenuItem,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from 'formik';
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import {hideLoader, showError, showLoader} from "../store/actions/application.action";
import {ERROR, UPDATE_EVENT_SUCCESS} from "../constants/Constants";
import HandleChange from "../hooks/handleChange";
import groupLabel from "../_mock/groupLabel";
import {UpdateEvent} from "../services/EventsService";



const FormDialogEditCalendar = (props) => {
    const [selectedDelEdit, setSelectedDelEdit] = useState(false)
    const [colors, setColors] = useState(["#f28f6a"])
    const [groupLabelData, setGroupLabelData] = useState(props.eventEditSelected.groupLabel);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: props.eventEditSelected.id,
            label: props.eventEditSelected.label,
            groupLabel: props.eventEditSelected.groupLabel,
            user: props.eventEditSelected.user,
            color: colors,
            startHour: props.eventEditSelected.startHour.split(' ')[0],
            endHour: props.eventEditSelected.endHour.split(' ')[0],
            date: props.eventEditSelected.date,
            createdAt: props.eventEditSelected.createdAt,
            createdBy: props.user !== null && props.user.email.split("@")[0]
        },
        onSubmit:   () => {
            // props.dispatch(showLoader())
            const updateEvent = UpdateEvent({
                formik,
                dispatch: props.dispatch,
                groupLabelData,
                eventEditSelected: props.eventEditSelected,
                user: props.user
            });
            props.dispatch(hideLoader())
            props.handleCloseEdit()
            return !updateEvent ? props.dispatch(showError(ERROR)) : props.dispatch(showError(UPDATE_EVENT_SUCCESS))
        },
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;
    const getComponent = () => {
        if (selectedDelEdit === 'EDIT') {
            return (
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    value={props.eventEditSelected.label}
                                    label="Label"
                                    {...getFieldProps('label')}
                                    error={Boolean(touched.label && errors.label)}
                                    helperText={touched.label && errors.label}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Groupe label</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={props.eventEditSelected.groupLabel}
                                        label="Group label"
                                        onChange={(e) => HandleChange({setState: setGroupLabelData, event: e})}
                                    >
                                        {
                                            groupLabel.map((item, index) =>
                                                <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    type={'time'}
                                    label="Heure de départ"
                                    value={props.eventEditSelected.startHour.split(' ')[0]}
                                    {...getFieldProps('startHour')}
                                    error={Boolean(touched.startHour && errors.startHour)}
                                    helperText={touched.startHour && errors.startHour}
                                />
                                <TextField
                                    fullWidth
                                    type={'time'}
                                    InputLabelProps={{shrink: true}}
                                    value={props.eventEditSelected.endHour.split(' ')[0]}
                                    label="Heure de fin"
                                    {...getFieldProps('endHour')}
                                    error={Boolean(touched.endHour && errors.endHour)}
                                    helperText={touched.endHour && errors.endHour}
                                />
                                <TextField
                                    fullWidth
                                    type={'date'}
                                    InputLabelProps={{shrink: true}}
                                    value={props.eventEditSelected.date}
                                    label="Date"
                                    {...getFieldProps('date')}
                                    error={Boolean(touched.date && errors.date)}
                                    helperText={touched.date && errors.date}
                                />
                            </Stack>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setSelectedDelEdit(false)}>Annuler</Button>
                            <LoadingButton size="large" type="submit" variant="contained"
                                           loading={props.applicationReducer.loading}>
                                Modifier
                            </LoadingButton>
                        </DialogActions>
                    </Form>
                </FormikProvider>
            )
        }
            return (
                <DialogActions>
                   <Button onClick={() => props.handleDelete({id: props.eventEditSelected.id})}>Supprimer</Button>
                    {
                        selectedDelEdit === 'EDIT' ?
                            <LoadingButton size="large" type="submit" variant="contained"
                                           loading={props.applicationReducer.loading}>
                                Modifier
                            </LoadingButton>
                            :
                            <Button onClick={() => setSelectedDelEdit('EDIT')}>Modifier</Button>

                    }
                </DialogActions>
            )
    }
     return (
        <div>
            <Dialog open={props.openEdit} onClose={props.handleCloseEdit}>
                <DialogTitle>Que voulez-vous faire ?</DialogTitle>
                {getComponent()}
            </Dialog>
        </div>
    );
}
export default FormDialogEditCalendar;
