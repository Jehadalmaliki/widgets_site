import { useState, useEffect } from 'react';
import axios from 'axios';
import FastnWidget from "@fastn-ai/widget-react";
import qs from 'qs';

const App = () => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await axios.post(
          'https://live.fastn.ai/auth/realms/fastn/protocol/openid-connect/token',
          qs.stringify({
            grant_type: 'password',
            username: 'automation@fastn.ai', 
            password: 'automation', 
            client_id: 'fastn-app',
            redirect_uri: 'https://google.com',
            scope: 'openid',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              realm: 'fastn', 
            },
          }
        );
        setAuthToken(`Bearer ${response.data.access_token}`);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };

    fetchAuthToken();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh" }}>

          <FastnWidget
            style={{ backgroundColor: "black" }}
            projectId="a069807a-ef17-47cd-b4bc-ec29249049bd"
            authToken={authToken} // Pass the generated token here
            tenantId="config"
            apiKey="18b03d66-b31a-43fe-b107-84be9cc3b726"
            theme="light"
            env="LIVE"
          />

      </div>
    </>
  );
};

export default App;