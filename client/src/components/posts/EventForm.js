import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

import { addEvent } from "../../actions/eventActions";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      date: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newPost = {
      title: this.state.title,
      details: this.state.details,
      date: this.state.date
    };
    this.props.addEvent(newPost);
    this.setState({ title: "", date: "", details: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-app text-white">Add New Event</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="Details of your Event"
                  name="details"
                  value={this.state.details}
                  onChange={this.onChange}
                  error={errors.details}
                />
                <TextFieldGroup
                  placeholder="Date MM/DD/YYYY"
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  error={errors.date}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent }
)(EventForm);
