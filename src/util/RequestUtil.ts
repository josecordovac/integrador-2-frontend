import { Results, Config } from "../interfaces/postData";

export class RequestUtil {
  // static getData = async (url, reqParams) => {
  //   const res = await fetch(url, {
  //     method: "GET",
  //     mode: 'cors'
  //   });

  //   const result = res.json();
  // };

  static postData = async (config: Config) => {
    let { url, fnOk, fnError } = config;
    // if (params === undefined || params === null) config.params = {};

    try {
      const res = await fetch("http://localhost:3000/" + url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config)
      });
  
      const result: Results = await res.json();
  
      if(result.ok) fnOk(result);
      
    } catch (error) {
      if (fnError) 
        fnError(error);
    }
  };
}