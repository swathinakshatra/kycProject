import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleUserSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doUserSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label, className, disabled, icon, onClick) {
    return (
      <div className="">
        <button
          onClick={onClick}
          className={`${className} allbtns `}
          type="submit"
          disabled={disabled}
        >
          {label}
        </button>
        <i className={icon}></i>
      </div>
    );
  }

  renderInput(name, type, id, placeholder, className, maxLength) {
    return (
      <Input
        value={this.state.data[name]}
        onChange={this.handleChange}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
      />
    );
  }
}

export default Form;
