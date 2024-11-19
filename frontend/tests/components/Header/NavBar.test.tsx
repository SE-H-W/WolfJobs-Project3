import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../../../src/components/Header/NavBar.tsx';
import * as NavItem from '../../../src/components/Header/NavBarItem.tsx';
import { expect } from 'chai';
import { useUserStore } from "../../../src/store/UserStore.ts";
const sinon = require('sinon');

// Mock NavItem as a module
const NavItemMock = () => <span>NavItem Mock</span>;

describe('NavBar Component', function () {
  let navItemStub: sinon.SinonStub;

  describe('when the user is logged out', function () {
    beforeEach(function () {
      // Stubbing the NavItem module to use the mock instead
      navItemStub = sinon.stub(NavItem, 'default').callsFake(NavItemMock);
      render(<NavBar userLoggedIn={false} />);
    });

    afterEach(function () {
      // Restore original behavior of NavItem
      navItemStub.restore();
    });

    it('should not render Profile and Log Out', function () {
      // Check that Profile and Log Out are not rendered
      expect(screen.queryByText('Profile')).to.not.exist;
      expect(screen.queryByText('Log Out')).to.not.exist;
    });
  });

});