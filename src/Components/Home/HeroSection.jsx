'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../../Components/Header.jsx'

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'tron', symbol: 'TRX', name: 'Tron' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'vechain', symbol: 'VET', name: 'VeChain' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'near', symbol: 'NEAR', name: 'NEAR' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' }
]

function buildUrl (ids) {
  const qs = new URLSearchParams({
    vs_currencies: 'usd',
    include_24hr_change: 'true'
  })
  return `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
    ','
  )}&${qs.toString()}`
}

function useLivePrices (intervalMs = 15000) {
  const [prices, setPrices] = useState({
    data: {},
    fetchedAt: null,
    error: null
  })

  useEffect(() => {
    let mounted = true
    const ids = COINS.map(c => c.id)
    const url = buildUrl(ids)

    async function fetchPrices () {
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (!mounted) return

        // map raw response to normalized object
        const map = {}
        for (const c of COINS) {
          const j = json[c.id] || {}
          map[c.id] = {
            usd: j.usd ?? null,
            change24h: j.usd_24h_change ?? null
          }
        }

        setPrices({ data: map, fetchedAt: Date.now(), error: null })
      } catch (err) {
        if (!mounted) return
        setPrices(prev => ({ ...prev, error: err.message }))
      }
    }

    fetchPrices()
    const t = setInterval(fetchPrices, intervalMs)
    return () => {
      mounted = false
      clearInterval(t)
    }
  }, [intervalMs])

  return prices
}

function AnimatedNumber ({ value, decimals = 0, prefix = '', className = '' }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf = null
    const start = performance.now()
    const from = display
    const to = Number(value) || 0
    const duration = 700
    function step (t) {
      const d = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - d, 3)
      const cur = from + (to - from) * eased
      setDisplay(cur)
      if (d < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span className={className}>
      {prefix}
      {Number(display).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
    </span>
  )
}

export default function AdvancedCryptoHero () {
  const prices = useLivePrices(15000)
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(null)
  const [connected, setConnected] = useState(false)

  // MetaMask connect (simple)
  async function connectWallet () {
    try {
      if (!window.ethereum) {
        alert('MetaMask not found. Install MetaMask or use a Web3 wallet.')
        return
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAccount(accounts[0])
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setNetwork(chainId)
      setConnected(true)
      // listeners
      window.ethereum.on &&
        window.ethereum.on('accountsChanged', accts => {
          setAccount(accts[0] || null)
          setConnected(!!accts.length)
        })
      window.ethereum.on &&
        window.ethereum.on('chainChanged', chain => setNetwork(chain))
    } catch (err) {
      console.error('Wallet connect error', err)
    }
  }

  function disconnectWallet () {
    setConnected(false)
    setAccount(null)
    setNetwork(null)
  }

  return (
    <div className='root'>
      <video autoPlay loop muted playsInline className='bg-video'>
        <source
          src='https://cdn.pixabay.com/video/2025/06/27/288182_large.mp4'
          type='video/mp4'
        />
      </video>

      <Header />

      <main className='hero'>
        <section className='left'>
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className='title'
          >
            Smart Pocket <span className='gradient'>Investment & Airdrop </span>
          </motion.h1>

          <motion.p
            className='lead'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Trade, stake, and manage your portfolio — <strong>securely</strong>{' '}
            and lightning fast. Built with zero trust on-chain integrations and
            privacy-first architecture.
          </motion.p>

          <motion.form
            className='earlyaccessform'
            onSubmit={e => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <input
              aria-label='email'
              type='email'
              placeholder='Enter email for early access'
            />
            <button className='cta'>Join Early Access</button>
          </motion.form>

          <motion.div
            className='featureGrid'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className='feature'>
              <div className='fIcon'>🔒</div>
              <div>
                <div className='fTitle'>On-Chain Security</div>
                <div className='fDesc'>Multi-sig & hardware support.</div>
              </div>
            </div>
            <div className='feature'>
              <div className='fIcon'>⚡</div>
              <div>
                <div className='fTitle'>Immediate Settlement</div>
                <div className='fDesc'>Layer-2 support & MEV protection.</div>
              </div>
            </div>
            <div className='feature'>
              <div className='fIcon'>🌐</div>
              <div>
                <div className='fTitle'>Cross-Chain</div>
                <div className='fDesc'>Bridges with fraud proofs.</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className='right'>
          <motion.div
            className='card'
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className='cardHeader'>
              <div>
                <div className='cardTitle'>Portfolio Overview</div>
                <div className='cardSub'>
                  Real-time balances & account health
                </div>
              </div>
              <div className='cardKPI'>
                <AnimatedNumber
                  value={7488223}
                  decimals={0}
                  className='kpiNum'
                />
                <div className='kpiLabel'>Users</div>
              </div>
            </div>

            <div className='liveChart'>
              <div className='miniChart' aria-hidden>
                <div className='miniChartShimmer' />
              </div>

              <div className='coinList' role='list'>
                {COINS.map(c => {
                  const item = prices.data[c.id] || {}
                  const usd = item.usd ?? 0
                  const change = item.change24h ?? 0
                  return (
                    <div className='coinRow' key={c.id} role='listitem'>
                      <div className='coinLabel'>
                        <div className='coinAvatar' aria-hidden>
                          {c.symbol}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{c.name}</div>
                          <div
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--muted)'
                            }}
                          >
                            {c.symbol}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800 }}>
                          <AnimatedNumber
                            value={usd || 0}
                            decimals={2}
                            prefix='$'
                          />
                        </div>
                        <small
                          style={{
                            color: change >= 0 ? '#16c784' : '#ff6b6b',
                            fontWeight: 700
                          }}
                        >
                          {Number(change ?? 0).toFixed(2)}%
                        </small>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='cardFooter'>
              <div className='smallText'>
                Connect your wallet to see balances
              </div>
              <div className='footerActions'>
                <button className='primary' onClick={connectWallet}>
                  {connected ? 'Open Wallet' : 'Connect'}
                </button>
                <button
                  className='ghost'
                  onClick={() => window.open('/learn', '_blank')}
                >
                  Learn
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
