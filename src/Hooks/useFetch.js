import { useState, useEffect } from 'react';

export function useFetch(body = "", method, callback, callbackError) {
  const URL = "http://chatop-noktoss-env.eba-pbpppppe.us-east-2.elasticbeanstalk.com/chat"
  const [loading, setLoading] = useState(false);

  if (body == "") return

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;

      try {
        if (method === CONST_FETCH.method.GET) {
          response = await fetch(`${URL}?thread_id=` + body);
        } else {
          response = await fetch(`${URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
        }

        const json = await response.json();

        if (json.error) {
          console.log(json);
          throw new Error(json);
        }

        callback(json);

      } catch (error) {
        console.error(`${new Date()} \nError: \n`, error);
        callbackError(error);
        alert("Ha ocurrido un error, verifica la consola");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [body, method, callback, callbackError]);

  return { loading };
}

export const CONST_FETCH = {
  method: {
    POST: 'POST',
    GET: 'GET',
  },
};
