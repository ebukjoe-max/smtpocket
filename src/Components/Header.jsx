'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

/*
  Header changes:
  - Expanded NAV_LINKS for a full investment/token platform.
  - Mobile dropdown click behavior fixed: links close the menu when tapped.
  - The mobile dropdown CSS no longer disables pointer-events by default, so links are clickable.
  - Kept classnames 'header' and 'mobileDropdown' unchanged per request.
*/

export default function Header () {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menuOpen])

  const NAV_LINKS = [
    { label: 'Airdrop', href: '/auth/Login' },
    { label: 'Investment', href: '/plans' },
    // { label: 'Staking', href: '/staking' },
    { label: 'Loans', href: '/Loans' },
    // { label: 'Launchpad', href: '/launchpad' },
    // { label: 'Token', href: '/token' },
    // { label: 'Docs', href: '/docs' },
    { label: 'Support', href: 'mailto:support@smtpocket.com' }
  ]

  return (
    <header className='header' role='banner'>
      <div>
        <a href='/' className='logoWrap' aria-label='Smart Pocket home'>
          <div className='logo'>Smart Pocket</div>
          <div className='tag'>Wallet & Exchange</div>
        </a>
      </div>

      <div className='desktopNav' aria-hidden={false}>
        <nav className='nav' role='navigation' aria-label='Main navigation'>
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href='/auth/Login' className='authBtn'>
                Login
              </a>
            </li>
            <li>
              <a href='/auth/RegistrationPage' className='authBtn accent'>
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <button
        className='hamburger'
        aria-label='Toggle menu'
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className='mobileOverlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className='mobileDropdown'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.26 }}
            >
              <ul>
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href='/auth/Login' onClick={() => setMenuOpen(false)}>
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href='/auth/RegistrationPage'
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </a>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
