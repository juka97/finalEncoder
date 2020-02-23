module.exports = function encodeRunLength(req, res) {
    var encode_data = new Array();
    var c;
    var len = 0;
    var encoded='';
    var {input} = req.body;
    
    
    for (var i = 0; i < input.length; i++) {
        if ((0 < len) && (len<9) && (c == input.charAt(i))) {
            len++;
            continue;
    }
    
        if(len != 0) {
            encode_data.push(c);
            encode_data.push(len);
    }
    
        c = input.charAt(i);
        len = 1;
    }
    
    if(len != 0) {
        encode_data.push(c);
        encode_data.push(len);
    }
    encoded = encode_data.join('');
    return res.send({ encode: encoded })
}
