import { useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; 
import { useAnchorProvider } from "../hooks/useAnchorProvider";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
export default function(){
    const provider=useAnchorProvider()
    const [Balance,setBalance]=useState(0)
    useEffect(()=>{
        if(provider.wallet.publicKey){
            provider.connection.getBalance(provider.wallet.publicKey)
            .then(balance=>{
                setBalance(balance)
            })
        }else{
            setBalance(0)
        }
    },[provider])
    return (
            <Box sx={{display:"flex",alignItems:"center",padding:1,width:"100%"}} >
                <div style={{flexGrow:1}} ></div>
                <Typography variant="h3" component={'h3'} >{provider.wallet.publicKey&&`${String((Balance/(10**9)).toFixed(2))} SOL`} </Typography>
                <WalletMultiButton/>
            </Box>
    )
}