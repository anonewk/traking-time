import {CreateEventAction, DeleteEventAction, UpdateEventAction} from "../store/actions/events.action";

export const CreateEvent = data => {
    data.dispatch
    (CreateEventAction(data.initialValues))
    return true;
}
export const UpdateEvent = data => {
    console.log('cc',
        {
            id: data.eventEditSelected.id,
            label: data.formik.getFieldProps('label').value,
            groupLabel: data.eventEditSelected.groupLabel,
            user: data.eventEditSelected.user,
            color: data.colors,
            startHour: data.eventEditSelected.startHour,
            endHour: data.eventEditSelected.endHour,
            date: data.eventEditSelected.date,
            createdAt: data.eventEditSelected.createdAt,
            createdBy: data.user ?? data.user.email.split("@")[0]})
    const startHour = data.formik.getFieldProps('startHour').value.split(':')[0] > 12
        ?
        `${data.formik.getFieldProps('startHour').value  } PM`
        :
        `${data.formik.getFieldProps('startHour').value  } AM`;
    const endHour = data.formik.getFieldProps('endHour').value.split(':')[0] > 12
        ?
        `${data.formik.getFieldProps('endHour').value  } PM`
        :
        `${data.formik.getFieldProps('endHour').value  } AM`;
    /*   data.dispatch(UpdateEventAction({
           id: data.eventEditSelected.id,
           label: data.eventEditSelected.label,
           groupLabel: data.eventEditSelected.groupLabel,
           user: data.eventEditSelected.user,
           color: data.colors,
           startHour: data.eventEditSelected.startHour,
           endHour: data.eventEditSelected.endHour,
           date: data.eventEditSelected.date,
           createdAt: data.eventEditSelected.createdAt,
           createdBy: data.user !== null && data.user.email.split("@")[0]})) */
    return true;
}

export const DeleteEvent = (data) => {
    try{
        data.dispatch
        (DeleteEventAction(data.id));
        return true;
    }
    catch(e){
        console.log(e)
    }

}
