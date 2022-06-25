import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {toast} from "react-toastify";
import {authErrors} from "../../consts/errorsLabels";
import AuthForm from "../../components/authForm/authForm";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../services/base";
import {setRequest} from "../../redux/reducers/request";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const makeLogin = ({email, password}) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                if (user) {
                    const {uid: id} = user
                    const reqRef = doc(db, 'requests', id)
                    const docRef = doc(db, 'users', id)
                    const docSnap = await getDoc(docRef)
                    const reqSnap = await getDoc(reqRef)

                    if (reqSnap.exists()) {
                        dispatch(setRequest({
                            ...reqSnap.data()
                        }))
                    }

                    if (docSnap.exists()) {
                        dispatch(login({
                            id, ...docSnap.data()
                        }))
                    }
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
            header='Логін'
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
