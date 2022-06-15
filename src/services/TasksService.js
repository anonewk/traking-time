import {CreateTaskAction, DeleteTaskAction, UpdateTaskAction} from "../store/actions/tasks.action";

export const CreateTask = data => {
    data.dispatch
    (CreateTaskAction({
        id: data.formik.getFieldProps('id').value,
        task: data.formik.getFieldProps('task').value,
        timeSpent: data.formik.getFieldProps('timeSpent').value,
        status: data.status,
        createdAt: data.formik.getFieldProps('createdAt').value,
        updatedAt: data.formik.getFieldProps('updatedAt').value,
    }))
    return true;
}
export const UpdateTask = data => {
    data.dispatch(UpdateTaskAction({
        id: data.taskEditSelected.id,
        task: data.formik.getFieldProps('task').value ?? data.taskEditSelected.task,
        timeSpent: data.formik.getFieldProps('timeSpent').value ?? data.taskEditSelected.timeSpent,
        createdAt:  data.taskEditSelected.createdAt,
        status: data.status ?? data.taskEditSelected.status,
        updatedAt: new Date(),
    }))
    return true;
}

export const DeleteTask = (data) => {
    data.dispatch
    (DeleteTaskAction(data.id));
    return true;
}
