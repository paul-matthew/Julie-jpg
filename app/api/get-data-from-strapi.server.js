export async function getDataFromStrapi(path, query) {
  // const isProduction = process.env.NODE_ENV === 'production';
  // const baseUrl = isProduction ? process.env.BASE_URL_PROD : process.env.BASE_URL;

  // const baseUrl = "http://127.0.0.1:1337";

  // if (process.env.NODE_ENV !== 'production') {
  //   baseUrl = "http://127.0.0.1:1337";
  //   console.log("This is a local build yo");
  // } else {
  //   console.log("This is a production build");
  // }


try {
  let baseUrl;
  let apiToken;

  if (process.env.NODE_ENV !== 'production') {
    baseUrl = "http://127.0.0.1:1337";
    apiToken = "ef17f73a62fa3256dcabba3f5dc9215c2d6dab18986b49c841286aa1186e183a45c8743af6f8f203acafcb290731d8d8aa70d753f22c40b727faf1cafa5be35c94c78884919175ed4e234b82057db9392d471d8cd72fbcdaa6266e8fa2a6dd3c7727cead41e656f063bd86dd25cab091b0db486924b94c3f455c32651fb07f14";
    console.log("This is a local build yo");
  } else {
    baseUrl = "https://jules-frontend-dev.herokuapp.com";
    apiToken = "a872e9ef729c4578d7b02c526e9d77adbfcd921dbb02678b48f5e5f127e54d5df1520efa4be07a20ba3662c6140635618c260a4e90e109efe32825aa9b90db6408c4d93c171efc417329a14200921bf8a65aeeecfe6c71e8fc47c196ece37b1a635ad6f706a8d49cfdd1fb50902f25d43a9d94b2f7e9567396a71926f8641122";
    console.log("This is a production build");
  }
  const url = `${baseUrl}/api/${path}?${query}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
} 

  catch (error) {
  console.error(error);
  throw new Error('Error fetching data from Strapi');
}
}

// export const baseUrl = process.env.NODE_ENV === 'production'
//   ? process.env.BASE_URL_PROD
//   : process.env.BASE_URL;
