import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reviewDetailPage state domain
 */

const selectReviewDetailPageDomain = state =>
  state.get('reviewDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReviewDetailPage
 */
const makeSelectReviews = () =>
  createSelector(selectReviewDetailPageDomain, substate =>
    substate.get('reviews'),
  );

const makeSelectReviewId = () =>
  createSelector(selectReviewDetailPageDomain, substate =>
    substate.get('reviewId'),
  );

const makeSelectSurveys = () =>
  createSelector(selectReviewDetailPageDomain, substate =>
    substate.get('surveys'),
  );

const makeSelectError = () =>
  createSelector(selectReviewDetailPageDomain, substate =>
    substate.get('error'),
  );

export {
  selectReviewDetailPageDomain,
  makeSelectReviewId,
  makeSelectReviews,
  makeSelectSurveys,
  makeSelectError,
};
