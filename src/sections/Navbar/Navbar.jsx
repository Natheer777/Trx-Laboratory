import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';
import logo from '../../assets/logo/Asset 1@8x.png'
const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth <= 992; // Bootstrap's lg breakpoint

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      label: 'Categories ⌵',
      isDropdown: true,
      items: [
        { path: '/injectables', label: 'INJECTABLES' },
        { path: '/tablets', label: 'TABLETS' }
      ]
    },
    { path: '/Authenticity', label: 'Authenticity' },
    { path: '/Counterfeit', label: 'Counterfeit' },
    { path: '/contact', label: 'Contact' },
    { path: '/Article', label: 'Article' },
    { path: '/Blogs', label: 'Blogs' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <BSNavbar 
      expand="lg" 
      expanded={expanded} 
      className={`custom-navbar ${scrolled ? 'scrolled' : ''} ${expanded ? 'mobile-open' : ''}`}
    >
      <Container>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <BSNavbar.Brand as={Link} to="/" className="navbar-brand" onClick={closeNav}>
            <img 
              src={logo}
              alt="Logo"
              className="logo"
            />
          </BSNavbar.Brand>
        </motion.div>
        
        <BSNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={toggleNav}
          className="navbar-toggler"
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.span
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX className="nav-toggle-icon" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiMenu className="nav-toggle-icon" />
              </motion.span>
            )}
          </AnimatePresence>
        </BSNavbar.Toggle>

        <BSNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav as={motion.div} 
            className="ms-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link, index) =>
              link.isDropdown ? (
                <div className="nav-item dropdown-hover" key={index}>
                  <Dropdown as="div" className="d-inline-block" onMouseEnter={() => !isMobile && setDropdownOpen(true)}
                    onMouseLeave={() => !isMobile && setDropdownOpen(false)}
                    onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}>
                    <Dropdown.Toggle
                      as={motion.div}
                      variants={itemVariants}
                      className={`nav-link ${navLinks.some(l => l.path === location.pathname) ? 'active' : ''}`}
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                      whileTap={!isMobile ? { scale: 0.95 } : {}}
                      style={{ cursor: 'pointer' }}
                      aria-expanded={dropdownOpen}
                    >
                      {link.label}
                      <span className="nav-link-underline"></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={`dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                      {link.items.map((item, itemIndex) => (
                        <Dropdown.Item
                          key={itemIndex}
                          as={Link}
                          to={item.path}
                          onClick={() => {
                            closeNav();
                            setDropdownOpen(false);
                          }}
                          className={location.pathname === item.path ? 'active' : ''}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Nav.Link
                  key={index}
                  as={motion(Link)}
                  variants={itemVariants}
                  to={link.path}
                  onClick={link.onClick || closeNav}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  <span className="nav-link-underline"></span>
                </Nav.Link>
              )
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;