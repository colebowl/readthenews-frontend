import React from 'react';
import { Box, Nav } from 'grommet';
import { useLocation } from 'react-router-dom';

import {
  Inbox as InboxIcon,
  Calendar as CalendarIcon,
} from "grommet-icons"

import SubscriptionsAccordion from './SubscriptionsAccordion';
import AnchorLink from '../shared/ui/AnchorLink';
import useSelectedSubscription from '../../hooks/subscriptions/useSelectedSubscription';

interface Props { }

const SideBar: React.FC<Props> = () => {
  const location = useLocation();
  const { setSelectedSubscription } = useSelectedSubscription();

  const handleLinkClick = () => {
    setSelectedSubscription(undefined);
  };

  return (
    <Box
      gridArea="left"
      flex="grow"
      // pad="small"
      background={{ dark: 'dark-2', light: 'light-1' }}
      fill
    // border={{
    //   color: { 'dark': 'dark-3', light: 'light-4' },
    //   side: 'right'
    // }}
    >
      <Nav margin={{ top: "medium", horizontal: "small" }}>
        <Box background={location.pathname === '/unread' ? 'light-3' : undefined} pad="small" round="xsmall">
          <AnchorLink
            onClick={handleLinkClick}
            to="/unread"
            label="Unread"
            margin={{ bottom: 'none' }}
            icon={<InboxIcon />}
            size="small"
            color={{
              dark: `light-${location.pathname === '/unread' ? '2' : '6'}`,
              light: `dark-${location.pathname === '/unread' ? '2' : '6'}`
            }}
          />
        </Box>
        <Box background={location.pathname === '/today' ? 'light-3' : undefined} pad="small" round="xsmall">
          <AnchorLink
            onClick={handleLinkClick}
            margin={{ bottom: 'none' }}
            to="/today"
            label="Today"
            icon={<CalendarIcon />}
            size="small"
            color={{
              dark: `light-${location.pathname === '/today' ? '2' : '6'}`,
              light: `dark-${location.pathname === '/today' ? '2' : '6'}`
            }}
          />
        </Box>
      </Nav>
      <Box fill pad="small">
        <SubscriptionsAccordion />
      </Box>
    </Box>
  )
};

export default SideBar;
