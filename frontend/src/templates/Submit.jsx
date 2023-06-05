import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { Configuration, OpenAIApi} from 'openai';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();
export default function Submit() {

  // const openAi = new OpenAIApi(
  //   new Configuration({
  //     apiKey: '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',
  //   })
  // )
  
  

    const [mail,setMail] = useState('');
    const [message, setMessage] = useState('');
    // const [decide, setDecide] = useState('');

    // const port = 5000;

    //checking whteher message is abusive or not
   

  async function handleSubmit(event)
  { 
    event.preventDefault()
    // console.log('hiee')
    // const input=`is this message abusive, sexual, threatening or bullying : ${message}. Check whether its abusive if translated to odia, hindi, urdu, korean, telegu and tamil. Answer in only True or False.`
    // const responsee = await openAi.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: input }],
    //   })
    //   setDecide(responsee.data.choices[0].message.content)
    //   console.log(decide)

    //   if(decide==='True.')
    //   {
    //     alert('no abusive messages');
    //     return
    //   }
   

    const lnk = 'https://anonymously-yours.onrender.com/user/post'
    // console.log(mail,message)
    const response = await fetch(lnk,{
       method:'POST',
    headers:
        {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                mail,
                message
            }
        )
    })
    console.log(response);
    if(response.status===201)
    {
      alert('Message sent')
    }
    else if(response.status===408 || response.status===429)
    {
      alert('Abusive language not allowed!')
    }
    else{
      alert('Some error')

    }

    // const data = await response.json()


    // console.log(data)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            What's in your mind? 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField  
            value={mail}
            onChange={(e)=>setMail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email Address"
              name="mail"
            
              autoComplete="mail"
              autoFocus
            />
            <TextField     
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="message"
              label="message"
              type="text"
              id="message"
              autoComplete="message"
         

            />
            <Button
              type="submit"
              value="Register"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message! 
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}