import React from 'react';

import { LinkedinIcon } from 'src/constants/icons';
import {
  APPLE_STORE_URL,
  GOOGLE_STORE_URL,
  LINKEDIN_URL,
  TARMAC_PRIVACY_POLICY_URL,
} from 'src/constants/footer/footer';
import { APP_STORE_ICON, PLAY_STORE_ICON } from 'src/constants/picturePath';

import 'src/styles/Footer.css';

export default function Footer() {
  const actualYear = new Date().getFullYear();
  const privacyPolicySentence = `© ${actualYear} - TarmacTechnologies - Privacy Policy`;

  return (
    <div className="footerContainer">
      <div className="footerContentContainer">
        <div className="footerContent">
          <div className="footerLeftPartContent">
            <div className="footerLeftPartIcon">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                <i className={`${LinkedinIcon} footerIcon fontSizeBig fontColorDefault `} />
              </a>
            </div>
          </div>
          <div className="footerCenterPartContent">
            <a
              href={TARMAC_PRIVACY_POLICY_URL}
              className="footerCenterContent fontSizeDefaultBold fontColorDefault"
              target="_blank"
              rel="noreferrer"
            >
              {privacyPolicySentence}
            </a>
          </div>
          <div className="footerRightPartContent">
            <div className="footerRightPartIcons">
              <a
                href={APPLE_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
                <img src={APP_STORE_ICON} alt="appStoreLogo" className="footerRightPartGoogle" />
              </a>
              <a
                href={GOOGLE_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
                <img src={PLAY_STORE_ICON} alt="playStoreLogo" className="footerRightPartGoogle" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
