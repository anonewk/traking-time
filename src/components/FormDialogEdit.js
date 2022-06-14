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
import * as Yup from "yup";
import {LoadingButton} from "@mui/lab";
import {hideLoader, showError, showLoader} from "../store/actions/application.action";
import {UPDATE_TASK_SUCCESS, ERROR} from "../constants/Constants";
import {UpdateTask} from "../services/TasksService";



const FormDialogEdit = (props) => {
    const [initialValues, setInitialValues] = React.useState({
        id: props.taskEditSelected.id,
        task:  props.taskEditSelected.task,
        timeSpent: props.taskEditSelected.timeSpent,
        createdAt: props.taskEditSelected.createdAt,
        updatedAt: props.taskEditSelected.updatedAt,
        status: props.taskEditSelected.status,
    });
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const formik = useFormik({
        initialValues,
        onSubmit:   () => {
            console.log(formik.getFieldProps('task').value)
            props.dispatch(showLoader())
            const updateTask = UpdateTask({
                formik,
                dispatch: props.dispatch,
                status,
                taskEditSelected: props.taskEditSelected
            });
            props.dispatch(hideLoader())
            props.handleCloseEdit()
            return !updateTask ? props.dispatch(showError(ERROR)) : props.dispatch(showError(UPDATE_TASK_SUCCESS))
        },
    });
    const { errors, touched, handleSubmit, getFieldProps } = formik;
    return (
        <div>
            <Dialog open={props.openEdit} onClose={props.handleCloseEdit}>
                <DialogTitle>Edit task</DialogTitle>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Tâche"
                                    defaultValue={props.taskEditSelected.task}
                                    {...getFieldProps('task')}
                                    error={Boolean(touched.task && errors.task)}
                                    helperText={touched.task && errors.task}
                                />
                                <TextField
                                    fullWidth
                                    autoComplete="time-spend"
                                    type={'time'}
                                    defaultValue={props.taskEditSelected.timeSpent}
                                    label="Temps passé en H"
                                    {...getFieldProps('timeSpent')}
                                    error={Boolean(touched.timeSpent && errors.timeSpent)}
                                    helperText={touched.timeSpent && errors.timeSpent}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        defaultValue={props.taskEditSelected.status}
                                        label="Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'draft'}>Brouillon</MenuItem>
                                        <MenuItem value={"active"}>Active</MenuItem>
                                        <MenuItem value={"finished"}>Terminée</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.handleCloseEdit}>Annuler</Button>
                            <LoadingButton  size="large" type="submit" variant="contained" loading={props.applicationReducer.loading}>
                                Modifier
                            </LoadingButton>
                        </DialogActions>
                    </Form>
                </FormikProvider>

            </Dialog>
        </div>
    );
}
export default FormDialogEdit;
