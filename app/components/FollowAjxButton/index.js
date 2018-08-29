/**
 *
 * FollowAjxButton
 *
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import axios from 'axios';

import { updateFollow } from 'containers/Reviews/actions';

const styles = theme => ({
  followBox: {
    paddingRight: '16px',
    paddingTop: '22px',
  },
  buttonText: {
    width: '34px',
    height: '16px',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: '12px',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#1591ff',
  },
  unButtonText: {
    width: '34px',
    height: '16px',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: '12px',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#8fa6bb',
  },
});

/* eslint-disable react/prefer-stateless-function */
class FollowAjxButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followStatus: false,
      followId: null,
      myFollowYn: 0,
    };

    this.requestAjx = this.requestAjx.bind(this);
    this.handleSetFollow = this.handleSetFollow.bind(this);
    this.handleSetUnFollow = this.handleSetUnFollow.bind(this);

    this.state.myFollowYn = props.followYn;
  }

  componentDidMount() {
    // const requestURL = `${process.env.API_URL}/following/exist/${this.props.followId}`;
    // const accessToken = localStorage.getItem('accessToken');
    // const token = `Bearer ${accessToken}`;
    // const options = {
    //   headers: {
    //     Accept: 'application/json;charset=UTF-8',
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Access-Control-Allow-Origin': '*',
    //     'Authorization': token,
    //   },
    // };
    // const data = {};
    // this.request(requestURL, data, options);
  }

  requestAjx = (method, sendType, requestURL, data, options) => {

    const self = this;
    axios({
      method: sendType,
      headers: options,
      url: requestURL,
      data: data,
    })
      .then(function(response) {
        if (method == 'setFollow') {
          self.setState({
            followStatus: 1,
            myFollowYn: 1,
          });
        } else if (method == 'setUnFollow') {
          self.setState({
            followStatus: false,
            myFollowYn: false,
          });
        }        
        return response;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  };

  handleSetFollow(followId) {
    console.log('Set');
    const requestURL = `${process.env.API_URL}/follow`;
    const accessToken = localStorage.getItem('accessToken');
    const token = `Bearer ${accessToken}`;
    const options = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: token,
    };
    const data = JSON.stringify({
      followId: followId,
    });
    this.requestAjx('setFollow', 'POST', requestURL, data, options);
    this.props.dispatch(updateFollow(followId));
  }

  handleSetUnFollow(follodId) {
    console.log('UnSet');
    const requestURL = `${process.env.API_URL}/follow/${follodId}`;
    const accessToken = localStorage.getItem('accessToken');
    const token = `Bearer ${accessToken}`;
    const options = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: token,
    };
    const data = {};
    this.requestAjx('setUnFollow', 'DELETE', requestURL, data, options);
    this.props.dispatch(updateFollow(follodId));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      myFollowYn: nextProps.followYn,
    });
  }

  render() {
    const { classes } = this.props;
    const { followEmail, followId, followYn } = this.props;
    const { followStatus, myFollowYn } = this.state;

    const userEmail = localStorage.getItem('username');
    const bSignIn = userEmail ? true : false;

    if (!followStatus) {
      if (myFollowYn > 0) {
        return (
          <div className={classes.followBox}>
            <Typography
              className={classes.unButtonText}
              onClick={() => {
                this.handleSetUnFollow(followId);
              }}
            >
              <FormattedMessage {...messages.unButtonTitle} />
            </Typography>
          </div>
        );
      }
      if (bSignIn && userEmail == followEmail) {
        return <div className={classes.followBox} />;
      }
      return (
        <div className={classes.followBox}>
          <Typography
            className={classes.buttonText}
            onClick={() => {
              this.handleSetFollow(followId);
            }}
          >
            <FormattedMessage {...messages.buttonTitle} />
          </Typography>
        </div>
      );
    } else {
      if (followStatus > 0) {
        return (
          <div className={classes.followBox}>
            <Typography
              className={classes.unButtonText}
              onClick={() => {
                this.handleSetUnFollow(followId);
              }}
            >
              <FormattedMessage {...messages.unButtonTitle} />
            </Typography>
          </div>
        );
      }
      return (
        <div className={classes.followBox}>
          <Typography
            className={classes.buttonText}
            onClick={() => {
              this.handleSetFollow(followId);
            }}
          >
            <FormattedMessage {...messages.buttonTitle} />
          </Typography>
        </div>
      );
    }
    return <div />;
  }
}

FollowAjxButton.propTypes = {
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(FollowAjxButton);