/**
 *
 * SurveyList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import styled from 'styled-components';
import SurveyItem from 'components/SurveyItem';
import SurveyItemTotal from 'components/SurveyItemTotal';

import Divider from '@material-ui/core/Divider';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 0,
  },
  surveyWrap: {
    textAlign: 'center',
    color: '#7c7c7c',
    marginBottom: 19,
    // marginTop: 30,
  },
  surveyTitle: {
    marginBottom: 19,
  },
  divider: {
    marginBottom: 30,
  },
});
/* eslint-disable react/prefer-stateless-function */
class SurveyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // totalRating: 0,
      totalRatingArry: [],
      totalCount: 0,
      // this.props.surveyCate.length + this.props.surveyBuyType.length,
    };
    this.totalRate = this.totalRate.bind(this);
  }
  totalRate = (rating, surveyId) => {
    // console.log(rating);
    // console.log(surveyId);
    let totalCount = 0;
    if (Boolean(this.props.surveyCate) && Boolean(this.props.surveyBuyType)) {
      totalCount =
        this.props.surveyCate.length + this.props.surveyBuyType.length;
    } else if (
      Boolean(this.props.surveyCate) &&
      !Boolean(this.props.surveyBuyType)
    ) {
      totalCount = this.props.surveyCate.length;
    } else if (
      !Boolean(this.props.surveyCate) &&
      Boolean(this.props.surveyBuyType)
    ) {
      totalCount = this.props.surveyBuyType.length;
    }

    const totalRatingArryTmp = [...this.state.totalRatingArry];
    // console.log(totalRatingArryTmp.includes(surveyId));
    if (totalRatingArryTmp.length > 0) {
      let findCount = 0;
      for (let i = 0; i < totalRatingArryTmp.length; i += 1) {
        // console.log(totalRatingArryTmp[i].surveyId);
        if (totalRatingArryTmp[i].surveyId === surveyId) {
          totalRatingArryTmp[i].rating = rating;
          findCount += 1;
        }
      }
      if (findCount === 0) {
        totalRatingArryTmp.push({
          surveyId,
          rating,
        });
      }
    } else {
      totalRatingArryTmp.push({
        surveyId,
        rating,
      });
    }
    // console.log(totalRatingArryTmp);
    // console.log(totalCount);
    this.setState({
      totalCount: totalCount,
      totalRatingArry: totalRatingArryTmp,
    });
    // console.log(this.state.totalRatingArry);
  };

  render() {
    const { classes, surveyCate, surveyBuyType } = this.props;

    // console.log(surveyBuyType);
    return (
      <div className={classes.root}>
        {/* <FormattedMessage {...messages.header} /> */}
        {surveyCate &&
          surveyCate.map((item, index) => (
            <div key={item.surveyId} className={classes.surveyWrap}>
              <div className={classes.surveyTitle}>{item.surveyName}</div>
              <SurveyItem
                starEmptyColor="rgb(184, 237, 226)"
                starRatedColor="rgb(27, 220, 177)"
                starHoverColor="rgb(27, 220, 177)"
                totalRate={this.totalRate}
                surveyId={item.surveyId}
                surveyType="CATEGORY"
                surveyName={item.surveyName}
                sortPosition={index}
              />
            </div>
          ))}
        {surveyBuyType && <Divider className={classes.divider} />}
        {surveyBuyType &&
          surveyBuyType.map((item, index) => (
            <div key={item.surveyId} className={classes.surveyWrap}>
              <div className={classes.surveyTitle}>{item.surveyName}</div>
              <SurveyItem
                starEmptyColor="rgb(254, 226, 188)"
                starRatedColor="rgb(255, 189, 96)"
                starHoverColor="rgb(255, 189, 96)"
                totalRate={this.totalRate}
                surveyId={item.surveyId}
                surveyType="STORE"
                surveyName={item.surveyName}
                sortPosition={index}
              />
            </div>
          ))}
        <Divider className={classes.divider} />

        <div className={classes.surveyWrap}>
          {this.state.totalCount > 0 ? (
            <div className={classes.surveyTitle}>총평가 </div>
          ) : (
            ''
          )}

          <span>
            <SurveyItemTotal
              starEmptyColor="rgb(220, 235, 247)"
              starRatedColor="rgb(21, 145, 255)"
              starHoverColor="rgb(21, 145, 255)"
              totalCount={this.state.totalCount}
              totalRatingArry={this.state.totalRatingArry}
              // surveyId={0}
            />
          </span>
        </div>
      </div>
    );
  }
}

SurveyList.propTypes = {
  surveyCate: PropTypes.array.isRequired,
  surveyBuyType: PropTypes.array.isRequired,
};

// export default SurveyList;
export default withStyles(styles)(SurveyList);
