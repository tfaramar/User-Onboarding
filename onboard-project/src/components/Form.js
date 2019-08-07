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
        <div className="ui container">
            <h1>New Users</h1>
            <Form className="ui form">
                <Field className="field"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field className="field"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field 
                    className="ui selection dropdown"
                    component="select"
                    name="role">
                        <option>Please Select Your Role</option>
                        <option value="captain">Captain</option>
                        <option value="firstmate">First Mate</option>
                        <option value="navigator">Navigator</option>
                        <option value="passenger">Passenger</option>
                    </Field>

                <Field className="field"
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
                        className="field"
                        type="checkbox"
                        name="serviceterms"
                        checked={values.serviceterms}
                    />
                    <span className="ui checkbox" />
                </label>

                <button className="ui button" type="submit">Submit</button>

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
    mapPropsToValues({ name, email, role, password, serviceterms }) {
        return {
            name: name || '',
            email: email || '',
            role: role || '',
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
            .test(
                'is-true',
                'Please agree to the terms of service to continue.',
                value => value === true
            )

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



