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
import { faker } from '@faker-js/faker';
import {hideLoader, showError, showLoader} from "../store/actions/application.action";
import {CREATE_TASK_SUCCESS, ERROR} from "../constants/Constants";
import {CreateTask} from "../services/TasksService";



const FormDialog = (props) => {

    const [status, setStatus] = React.useState('');
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const TaskSchema = Yup.object().shape({
        task: Yup.string().required('Champs requis'),
    });
    const formik = useFormik({
        initialValues: {
            id:  faker.datatype.uuid(),
            task: '',
            timeSpent: '',
            createdAt: new Date(),
            updatedAt: '',
            status: '',
        },
        validationSchema: TaskSchema,
        onSubmit:  () => {
            props.dispatch(showLoader())
            const newTask = CreateTask({formik, dispatch: props.dispatch, status});
            props.dispatch(hideLoader())
            props.handleClose()
            return !newTask ? props.dispatch(showError(ERROR)) : props.dispatch(showError(CREATE_TASK_SUCCESS))
        },
    });
    const { errors, touched, handleReset, handleSubmit, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Task</DialogTitle>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onReset={handleReset} onSubmit={handleSubmit}>
                        <DialogContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Tâche"
                                    {...getFieldProps('task')}
                                    error={Boolean(touched.task && errors.task)}
                                    helperText={touched.task && errors.task}
                                />
                                <TextField
                                    fullWidth
                                    autoComplete="time-spend"
                                    type={'time'}
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
export default FormDialog;
