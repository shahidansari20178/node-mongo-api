const{SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

/*
var msg="hello";
var hash=SHA256(msg).toString();
*/
/*
console.log(msg);
console.log(hash);
*/

var data={
    id:4
};
var token=jwt.sign(data,'abc123');
console.log(token);
var token1=jwt.verify(token,'abc123');
console.log(token1);
/*var tok
en={
    data,
    hash:SHA256(JSON.stringify(data,undefined,2)+'hello').toString()
}

var res=SHA256(JSON.stringify(data,undefined,2)+'hello').toString();
if(res === token.hash)
    {
        console.log('not change');
    }
    else
    {
        console.log('change');        
    }*/