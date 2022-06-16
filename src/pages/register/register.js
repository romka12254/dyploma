import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {toast} from "react-toastify";
import {authErrors} from "../../consts/errorsLabels";
import AuthForm from "../../components/authForm/authForm";


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const register = ({email, password}) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                if (user) {
                    const {email, uid: id} = user
                    dispatch(login({email, id}))
                    navigate('/')

                    toast('Ви успішно зареєстрували аккаунт', {
                        type: 'success',
                        theme: 'colored'
                    })
                }
            })
            .catch(({code}) => {
                toast(authErrors[code] || 'Сталася помилка', {
                    type: 'error',
                    theme: 'colored'
                })
            })
    }

    return (
        <AuthForm
            submit={register}
            link={(
                <Link to='/login'>
                    Вхід
                </Link>
            )}
        />
    );
}

export default Register
