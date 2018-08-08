/**
 *
 * ReviewDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Header from 'components/Header';
import ReviewDetailCard from 'components/ReviewDetailCard';


import {
  makeSelectReviews,
  makeSelectReviewId,
  makeSelectSurveys,
  makeSelectError,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadAction, followAction, voteAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ReviewDetailPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleVoting = this.handleVoting.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    const { loadReview, reviewId } = this.props;
    loadReview(reviewId);
  }

  handleVoting = (reviewId) => {
    console.log("handleVoting in detail");
    console.log(reviewId);
    this.props.doVoting(reviewId);
  }

  handleFollow = (followId) => {
    console.log("handleVoting in detail");
    console.log(followId);
    this.props.doFollow(followId);
  }

  render() {
    // reviewId - detail index
    const { reviews, reviewId, surveys, error } = this.props;

    console.log(']----detail page render ----[');
    // console.log(surveys);
    console.log(error);

    if (reviews !== false) {
      return (
        <div>
          <Header headerTitle="" />
          <ReviewDetailCard reviews={reviews} surveys={surveys} handleVoting={this.handleVoting} handleFollow={this.handleFollow} />
        </div>
      );
    }

    return <div/>;
  }
}

ReviewDetailPage.propTypes = {
  reviews: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // reviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loadReview: PropTypes.func,
  doFollow: PropTypes.func,
  doVoting: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reviews: makeSelectReviews(),
  surveys: makeSelectSurveys(),
  error: makeSelectError(),
  // reviewId: makeSelectReviewId(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReview: reviewId => {
      dispatch(loadAction(reviewId));
    },
    doFollow: followId => {
      dispatch(followAction(followId));
    },
    doVoting: userId => {
      dispatch(voteAction(userId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'reviewDetailPage', reducer });
const withSaga = injectSaga({ key: 'reviewDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReviewDetailPage);
