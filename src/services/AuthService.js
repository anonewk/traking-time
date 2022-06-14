import {SignUpAction, SignInAction} from "../store/actions/auth.action";

export const SignIn =  (data) => {
    if(data.authReducer.user.email === data.formik.getFieldProps('email').value &&
        data.authReducer.user.password === data.formik.getFieldProps('password').value
    ){
         data.dispatch
        (SignInAction({email: data.formik.getFieldProps('email').value, password: data.formik.getFieldProps('password').value}))
        data.navigate('/dashboard/app', { replace: true });
        return true;
    }
    return false;
}
export const SignUp = (data) => {
    data.dispatch
    (SignUpAction({email: data.formik.getFieldProps('email').value, password: data.formik.getFieldProps('password').value}))
    data.navigate('/dashboard/app', { replace: true });
}
