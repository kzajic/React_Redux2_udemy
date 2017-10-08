import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; // react-router feature
        this.props.fetchPost(id)
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            //programatic navigation, callback after post has been successfully deleted
            this.props.history.push('/');
        });
    }

    render() {
        //***posts[this.props.match.params.id];
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }


        return (
            <div>
                <Link to='/'>Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                > Delete Posts
                </button>
                <h3>{post.title}</h3>
                <h6>{post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    //***return { posts };
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost })(PostsShow);