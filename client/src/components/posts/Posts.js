import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { getEvents, deleteEvent } from "../../actions/eventActions";
import EventForm from "./EventForm";
import moment from "moment";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getEvents();
  }

  onDeleteClick = e => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      this.props.deleteEvent(e);
    }
  };

  render() {
    const { posts, loading } = this.props.post;
    const { events } = this.props.event;
    let postContent;
    let eventContent;

    console.log("awwwww", this.props);

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    if (events === null || this.props.event.loading) {
      eventContent = <Spinner />;
    } else {
      eventContent = events.map((e, i) => {
        return (
          <li class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{e.title}</h5>
              <small>{moment(e.date).format("MMMM DD, YYYY")}</small>
            </div>
            <p class="mb-1">{e.details}</p>
            {this.props.auth.user.isAdmin ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={this.onDeleteClick.bind(this, e._id)}
              >
                Delete
              </button>
            ) : null}
          </li>
        );
      });
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <PostForm />
              {postContent}
            </div>
            <div className="col-md-4">
              <p>
                {this.props.auth.user.isAdmin ? <EventForm /> : null}
                <h6 className="text-center lead">UPCOMMING EVENTS</h6>
                <ul class="list-group">{eventContent}</ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  event: state.event,
  auth: state.auth,
  profile: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, getEvents, deleteEvent }
)(Posts);
