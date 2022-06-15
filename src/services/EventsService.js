import {CreateEventAction, DeleteEventAction, UpdateEventAction} from "../store/actions/events.action";

export const CreateEvent = data => {
    data.dispatch
    (CreateEventAction(data.initialValues))
    return true;
}
export const UpdateEvent = data => {
    data.dispatch(UpdateEventAction({
        id: data.taskEditSelected.id,
        task: data.formik.getFieldProps('task').value ?? data.taskEditSelected.task,
        timeSpent: data.formik.getFieldProps('timeSpent').value ?? data.taskEditSelected.timeSpent,
        createdAt:  data.taskEditSelected.createdAt,
        status: data.status ?? data.taskEditSelected.status,
        updatedAt: new Date(),
    }))
    return true;
}

export const DeleteEvent = (data) => {
    data.dispatch
    (DeleteEventAction(data.id));
    return true;
}
