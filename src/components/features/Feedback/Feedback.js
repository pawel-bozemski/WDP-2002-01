import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Feedback.module.scss';

class Feedback extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className='container'>
          <div className={styles.panelBar}>
            <div className='row no-gutters align-items-end'>
              <div className={'col-auto ' + styles.heading}>
                <h3>Feedback</h3>
              </div>
              <div className='col'></div>
              <div className={'col-auto ' + styles.dots}>
                <ul>
                  <li>
                    <a>page</a>
                  </li>
                  <li>
                    <a>page</a>
                  </li>
                  <li>
                    <a>page</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='row'></div>
        </div>
      </div>
    );
  }
}

export default Feedback;
