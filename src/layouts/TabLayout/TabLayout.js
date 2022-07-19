// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { AppBar, Tabs, Tab, Box, makeStyles } from '@material-ui/core';
import { Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Auth } from '@cosmotech/core';
import { PrivateRoute, UserInfo, HelpMenu, ErrorBanner } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../config/Languages';
import { SUPPORT_URL, DOCUMENTATION_URL } from '../../config/HelpMenuConfiguration';
import { About } from '../../services/config/Menu';
import profilePlaceholder from '../../assets/profile_placeholder.png';
import { pictureLight } from '../../theme';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    boxSizing: 'border-box',
  },
  logo: {
    display: 'block',
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightBar: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(3)}px`,
  },
  rightBarElement: {
    display: 'block',
    margin: `0 ${theme.spacing(1)}px`,
  },
  tabs: {
    width: '100%',
    maxWidth: '900px',
  },
  tab: {
    minWidth: 0,
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0',
    lineHeight: '15px',
    textAlign: 'center',
    flexGrow: 1,
    opacity: 1,
  },
  barDiv: {
    minHeight: '48px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TabLayout = (props) => {
  const classes = useStyles();
  const { tabs, authenticated, authorized, signInPath, unauthorizedPath, error, clearApplicationErrorMessage } = props;
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const userInfoLabels = {
    language: t('genericcomponent.userinfo.button.change.language'),
    logOut: t('genericcomponent.userinfo.button.logout'),
  };
  const helpLabels = {
    documentation: t('genericcomponent.helpmenu.documentation'),
    support: t('genericcomponent.helpmenu.support'),
    aboutTitle: t('genericcomponent.helpmenu.about'),
    close: t('genericcomponent.dialog.about.button.close'),
  };
  return (
    <>
      <AppBar className={classes.bar}>
        <Box className={classes.barDiv}>
          <Tabs value={location.pathname} className={classes.tabs}>
            {tabs.map((tab) => (
              <Tab
                data-cy={tab.key}
                key={tab.key}
                value={tab.to}
                label={t(tab.label, tab.key)}
                component={Link}
                to={tab.to}
                className={classes.tab}
              />
            ))}
          </Tabs>
          <div className={classes.rightBar}>
            <div className={classes.rightBarElement}>
              <HelpMenu
                documentationUrl={DOCUMENTATION_URL}
                supportUrl={SUPPORT_URL}
                about={About ? <About /> : null}
                labels={helpLabels}
              />
            </div>
            <div className={classes.rightBarElement}>
              <UserInfo
                languages={LANGUAGES}
                changeLanguage={(lang) => i18n.changeLanguage(lang)}
                language={i18n.language}
                labels={userInfoLabels}
                userName={props.userName}
                profilePlaceholder={props.userProfilePic ? props.userProfilePic : profilePlaceholder}
                onLogout={Auth.signOut}
              />
            </div>
            <div className={classes.rightBarElement}>
              <img alt="Cosmo Tech" height="28px" src={pictureLight.darkLogo} className={classes.logo} />
            </div>
          </div>
        </Box>
      </AppBar>
      <Box className={classes.content}>
        {error && (
          <ErrorBanner
            error={error}
            labels={{
              dismissButtonText: t('commoncomponents.banner.button.dismiss', 'Dismiss'),
              tooLongErrorMessage: t(
                'commoncomponents.banner.tooLongErrorMessage',
                // eslint-disable-next-line max-len
                'Detailed error message is too long to be displayed. To read it, please use the COPY button and paste it in your favorite text editor.'
              ),
              secondButtonText: t('commoncomponents.banner.button.copy.label', 'Copy'),
              toggledButtonText: t('commoncomponents.banner.button.copy.copied', 'Copied'),
            }}
            clearErrors={clearApplicationErrorMessage}
          />
        )}
        <Switch>
          {tabs.map((tab) => (
            <PrivateRoute
              key={tab.key}
              path={tab.to}
              render={tab.render}
              authenticated={authenticated}
              authorized={authorized}
              noAuthRedirect={signInPath}
              noPermRedirect={unauthorizedPath}
            />
          ))}
          <Route render={() => <Redirect to="/scenario" />} />
        </Switch>
      </Box>
    </>
  );
};

TabLayout.propTypes = {
  tabs: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authorized: PropTypes.bool.isRequired,
  signInPath: PropTypes.string.isRequired,
  unauthorizedPath: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userProfilePic: PropTypes.string.isRequired,
  error: PropTypes.object,
  clearApplicationErrorMessage: PropTypes.func.isRequired,
};

export default TabLayout;
