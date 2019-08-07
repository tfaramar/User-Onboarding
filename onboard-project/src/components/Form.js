import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';

const UserForm = () => {


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
                        name="vaccinations"
                        //checked={add checked value}
                        />
                </label>

            </Form>
        </div>
    )

}

export default UserForm;