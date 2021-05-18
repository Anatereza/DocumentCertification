
const adresseIP = "localhost";
const networkUrl = "http://" + adresseIP + ":8545";

const ethers = require('ethers')

const express = require('express')
const path = require('path')
const app = express()
const port = 3000;

const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


const MNEMONIC = "annual anxiety detail slide dry spawn drink weather mammal blouse club away";

// A mettre à jour avec l'adresse du contrat
const CONTRACT_ADDRESS =  '0x6b31735408B2F5809a719F870Dd4f1B9F827bdcd'


const ABI = [
    'function authenticateDocument (string _base64, string _nomDoc)',
    'function getDocsCount () public view returns (uint)',
    'function getHash (uint256 _docCount) public view returns (bytes32)',
    'function generateHash (string _base64) public view returns (bytes32)',
    'function verifyDocument (bytes32 _tmpHash) public view returns (string)'
]


const uploadDocument = async (req, res, next) => {
    // to declare some path to store your converted image
    var matches = req.body.base64image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }


  var imageNom = 'test';
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.getExtension(type);

  // Appel à la BC
  const provider = ethers.getDefaultProvider(networkUrl)
  const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider)
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
  let fileName;

  try {
      await contract.authenticateDocument(req.body.base64image, imageNom)
      let idDoc = 1;
      idDoc = await contract.getDocsCount()
      

      if (idDoc >= 1) {
        idDoc = idDoc - 1;
      }
      
      var docHash;
      docHash = await contract.getHash(idDoc)

      fileName = docHash + '.' + extension;
      fs.writeFileSync("./documents/" + fileName, imageBuffer, 'utf8');
      return res.send({"Document hash": docHash });

  } catch (e) {
    next(e);
  }  


  // Fin de l'appel

}

app.post('/authentificateDocument', uploadDocument) 

const checkDocument = async (req, res) => {
    // Param : le hash du document
    // Avant de renvoyer le document, vérifier que le hachage du document stocké en base correspond bien au document
    
    var docHash = req.params.docHash;

    // Récupérer le base64 du document
    //read image file
    const file = fs.readFileSync(`${process.cwd()}/documents/${docHash}.jpeg`,{encoding: 'base64'})
    let imgSrcString = `data:image/jpeg;base64,${file}`;

    const provider = ethers.getDefaultProvider(networkUrl)
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)

    
    try {
        console.log(imgSrcString)
        // Appeler une fonction de la BC pour hacher le document
        const tmpHash = await contract.generateHash(imgSrcString)

        // Appeler une fonction de la BC pour vérifier le hash
        const verifyDoc = await contract.verifyDocument(tmpHash)

        let doc;
        if (typeof verifyDoc!='undefined' && verifyDoc) {
            doc = "Document authentique"
        } else {
            doc = "Document corrompu"
        }

        return res.send({"Document hash": doc }) 
    } catch (e) {
        return res.send(codimgSrcStringe64);
    }    
}

app.get('/getDocument/:docHash', checkDocument)

app.listen(port, () => console.log(`Server is listening on port ${port}`))



