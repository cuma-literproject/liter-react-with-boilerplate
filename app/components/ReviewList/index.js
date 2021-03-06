/**
 *
 * ReviewList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ReviewCard from 'components/ReviewCard';
import ReviewCardBottomBar from 'containers/ReviewCardBottomBar';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 0,
  },
});

/* eslint-disable react/prefer-stateless-function */
class ReviewList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviewlist: [],
    };
  }
  handleFollow = followId => {
    // console.log('handleFollow clicked--------');
    // console.log(followId);
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.reviews);
    if (nextProps.reviews !== prevState.reviewlist && Boolean(nextProps.reviews)) {
      return {
        reviewlist: prevState.reviewlist.concat(nextProps.reviews.reviews),
      };
    }
    return null;
  }
  render() {
    const { reviews } = this.props;
    // const revies = [1, 2, 3, 4, 5, 6, 7, 8];
    let reviewArray = false;

    if (reviews !== false) {
      // console.log(']=====]review list[=====[');
      // console.log(reviews.reviews);
      reviewArray = reviews.reviews;

      return (
        <div>
          {reviewArray &&
            reviewArray.map((review, idx) => (
              <div key={review.id}>
                <ReviewCard
                  idx={idx}
                  followYn={review.followYn}
                  review={review}
                  handleVoting={this.props.handleVoting}
                  handleFollow={this.handleFollow}
                />
              </div>
            ))}
          {/* <ReviewCardBottomBar /> */}
        </div>
      );
    }

    return (
      <div>
        <Typography>
          <FormattedMessage {...messages.noexistreview} />
        </Typography>
      </div>
    );
  }
}

ReviewList.propTypes = {
  reviews: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  reviewArray: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default withStyles(styles)(ReviewList);
