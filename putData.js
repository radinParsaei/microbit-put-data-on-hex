function putData(hex, data) {
  let hexOfData = ""
  for (var i of data) {
    hexOfData += i.codePointAt(0).toString(16).toUpperCase()
  }
  let lines = []
  let tmp = ''
  for (let i = 0; i < hexOfData.length; i += 32) {
    for (var j = i; j < i + 32; j++) {
      tmp += hexOfData.charAt(j)
    }
    while (tmp.length < 32) tmp = 'FF' + tmp
    lines.push(tmp)
    tmp = ''
  }
  let splitHex = hex.split('\n');
  for (var i = splitHex.length - 3; i > 0; i--) {
    if (lines[(splitHex.length - 3) - i] == undefined) break;
    splitHex[i] = splitHex[i].replace('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', lines[(splitHex.length - 3) - i])
    var a = splitHex[i].substring(1, splitHex[i].length - 2)
    let b = []
    for (var _i = 0; _i < a.length; _i += 2)
      b.push(a.substring(_i, _i + 2))
    let c = []
    for (var _i of b) {
      c.push(parseInt(_i, 16))
    }
    let sum = 0
    for (var _i of c) sum += _i
    let d = 256 - sum % 256
    let e = d.toString(16).substring(0, 2)
    splitHex[i] = splitHex[i].substring(0, splitHex[i].length - 2)
    if (e.length == 1) splitHex[i] += '0'
    splitHex[i] += e
  }
  return splitHex.join("\n")
}
