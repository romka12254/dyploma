import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore'
import {toast} from "react-toastify";
import {authErrors} from "../../consts/errorsLabels";
import AuthForm from "../../components/authForm/authForm";
import {db} from "../../services/base";


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const register = async (values) => {
        const {email, password} = values
        try {
            const auth = getAuth()
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            if (user) {
                const {email, uid: id} = user
                await setDoc(doc(db, 'users', id), {
                    email,
                    role: 'regular',
                    ...values,
                })
                dispatch(login({email, id, ...values}))
                navigate('/')

                toast('Ви успішно зареєстрували аккаунт', {
                    type: 'success',
                    theme: 'colored'
                })
            }
        } catch ({code}) {
            toast(authErrors[code] || 'Сталася помилка', {
                type: 'error',
                theme: 'colored'
            })
        }
    }

    return (
        <AuthForm
            header='Реєстрація'
            submit={register}
            link={(
                <Link to='/login'>
                    Вхід
                </Link>
            )}
            isRegister
        />
    );
}

export default Register
