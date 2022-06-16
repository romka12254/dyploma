import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {toast} from "react-toastify";
import {authErrors} from "../../consts/errorsLabels";
import AuthForm from "../../components/authForm/authForm";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const makeLogin = ({email, password}) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                if (user) {
                    const {email, uid: id} = user
                    dispatch(login({email, id}))
                    navigate('/')

                    toast('Ви успішно увійшли в аккаунт', {
                        type: 'success',
                        theme: 'colored'
                    })
                }
            })
            .catch(({code}) => {
                toast(authErrors[code], {
                    type: 'error',
                    theme: 'colored'
                })
            })
    }

    return (
        <AuthForm
            submit={makeLogin}
            link={(
                <Link to='/register'>
                    Реєстрація
                </Link>
            )}
        />
    );
}

export default Login
