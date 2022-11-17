import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'
import { Keypair } from '@solana/web3.js'


const Home: NextPage = () => {
  console.log(web3)
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [executable, setExecutable] = useState(false)
  let keypair = Keypair.generate();

  console.log(keypair);

  const addressSubmittedHandler = (address: string) => {
    try {

      setAddress(address);
      const publicKey = new web3.PublicKey(address);
      setAddress(publicKey.toBase58());

      const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / web3.LAMPORTS_PER_SOL);
      })

      connection.getAccountInfo(publicKey).then((accountInfo: any) => {
        setExecutable(accountInfo.executable);
        console.log(accountInfo);
      })
    }
    catch {
      setAddress('Invalid Address')
      setBalance(0)
      alert('Invalid Address')
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable: ${executable}`}</p>
      </header>
    </div>
  )
}

export default Home
