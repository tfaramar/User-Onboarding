import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);
    console.log(status);

    return (
        <div className="user-form">
            <h1>New Users</h1>
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                 {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                 {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <label className="checkbox-container">
                    Accept Terms of Service
                    <Field
                        type="checkbox"
                        name="serviceterms"
                        checked={values.serviceterms}
                    />
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit</button>

            </Form>
            <div className="users-list">
                {users.map(user => (
                    <p key={user.id}>{user.name}</p>
                ))}
            </div>
        </div>
    )

};

const FormikUserForm = withFormik({
    //mapPropsToValues to connect the data in the form to the handlers for that data
    mapPropsToValues({ name, email, password, serviceterms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            serviceterms: serviceterms || false
        };
    },

    //YUP validation schema
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Please enter your full name.'),
        email: Yup.string()
            .email('This email is not valid.')
            .required('Please enter your email address.'),
        password: Yup.string()
            .min(8, 'Your password must be at least 8 characters long.')
            .required('Please enter a password.'),
        serviceterms: Yup.boolean()

    }),

    //Post to reqres.in test API on submit
    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users/', values)
            .then(res => {
                //console.log(res.data);
                setStatus(res.data);
            })
            .catch(error => console.log(error.response));
    }


})(UserForm);

export default FormikUserForm;