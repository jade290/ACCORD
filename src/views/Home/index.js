/** @module views/Home */

import React from 'react';
import { Alert } from 'react-bootstrap';

import 'views/Home/style.less';

/** returns the home page component */
function Home() {
    return (
        <div id="home">
            <div className="home-about">
                <Alert bsStyle="success">
                    <h3>Version 3.0 of the react-template is Here!</h3>
                    <hr />
                    <ul>
                        <li>
                            react-template has been simplified.
                            <ul>
                                <li>
                                    All example react components have been moved
                                    {' '}to the <b>react-components</b> project.
                                </li>
                                <li>
                                    The NGA <b>bootstrap-theme</b> is still available at
                                    {' '}`./src/bootstrap-theme.less`
                                </li>
                                <li>
                                    GeoAxis integration is still in place
                                </li>
                            </ul>
                        </li>
                        <li>
                            the template{"'"}s file structure has changed.  this
                            {' '}template now utilizes a slightly altered version of the
                            {' '}<b><a href="https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af">Fractal</a></b>
                            {' '}file structure.
                        </li>
                        <li>
                            the template now <b>dynamically renders react-router routes</b>
                            {' '}and Navbar options from a list of registered views.
                            {' '}this makes adding views, or {"'"}pages{"'"}, to your app easier than ever.
                        </li>
                        <li>
                            the template{"'"}s <b>config.json</b> has seen some updates:
                            <ul>
                                <li>
                                    the contact/feedback config object has been
                                    {' '}stripped as this feature was not seeing heavy use.
                                </li>
                                <li>
                                    <b>new config option</b> - <code>useEcobar</code>:
                                    {' '}when set to `true`, will utilize the NGA CDN Ecobar header,
                                    {' '}footer, and classification banners.  when set to `false`,
                                    {' '}will display the footer and classification banners included in
                                    {' '}this react-template.
                                </li>
                                <li>
                                    <b>new config option</b> - <code>maximumSystemClassification</code>:
                                    {' '}string will display in the react-template{"'"}s built in classification
                                    {' '}banners.  This option can be set to empty if the <code>useEcobar</code>
                                    {' '}option is set to true.
                                </li>
                                <li>
                                    <b>new config option</b> - <code>classificationBannerColor</code>:
                                    {' '}string of a css color selector - will change the background color of
                                    {' '}the react-template{"'"}s built in classification banners.  This option can
                                    {' '}be set to empty if the
                                    {' '}<code>useEcobar</code> option is set to true.
                                </li>
                            </ul>
                        </li>
                        <li>
                            the <b>Jenkinsfile</b> has been tweaked to support gitlab-branch specific build steps in
                            {' '}multi-branch pipelines.  More specifically; the config.json file is overwritten
                            {' '}with the config.dev.json file when Jenkins builds the {"'"}master{"'"} branch.
                            {' '}The {"'"}Deploy{"'"} stage in the file is also skipped when building any branch
                            {' '}other than the {"'"}master{"'"} branch.
                        </li>
                        <li>
                            <b>JSdoc</b> has been added to automate documentation of the source code, and the linter has
                            {' '}been commanded to demand jsdoc compliant comments on all applicable classes/methods.
                            {' '}A configurable jsdoc theme is also included.
                        </li>
                    </ul>
                </Alert>
                <Alert bsStyle="warning">
                    <b>This template is a Work in Progress!</b>
                    <br />
                    Contributions are welcome. Please feel free to submit a pull request.
                    <br />
                    If you have encountered a bug or have a feature request, please submit
                    an issue in Gitlab{"'"}s issue tracker
                    <a href="https://gitlab.gs.mil/NGA_TDGI_Templates/react-template/issues">
                        {' '}here
                    </a>.
                </Alert>
                <div className="stack">
                    <h2>STACK</h2>
                    <div className="media-right">
                        <div className="media-body">
                            <a href="https://reactjs.org/">
                                <h5>ReactJS</h5>
                            </a>
                            A component-based JavaScript library for building user interfaces
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media">
                        <div className="media-body">
                            <a href="https://webpack.js.org/">
                                <h5>Webpack</h5>
                            </a>
                            bundles application files for deployment,
                            using <b>Babel</b> to compile <b>ES2015</b> to vanilla JavaScript
                            capable of running in the browser.
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media-right">
                        <div className="media-body">
                            <a href="https://facebook.github.io/jest/">
                                <h5>Jest</h5>
                            </a>
                            provides a low-configuration framework for writing
                            JavaScript unit tests.
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media">
                        <div className="media-body">
                            <a href="https://eslint.org/">
                                <h5>ESlint</h5>
                            </a>
                            checks code compliance against a set of configurable rules,
                            to increase maintainability of the code.
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media-right">
                        <div className="media-body">
                            <a href="https://github.com/airbnb/javascript">
                                <h5>airbnb</h5>
                            </a>
                            TDGIs preferred JavaScript styleguide.  A pre-configured
                            set of rules for ESlint.
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media">
                        <div className="media-body">
                            <a href="https://expressjs.com/">
                                <h5>Express.js</h5>
                            </a>
                            Fast, unopinionated, minimalist web framework for Node.js
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="media">
                        <div className="media-body">
                            <a href="http://usejsdoc.org">
                                <h5>JSDoc</h5>
                            </a>
                            JSDoc 3 is an API documentation generator for JavaScript,
                            {' '}similar to Javadoc or phpDocumentor. You add documentation
                            {' '}comments directly to your source code, right alongside the
                            {' '}code itself. The JSDoc tool will scan your source code and
                            {' '}generate an HTML documentation website for you.
                        </div>
                    </div>
                </div>
                <div className="about">
                    <h2>ABOUT</h2>
                    <b>ReactJS Template project created in accordance with TDGI coding standards.</b>
                    <br />
                    <br />
                    Template source is available to clone at
                    <a href="https://gitlab.gs.mil/NGA_TDGI_Templates/react-template"> .mil GitLab</a>.
                    <br />
                    <hr />
                    <h3>Clone from GitLab</h3>
                    <pre>
                        $ git clone
                        <br />
                        $ cd TDGI_React_Template
                    </pre>
                    <hr />
                    <h3>Start Locally for Development</h3>
                    <pre>
                        $ npm install
                        <br />
                        $ npm start
                    </pre>
                    Open a browser to <i>http://localhost:8080</i>
                    <hr />
                    <h3>Run Unit Tests Locally</h3>
                    <pre>
                        $ npm test
                    </pre>
                    <hr />
                    <h3>Update Unit Test Snapshots</h3>
                    <pre>
                        $ npm test -- -u
                    </pre>
                    <hr />
                    <h3>Build For Production</h3>
                    <pre>
                        $ npm run build
                    </pre>
                    <hr />
                    <h3>Compile Documentation using JSDoc</h3>
                    <pre>
                        $ npm run createDocs
                    </pre>
                    <h3>Open Documentation in Local Browser</h3>
                    <pre>
                        $ npm run openDocs
                    </pre>
                    <hr />
                    <a href="https://gitlab.gs.mil/NGA_TDGI_Templates/react-template/blob/master/README.md">
                        <h3>View the Rest of the Documentation...</h3>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
