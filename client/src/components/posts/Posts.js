import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import EventCalendar from "react-event-calendar";

class Posts extends Component {
  state = {
    events: [
      {
        start: "2015-07-20",
        end: "2015-07-02",
        title: "test event",
        description: "This is a test description of an event"
      },
      {
        start: "2015-07-19",
        end: "2015-07-25",
        title: "test event",
        description: "This is a test description of an event",
        data: "you can add what ever random data you may want to use later"
      }
    ]
  };
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
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
              <EventCalendar
                month={7}
                year={2015}
                events={this.state.events}
                onEventClick={(ref, eventData) => console.log(eventData)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
