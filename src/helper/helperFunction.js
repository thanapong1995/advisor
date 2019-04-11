const pad = (str, max) => {
  str = '' + str
  return str.length < max ? pad('0' + str, max) : str
}
Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
}
function formatPID (item) {
  var pid1 = item.substring(0, 1)
  var pid2 = item.substring(1, 5)
  var pid3 = item.substring(5, 10)
  var pid4 = item.substring(10, 12)
  var pid5 = item.substring(12, 13)
  return pid1 + '-' + pid2 + '-' + pid3 + '-' + pid4 + '-' + pid5
}
function transformString (str) {
  return str.replace(/(?:^|\.?)([A-Z])/g, function (x, y) { return '_' + y.toUpperCase() }).replace(/^_/, '').split('_').map(row => row.toUpperCase()).join('_')
}
const transformObject = (data) => {
  let result = {}
  for (let key in data) {
    result[transformString(key)] = data[key]
  }
  return result
}
const deformString = (text) => {
  return text.split('_').map((row, index) => {
    if (index === 0) return row.toLowerCase()
    return row.charAt(0).toUpperCase() + row.slice(1).toLowerCase()
  }).join('')
}
const deformObject = (data) => {
  let result = {}
  for (let key in data) {
    result[deformString(key)] = data[key]
  }
  return result
}
const isValidDate = (dateString) => {
  // First check for the pattern
  var regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/

  if (!regexDate.test(dateString)) {
    return false
  }

  // Parse the date parts to integers
  var parts = dateString.split('/')
  var day = parseInt(parts[0], 10)
  var month = parseInt(parts[1], 10)
  var year = parseInt(parts[2], 10) - 543

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false
  }

  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29
  }
  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1]
}
const removeEmpty = (obj) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmpty(val)
    else if (val == null || val == '') delete obj[key]
  })
}

const checkDate = (date) => {
  // regular expression to match required date format
  const re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  let regs
  if (date !== '') {
    if (regs = date.match(re)) {
      // day value between 1 and 31
      if (parseInt(regs[1]) < 1 || parseInt(regs[1]) > 31) {
        return false
      }
      // month value between 1 and 12
      if (parseInt(regs[2]) < 1 || parseInt(regs[2]) > 12) {
        return false
      }
      // year value between 1902 and 2019
      if ((parseInt(regs[3]) - 543) < 1902 || (parseInt(regs[3]) - 543) > (new Date()).getFullYear()) {
        return false
      }
      let deltaCurrentYear = (parseInt(regs[3]) - 543) - (new Date()).getFullYear()
      if (deltaCurrentYear === 0) {
        if (parseInt(regs[2]) > (new Date()).getMonth() + 1) return false
        if (parseInt(regs[2]) === (new Date()).getMonth() + 1 && parseInt(regs[1]) > (new Date()).getDate()) return false
      }
      return true
    } else {
      // alert("Invalid date format: " + form.startdate.value);
      return false
    }
  }
  return false
}

export {pad, transformString, transformObject, isValidDate, removeEmpty, checkDate, deformObject, formatPID}
