import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Star from '@material-ui/icons/Star';

const styles = {
  line: {
    display: 'flex',
    justifyContent: 'left',
    position: 'relative',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '14px',
    paddingBottom: '14px',
    borderBottom: '1px solid #eeeeee',
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    position: 'relative',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
  col1: {
    flexGrow: 1,
    justifyContent: 'left',
    textAlign: 'left',
  },
  col3: {
    flexGrow: 3,
    justifyContent: 'left',
    paddingLeft: '12px',
    paddingRight: '17px',
  },
  col3Non: {
    flexGrow: 3,
    justifyContent: 'left',
  },
  reviewPhoto: {
    width: '90px',
    height: '90px',
    borderRadius: '2px',
  },
  left: {
    float: 'left',
  },
  right: {
    postion: 'relative',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  fontSize12: {
    fontSize: '12px',
  },
  fontSize13: {
    fontSize: '13px',
  },
  fontSize14: {
    fontSize: '14px',
  },
  leftPadding6: {
    paddingLeft: '6px',
  },
  leftPadding10: {
    paddingLeft: '10px',
  },
  leftpadding12: {
    paddingLeft: '12px',
  },
  leftpadding16: {
    paddingLeft: '16px',
  },
  colBottom: {
    dispaly: 'inline-block',
    verticalAlign: 'bottom',
    linHeight: 1,
  },
  topRow: {
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.25',
  },
  userName: {
    // fontFamily: 'SFProText',
    // fontWeight: '500',
    color: '#7c7c7c',
  },
  update: {
    // fontFamily: 'AppleSDGothicNeo',
    // fontWeight: '300',
    color: '#aaaaaa',
  },
  follow: {
    marginLeft: 'auto',
    // fontFamily: 'AppleSDGothicNeo',
    color: '#6d9fcc',
  },
  title: {
    textAlign: 'left',
    color: '#111111',
  },
  ingTrue: {
    color: '#1591ff',
  },
  ingFalse: {
    color: '#aaaaaa',
  },
  saveAlt: {
    display: 'inline-block',
    textAlign: 'left',
    color: '#aaaaaa',
  },
  star: {
    color: '#7c7c7c',
  },
};

function ReviewContainer(props) {
  const { classes } = props;
  return (
    <div className={classes.line}>
      <span className={classes.col1}>
        <img alt="" className={classes.reviewPhoto} src={props.data.imgUrl} />
      </span>
      <span className={classes.col3}>
        <div
          className={classNames(
            classes.row,
            classes.topRow,
            classes.fontSize12,
          )}
        >
          <span className={classNames(classes.left, classes.userName)}>
            {props.data.userName}
          </span>
          <span className={classNames(classes.leftPadding10, classes.update)}>
            {props.data.update}
          </span>
          <span className={classNames(classes.follow)}>팔로우</span>
        </div>
        <div
          className={classNames(
            classes.row,
            classes.title,
            classes.fontSize14,
            classes.paddingBottom,
          )}
        >
          {props.data.title}
        </div>
        <div className={classNames(classes.row, classes.fontSize13)}>
          <div className={classNames(classes.left, classes.col1)}>
            <span
              className={
                props.data.ingBoolean ? classes.ingTrue : classes.ingFalse
              }
            >
              <CheckCircleOutline style={{ fontSize: 13 }} />
              <span className={classes.leftPadding6}>진행중</span>
            </span>
          </div>
          <div className={classNames(classes.right, classes.col3Non)}>
            <span className={classNames(classes.col1, classes.saveAlt)}>
              <SaveAlt style={{ fontSize: 13 }} />
              <span className={classes.leftPadding6}>
                {props.data.exportsCnt}
              </span>
            </span>
            <span
              className={(classes.col1, classes.star, classes.leftpadding16)}
            >
              <Star style={{ fontSize: 13 }} />
              <span className={classes.leftPadding6}>{props.data.starAvg}</span>
            </span>
          </div>
        </div>
      </span>
    </div>
  );
}

export default withStyles(styles)(ReviewContainer);