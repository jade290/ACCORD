/** @module components/Footer */

import React from 'react';
import ClassificationBanner from 'components/ClassificationBanner';
import NGASeal from 'components/Footer/imgs/NGA_Seal.jpg';
import CONFIG from 'config/config.json';

import 'components/Footer/style.less';

/** renders the application footer if the ecobar is disabled in the config file */
function Footer() {
    return (
        <footer>
            <div id="nga-logo">
                <img src={NGASeal} alt="NGA Logo" />
                NGA
            </div>
            <div id="east-addr">
                <h3>NGA East</h3>
                7500 GEOINT Drive
                <br />
                Springfield, VA 22150
            </div>
            <div id="west-addr">
                <h3>NGA West</h3>
                3200 South Second Street
                <br />
                St. Louis, MO 63118
            </div>
            <div id="arnold-addr">
                <h3>NGA Arnold</h3>
                3838 Vogel Rd
                <br />
                Arnold, MO 63010-6205
            </div>
            <ClassificationBanner classification={CONFIG.maximumSystemClassification} />
        </footer>
    );
}

export default Footer;
