import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaTags from '../../components/Meta';
import Table from 'react-bootstrap/Table'
import './style.css';
import IPTracer from '../../components/IP-Location';


function Terms() {
    return (
    <div>
        <IPTracer/>
        <Container className="terms">
            <Row>
                <h1  className="terms-heading"> PRIVACY, TERMS, & CONDITIONS</h1>
            </Row>
            <Row >
                <Col xs={3} md={4}>
                    <h2 className="terms-heading">GENERAL</h2>
                </Col>
                <Col xs={9} md={8}>
                    <span>NearMeVaccines takes privacy seriously. Because we gather certain types of information about our users, we want to help you understand what we gather and how we utilize this information. This information applies to all pages located and originating from 'NearMeVaccines' (the "site"). Our goal is to help inform you, the user, of how and why we gather such information and how you can modify or opt-out of such services. Please note you must be over 13 years old to shop or use 'NearMeVaccines'</span>
                </Col>
            </Row>
            <Row >
                <Col xs={3} md={4}>
                    <h2 className="terms-heading">COOKIES & TRACKING</h2>
                </Col>
                <Col xs={9} md={8} className="terms-text">
                    <span>We utilize cookies to make your browsing for information experience more streamlined. 
                    'Cookies' place snippets of information on your web browser to recall previously viewed data more effectively & store data on your local computer.
                    </span>
                    <ul className="terms-list">
                        <li><u>removing cookies:</u>Cookies can be cleared through your browser. Consult the 'help' menu on your browser to learn more about cookies, and how to 'clear' them from your device. Removing cookies does not remove new cookies placed if you revisit the site following the deletion; cookies are placed per visit.</li>
                        <li><u>sources of cookies:</u>The cookies featured on this NearMeVaccines website include cookies that are exclusively issued by us for the purpose of: faster load times, remembering states or cities you've browsed, remembering demographic preferences & details, etc. Other cookies, offered by third-party sites, are used for statistical purposes to ensure we are delivering preferred content to our customers.</li>
                        <li><u>purpose of cookies:</u>We utilize cookies to ensure you have a more user-friendly experience. Cookies are used to track site performance, including load time, interaction with maps, images, listings & details, and the number of visits to our website. Additionally, we utilize cookies & images (which function similar to cookies) for fraud management and cross-channel tracking & updates.</li>
                    </ul>
                    <span>EXAMPLES OF COOKIES</span>
                    <Table className="terms-table" striped bordered responsive="xs" size="md">
                        <thead>
                            <tr>
                            <th>Example of Cookie</th>
                            <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Google Analytics</td>
                            <td>Used to register website performance, including site speed, errors, the type of device used, and cross-device association. No personal identifying information is obtained. Aids us in determining how you found us and general geographic and demographic data. Data is shared with Google Ads and search partners for the purpose of remarketing</td>
                            </tr>
                            <tr>
                            <td>Google Adwords</td>
                            <td>Google Adwords delivers targeted promotions across Google's partner networks & Google.com search results. The cookies provide information to Google to be used in remarketing across multiple websites & platforms, track website interaction and ad performance, and place emphasis on revisitors.</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row >
                <Col xs={3} md={4}>
                    <h2 className="terms-heading">CONDITIONAL USE</h2>
                </Col>
                <Col xs={9} md={8}  className="terms-text">
                    <span>Terms of Use Statement You understand and agree that the owners of this site shall not be liable for any direct, indirect, incidental, consequential or exemplary damages, including but not limited to, damages for loss of profits, data or other intangible losses (even if the owners of this site have been advised of the possibility of such damages), resulting from the use or the inability to use the product(s) and or service(s) or any misuse of the product(s) and or service(s) in a manner not in accordance with their intended use.
IF YOU, FOR YOURSELF OR ON BEHALF OF ONE OR MORE PERSONS YOU ARE REPRESENTING WITH RESPECT TO THESE SERVICES, DO NOT AGREE TO ANY OF THE FOREGOING TERMS, YOU MUST, FOR YOURSELF AND ON BEHALF ANY SUCH PERSON(S), DISCONTINUE THE REGISTRATION PROCESS, DISCONTINUE YOUR USE OF THE SERVICES, AND, IF YOU ARE ALREADY A MEMBER, CANCEL YOUR ACCOUNT. BEGINNING NOW, ANY CONTINUATION BY YOU IN USING THE SERVICES CONSTITUTES FOR YOU AND THOSE REPRESENTED BY YOU AN EXPRESS AFFIRMATION AND COMMITMENT TO BE (OR TO CONTINUE TO BE, AS APPLICABLE) LEGALLY BOUND BY AND TO COMPLY WITH ALL OF THESE TERMS.</span>
                </Col>
            </Row>
            <Row >
                <Col xs={3} md={4}>
                    <h2 className="terms-heading">DISCLAIMER OF WARRANTY</h2>
                </Col>
                <Col xs={9} md={8}  className="terms-text">
                    <span>TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE(S) & CONTENT ARE PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY KIND, IMPLIED OR EXPRESSED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, FITNESS FOR A PARTICULAR PURPOSE, USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED.  WITHOUT LIMITING THE FOREGOING, WE AND OUR MANAGEMENT, OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, SUPPLIERS, PARTNERS, & CONTENT PROVIDERS DO NOT WARRANTY THAT:
(I) THE PRODUCTS, ADVICE, OR SERVICES ARE NOT DEFECTIVE; (II) THE INFORMATION CONTAINED ON THE WEBSITE IS FREE OF ERRORS; (III) THE WEBSITE, SOFTWARE, AND/OR THIRD-PARTY APPLICATIONS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENT, & EXCHANGING CONTENT, INCLUDING UPLOADS, WILL BE UNINTERRUPTED, SECURE, OR FREE OF CODING ERRORS; (IV) ANY DEFECT(S) WILL BE CORRECTED; (V) THE RESULTS OF USING THE SERVICES / PRODUCTS WILL MEET YOUR REQUIREMENTS.  YOUR USE OF THE SERVICES/PRODUCTS IS SOLELY AT YOUR OWN RISK.  SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES, SO THE ABOVE DISCLAIMERS MAY NOT APPLY TO YOU.</span>
                </Col>
            </Row>
            <Row >
                <Col xs={3} md={4}>
                    <h2 className="terms-heading">INDEMNIFICATION</h2>
                </Col>
                <Col xs={9} md={8}  className="terms-text">
                    <span>By using this website, our Services and/or products, you agree to indemnify (release us from legal responsibility), hold harmless and defend 'NearMeVaccines' from any claims, damages, losses, liabilities, and all costs and expenses of defense, including, but not limited to, attorneys' fees, resulting directly or indirectly from a claim by a third-party that arises in connection with use of this Website, Products, or Content by you or any other person accessing this Website on your behalf.</span>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default Terms;