import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { getSecret } from '../../src/graphql/queries';

const initialState = { id: "", secret: "", createdAt: "" }

function Secret() {
  const router = useRouter(); 
  const { id } = router.query;
  const [secret, setSecret] = useState(initialState);
  

  useEffect(() => {
    async function secretQuery() {
      if (!id) return;
      try {
        const secretData: any = await API.graphql({
          query: getSecret,
          variables: { id }
        });
        console.log(secretData)
        setSecret(secretData.data.getSecret);
      } catch (error) {
        console.log(error)        
      }
    }
    secretQuery();
    console.log(secret)
  }, []);


  return (
    <>
      <div>
        <p>Secret ID: {id}</p>
        <p>secret created: {secret.createdAt}</p>
        <p>secret Text: {secret.secret}</p>
      </div>
    </>
  );
}

export default Secret;
