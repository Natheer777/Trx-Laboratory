import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../assets/logo/new@8x.png'

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth <= 992; // Bootstrap's lg breakpoint

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    
    // تم تغيير الشرط من < 2 إلى < 1 ليعمل البحث من أول حرف
    if (query.length < 1) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      
      const response = await fetch('https://trx-laboratory.com/search.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: query }),
        credentials: 'omit',
        mode: 'cors'
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
        
        if (!response.ok || (data && data.status === 'error')) {
          const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
          console.error('Search error:', errorMessage);
          setSearchResults([{ error: true, message: errorMessage }]);
          return;
        }
        
        // التأكد من أن البيانات هي array قبل تعيينها
        let results = [];
        if (Array.isArray(data)) {
          results = data;
        } else if (data && Array.isArray(data.data)) {
          results = data.data;
        } else if (data && data.results && Array.isArray(data.results)) {
          results = data.results;
        } else if (data) {
          // إذا كانت البيانات object واحد، ضعه في array
          results = [data];
        }
        
        setSearchResults(results);
        
      } catch (parseError) {
        console.error('Error parsing response:', parseError, 'Response:', responseText);
        setSearchResults([{ 
          error: true, 
          message: 'Error processing search results' 
        }]);
      }
    } catch (error) {
      console.error('Search request failed:', error);
      setSearchResults([{ 
        error: true, 
        message: error.message || 'Error connecting to server' 
      }]);
    } finally {
      setIsSearching(false);
    }
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
    { path: '/About', label: 'About Us' },
    { path: '/Article', label: 'Article' },
    // { path: '/Blogs', label: 'Blogs' },
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
        <div className='searchD'>

        <BSNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={toggleNav}
          className="navbar-toggler"
          aria-label="Toggle navigation"
          >
          <div className={`hamburger ${expanded ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </BSNavbar.Toggle>

        <div className="search-icon-container">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSearch}
            className="search-icon"
          >
            <FiSearch className="nav-icon" />
          </motion.div>
                  </div>
        </div>
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

      {/* Search Overlay */}
      {searchOpen && (
        <motion.div 
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
            <div className="search-container">
              <div className="search-header">
                <h3>Search Products</h3>
                <button onClick={toggleSearch} className="close-search">
                  <FaTimes />
                </button>
              </div>
              
              <div className="search-input-container">
                <FiSearch className="search-input-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Type to search..."
                  autoFocus
                  className="search-input"
                />
              </div>
              
              <div className="search-results">
                {isSearching ? (
                  <div className="search-loading">Searching...</div>
                ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
                  <div className="results-grid">
                    {searchResults.map((result, index) => {
                      // التحقق من أن result هو object وليس null أو undefined
                      if (!result || typeof result !== 'object') {
                        return null;
                      }

                      // إذا كان result يحتوي على error
                      if (result.error) {
                        return (
                          <div key={index} className="error-message">
                            {result.message || 'An error occurred'}
                          </div>
                        );
                      }

                      return (
                        <div 
                          key={index} 
                          className="result-item"
                          onClick={() => {
                            if (result.qr_code) {
                              window.open(result.qr_code, '_blank');
                            }
                          }}
                          style={{
                            cursor: result.qr_code ? 'pointer' : 'default',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {result.img_url && (
                            <div className="result-image-container">
                              <img 
                                src={result.img_url} 
                                alt={result.pname || 'Product'} 
                                className="result-image"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="result-content">
                            <h4>{result.pname || 'Product not found'}</h4>
                            {result.qr_code && (
                              <div className="qr-link">
                                Read More<span className="external-link-icon">↗</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : searchQuery.length >= 1 && !isSearching ? (
                  <div className="no-results">No results found</div>
                ) : null}
              </div>
            </div>
        </motion.div>
      )}
    </BSNavbar>
  );
};

export default Navbar;