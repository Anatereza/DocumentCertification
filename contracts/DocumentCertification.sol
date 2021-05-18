// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

/** @title DocumentCertification. */
contract DocumentCertification {

    /// @dev Owner address
    address payable public owner;
    
    /// @dev Compteur du nombre de documents enregistrés 
    uint docsCount = 0;

    /*
    * Mapping pour des Hash des documents
    * clé : hash du document
    */
    mapping (bytes32 => string) docsHash;
   
    /*
    * Mapping pour retrouver les Hash des documents
    * clé : docsCount du document
    */
    mapping (uint => bytes32) docsHashCount;

    /// @dev Contract constructor sets the owner
    constructor () public {
        owner = msg.sender;
    }   
    

    /**
    * Read functions 
    */

    function getDocsCount () public view returns (uint _docsCount) {
        _docsCount = docsCount;
    }

    function verifyDocument (bytes32 _tmpHash) public view returns (string memory _nomDoc) {
        _nomDoc = docsHash[_tmpHash];
    }

    function getHash (uint _docCount) public view returns (bytes32 _docHash) {
        _docHash = docsHashCount[_docCount];
    }

    function generateHash (string memory _base64) public view returns (bytes32 _hash) {
        _hash = keccak256(bytes(_base64));
    }

                                                                                                                                              
   /**
    * Write functions 
    */    

    function authenticateDocument (string memory _base64, string memory _nomDoc) public {
        bytes32 doc_hash = keccak256(bytes(_base64));
        docsHash[doc_hash] = _nomDoc;
        docsHashCount[docsCount] = doc_hash;
        docsCount++;
    }     
}