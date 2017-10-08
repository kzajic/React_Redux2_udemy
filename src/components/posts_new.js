import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : '' }`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        //this === component
        console.log(values);
         //call action creator
        this.props.createPost(values, () => {
            //callback func to go to previes page
             this.props.history.push('/');
        });
    }
    render () {
        const { handleSubmit } = this.props;

        return(
            //onSubmit func.  called when form is valid
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-promary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    //values -> { title: 'fff', categories: 'dddd', content: 'dffff'}
    const errors = {

    }
    //validate the inputs
    if (!values.title) {
        //conects to the filed.name
        errors.title= "Enter a title";
    }
    if (!values.categories) {
        errors.categories= "Enter some categories";
    }
    if (!values.content) {
        errors.content= "Enter some content";
    }
    return errors// if errors is empty, the form is fine to submit
}

export default reduxForm({
    //function callled by reduxForm when user submit form 
    validate, // validate: validate
    //unique string for every form on page
    form: 'PostsNewForm'
}) (
    connect(null, { createPost }) (PostsNew)
);

//connect calls action from action creator