import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTitle } from '../modules/metadata';
import { fetchPage } from '../modules/page';

class Async extends Component {
  static fetchData({ dispatch }, match) {
    return dispatch(fetchPage(match.params.page)).then(result => dispatch(setTitle(result.title)));
  }

  componentDidMount() {
    this.props.fetchPage();
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

Async.defaultProps = {
  title: null,
  content: null,
};

Async.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  title: PropTypes.node,
  content: PropTypes.node,
};

function mapDispatchToProps(dispatch, ownProps) {
  const page = ownProps.match.params.page;
  return {
    fetchPage() {
      return dispatch(fetchPage(page)).then(result => dispatch(setTitle(result.title)));
    },
  };
}

const AsyncPage = connect(state => state.page, mapDispatchToProps)(Async);

export default AsyncPage;

