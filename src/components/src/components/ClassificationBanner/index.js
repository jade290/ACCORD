/** @module components/ClassificationBanner */

import React from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'config/config.json';

import 'components/ClassificationBanner/style.less';

const DynamicString = 'DYNAMIC CONTENT - HIGHEST POSSIBLE CLASSIFICATION IS: ';

/**
* Displays a classification string on the appropriately colored background
*
* @author Rachel Choate <Rachel.J.Choate@nga.mil>
*/
function ClassificationBanner(props) {
    /** init values; */
    let classBg = 'dimgrey';
    let classColor = 'white';
    let { classification } = props;
    /** use config value if classification is not passed in prop */
    if (!props.classification) classification = `${DynamicString}${CONFIG.maximumSystemClassification}`;
    /** dynamically determine banner color */
    if (classification.toUpperCase().indexOf('UNCLASSIFIED') > -1) {
        classBg = 'green';
    } else if (classification.toUpperCase().indexOf('TOP SECRET') > -1) {
        classBg = 'yellow';
        classColor = 'black';
    } else if (classification.toUpperCase().indexOf('SECRET') > -1) {
        classBg = 'red';
    }
    return (
        <div
            className="classification-banner"
            style={{ background: classBg, color: classColor }}
        >
            {props.classification}
        </div>
    );
}

/**
* @prop {string} classifciation - classification string to display
*/
ClassificationBanner.propTypes = {
    classification: PropTypes.string,
};

ClassificationBanner.defaultProps = {
    classification: null,
};

export default ClassificationBanner;
