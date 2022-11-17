import React , {Fragment, useState, useEffect} from 'react'
//import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import {register, clearErrors} from "../../actions/userActions"
import {useNavigate} from "react-router-dom"

export const Register = () => {
    const [user, setUser]= useState({ //creo el usestate para el usuario
        nombre: "",
        email: "",
        password: "",
    })
    const navigate=useNavigate();
    const {nombre, email, password} = user; //asigno los valores del usuario a las variables
    const [avatar, setAvatar] = useState(""); //creo el usestate para el avatar
    const [avatarPreview, setAvatarPreview]= useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg")
    //con un valor por defecto para que se vea en el formulario de registro el avatar 
    //const alert= useAlert();
    const dispatch= useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error])

    const submitHandler = (e) =>{ //funcion para enviar los datos del formulario de registro a la base de datos
        e.preventDefault();

        const formData= new FormData(); //creo un objeto de tipo formdata para enviar los datos del formulario
        formData.set("nombre", nombre); // a formdata seteele lo siguiente, le paso el nombre del usuario, lo identifica con el nombre del campo 
        formData.set("email", email); //seteo el email del usuario
        formData.set("password", password); //seteo paso el password del usuario 
        formData.set("avatar", avatar) //seteo paso el avatar del usuario

        dispatch(register(formData))//le paso el formdata al dispatch para que lo envie al back, register es la acción que se va a ejecutar
    }

    const onChange = e =>{ //cada campo lo validamos con su value
        if (e.target.name === "avatar"){ //si el campo es avatar
            const reader = new FileReader(); //creo un objeto de tipo file reader para leer el archivo que se sube

            reader.onload=()=>{ //cuando se cargue el archivo
                if (reader.readyState ===2){ //si el archivo esta listo
                    setAvatarPreview(reader.result) //seteo el avatar preview con el resultado del archivo
                    setAvatar(reader.result) //seteo el avatar con el resultado del archivo
                }
            }
            reader.readAsDataURL(e.target.files[0]) //leo el archivo que se sube para que se vea en el formulario de registro
            //le asigne una url por defecto para que se vea en el formulario de registro el avatar
        }
        else{ //si el campo no es avatar
            setUser({ ...user, [e.target.name]: e.target.value})  //seteo el usuario con los valores que se van ingresando en el formulario
            //setUser del usestate 
        }
    }

  return (
    <Fragment>
        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
    <Fragment>
            <MetaData title={'Registrar Usuario'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Registrar</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Nombre</label>
                            <input 
                                type="name"
                                id="name_field"
                                className="form-control" 
                                name='nombre'
                                value={nombre} 
                                onChange={onChange} 
                            /> {/*asigno el valor del input al usestate nombre*/} 
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />{/*asigno el valor del input al usestate email*/} 
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />{/*asigno el valor del input al usestate password*/}  
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="Vistar Previa del Avatar"></img>
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Escoger Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            
                        >
                            REGISTRAR
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
  )
}