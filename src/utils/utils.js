import { SECRET_KEY } from "../actions/constants";
import axios from "axios";



export function translate(inputText, language, setTranslation) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", inputText);
  encodedParams.append("target", language);
  encodedParams.append("source", "en");

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'c279e9bb20msh14c14acfd2c9dbbp1c4c6bjsnfa443cbd9d19',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
  };

  axios.request(options).then(function (response) {
    setTranslation(response.data.data.translations[0].translatedText)
  }).catch(function (error) {
    console.error(error);
  });
}

const CryptoJS = require("crypto-js");

export function formatMobile(mobile) {
  mobile = mobile?.toString();
  if (mobile?.length === 0) {
    mobile = "";
  } else if (mobile?.length <= 3) {
    mobile = mobile?.replace(/^(\d{0,3})/, "($1)");
  } else if (mobile?.length <= 6) {
    mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
  } else if (mobile?.length === 9) {
    mobile = mobile?.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
  } else if (mobile?.length <= 10) {
    mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
  } else if (mobile?.length === 11) {
    mobile = mobile?.replace(
      /^(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,4})/,
      "+$1 ($2) $3 $4"
    );
  }

  return mobile;
}

export function currencyFormat(num, unit) {
  return unit + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function findStatus(status) {
  let statusName;
  let statusColor;

  if (status === 0) {
    statusName = "Inactive";
    statusColor = "yellow";
  } else if (status === 1) {
    statusName = "Active";
    statusColor = "green";
  } else if (status === 2) {
    statusName = "Suspended";
    statusColor = "red";
  } else if (status === 3) {
    statusName = "Rejected";
    statusColor = "orange";
  } else {
    statusName = "Invalid";
    statusColor = "grey";
  }

  return { status: statusName, color: statusColor };
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  if (name !== " ") {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      //children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      children: name.toUpperCase().charAt(0),
    };
  }
}

export function encrypt(cipherText) {
  if (cipherText) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(cipherText),
      SECRET_KEY
    ).toString();
  }
}

export function decrypt(cipherText) {
  if (cipherText) {
    let bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
