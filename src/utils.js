const flattenObject = ob => {
  let toReturn = {}

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (typeof ob[i] == 'object') {
      const flatObject = flattenObject(ob[i])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

module.exports.flattenObject = flattenObject
