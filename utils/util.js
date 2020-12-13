const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate= date =>{
  const year=date.getFullYear().toString()
  const month=(date.getMonth()+1).toString()
  const day=date.getDate().toString()
  return year+"年"+month+"月"+day+"日"
}
const month  =date=>{
  const month=(date.getMonth()+1).toString()
return month
}
const day=date=>{
  const day=date.getDate().toString()
  return day
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  month:month,
  day:day
}
