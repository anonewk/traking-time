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
import {faker} from "@faker-js/faker";
import * as Yup from "yup";
import ColorList from "react-color-list"
import {useState} from "react";
import {hideLoader, showError, showLoader} from "../store/actions/application.action";
import groupLabel from "../_mock/groupLabel";
import HandleChange from "../hooks/handleChange";
import {CreateEvent} from "../services/EventsService";
import {CREATE_EVENT_SUCCESS, ERROR} from "../constants/Constants";


const FormDialogCalendar = (props) => {
    const [colors, setColors] = useState(["#f28f6a"])
    const [groupLabelData, setGroupLabelData] = useState('');


    const TaskSchema = Yup.object().shape({
        task: Yup.string("label").required('Champs requis'),
    });
    const formik = useFormik({
        initialValues: {
            id: faker.datatype.uuid(),
            label: '',
            groupLabel: '',
            user: props.user !== null && props.user.email.split("@")[0],
            color: colors,
            startHour: '',
            endHour: '',
            date: '',
            createdAt: new Date(),
            createdBy: props.user !== null && props.user.email.split("@")[0]
        },
        validationSchema: TaskSchema,
        onSubmit:  () => {},
    });
    const { errors, touched, handleReset, getFieldProps } = formik;
    const handleSubmit = (e) => {
        e.preventDefault();
        props.dispatch(showLoader())
        const startHour = formik.getFieldProps('startHour').value.split(':')[0] > 12
            ?
            `${formik.getFieldProps('startHour').value  } PM`
            :
            `${formik.getFieldProps('startHour').value  } AM`;
        const endHour = formik.getFieldProps('endHour').value.split(':')[0] > 12
            ?
            `${formik.getFieldProps('startHour').value  } PM`
            :
            `${formik.getFieldProps('startHour').value  } AM`;
        const initialValues =  {
            id: faker.datatype.uuid(),
            label: formik.getFieldProps('label').value,
            groupLabel: groupLabelData,
            user: props.user !== null && props.user.email.split("@")[0],
            color: colors,
            startHour,
            endHour,
            date: formik.getFieldProps('date').value,
            createdAt: new Date(),
            createdBy: props.user !== null && props.user.email.split("@")[0]
        }

        const createEvent = CreateEvent({initialValues, dispatch: props.dispatch})
        props.handleClose()
        props.dispatch(hideLoader())
        return !createEvent ? props.dispatch(showError(ERROR)) : props.dispatch(showError(CREATE_EVENT_SUCCESS))
    }
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Event</DialogTitle>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onReset={handleReset} onSubmit={(e) => handleSubmit(e)}>
                        <DialogContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    type="text"
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
                                        value={groupLabelData}
                                        label="Status"
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
                                    InputLabelProps={{ shrink: true }}
                                    type={'time'}
                                    label="Heure de départ"
                                    onChange={(e) => console.log(e)}
                                    {...getFieldProps('startHour')}
                                    error={Boolean(touched.startHour && errors.startHour)}
                                    helperText={touched.startHour && errors.startHour}
                                />
                                <TextField
                                    fullWidth
                                    type={'time'}
                                    InputLabelProps={{ shrink: true }}
                                    label="Heure de fin"
                                    {...getFieldProps('endHour')}
                                    error={Boolean(touched.endHour && errors.endHour)}
                                    helperText={touched.endHour && errors.endHour}
                                />
                                <TextField
                                    fullWidth
                                    type={'date'}
                                    InputLabelProps={{ shrink: true }}

                                    label="Date"
                                    {...getFieldProps('date')}
                                    error={Boolean(touched.date && errors.date)}
                                    helperText={touched.date && errors.date}
                                />


                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.handleClose}>Annuler</Button>
                            <LoadingButton  size="large" type="submit" variant="contained" loading={props.applicationReducer.loading}>
                                Ajouter
                            </LoadingButton>
                        </DialogActions>
                    </Form>
                </FormikProvider>

            </Dialog>
        </div>
    );
}
export default FormDialogCalendar;
