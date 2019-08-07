import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {

    const [users, setUsers] = useState([]);
    console.log(users);

    return (
        <div className="user-form">
            <h1>New Users</h1>
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    />

                <Field
                   type="email"
                   name="email"
                   placeholder="Email" 
                    />

                <Field
                   type="password"
                   name="password"
                   placeholder="Password" 
                    />

                <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="serviceterms"
                        //checked={add checked value}
                        />
                </label>

                <button type="submit">Submit</button>

            </Form>
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


})(UserForm);

export default FormikUserForm;