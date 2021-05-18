// ATTENTION : npm install @truffle/hdwallet-provider

export const HDWalletProvider = require("@truffle/hdwallet-provider");

// A modifier après chaque lancement de ganache
export const mnemonicPhrase = "annual anxiety detail slide dry spawn drink weather mammal blouse club away"; // 12 word mnemonic

// En local : localhost
//export const adresseIP = "52.47.98.192";
export const adresseIP = "localhost";

export const networkUrl = "http://" + adresseIP + ":8545";

export const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: networkUrl
});

/** countryLayout permet de paramétrer le vernis pays
Cette variable doit être impérativement renseignée
Pour ajouter un pays, il faut modifier :
- HomepageHeader.js
  - Logo
  - Texte du header
- GeneratePDF.js
  - Logo
  - Nom du pays
- variables.js
  - ajouter un case au switch et indiquer une couleur primaire
- App.js
  - ajouter le favicon

Sera également modifié (sans action nécessaire) :
- Les couleurs des titres de section dans HomepagePublique (via les composants qui la composent)
- Les couleurs des titres de section dans HomepageCitoyen (directement dans cette classe)

CI : Côte d'ivoire
GB : Gabon
CA : Cameroun A IMPLEMENTER
 */
export const countryLayout = "CA";

let countryColor1

switch (countryLayout){
  case "CI":
    countryColor1 = "#fbc658"
  break;
  case "GB":
    countryColor1 = "#FCD20E"
  break;
  case "CA":
    countryColor1 = "#FCD116"
  break;
  default:
}

export const countryColors = [countryColor1];

let rien
export default rien
